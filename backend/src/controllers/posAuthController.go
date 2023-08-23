package controllers

import (
	"context"
	"net/http"
	"sastaa-ecommerce-backend/src/database"
	"sastaa-ecommerce-backend/src/dtos"
	"sastaa-ecommerce-backend/src/helpers"
	"sastaa-ecommerce-backend/src/models"
	"sastaa-ecommerce-backend/src/services"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson"
)

func PosSignup() gin.HandlerFunc {
	return func(c *gin.Context) {
		var dto dtos.PosAuthDto

		if err := c.BindJSON(&dto); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"code": "ServerError", "error": "error occurred while binding json"})
			return
		}

		if err := validator.New().Struct(dto); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"code": "ValidationError", "error": err.Error()})
			return
		}

		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		var count, err = database.PosUsersCollection.CountDocuments(ctx, bson.M{"username": dto.UserName})

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"code": "ServerError", "error": "error occurred while counting documents"})
			return
		} else if count > 0 {
			c.JSON(http.StatusBadRequest, gin.H{"code": "UserNameAlreadyExist", "error": "username already exists"})
			return
		}

		hashedPassword := helpers.HashPassword(dto.Password)

		insertNumber, err := services.CreatePosUser(dto, hashedPassword, &ctx)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"code": "ServerError", "error": "error occurred while inserting pos user"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"succeeded": true, "insertNumber": insertNumber.InsertedID})

	}
}

func PosSignin() gin.HandlerFunc {
	return func(c *gin.Context) {
		var dto dtos.PosAuthDto

		if err := c.BindJSON(&dto); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"code": "ServerError", "error": "error occurred while binding json"})
			return
		}

		if err := validator.New().Struct(dto); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"code": "ValidationError", "error": err.Error()})
			return
		}

		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		var user models.PosUser

		err := database.PosUsersCollection.FindOne(ctx, bson.M{"username": dto.UserName}).Decode(&user)

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"code": "UserNotFound", "error": "user is not found"})
			return
		}

		isValid, msg := helpers.CheckIsPasswordValid(*user.Password, dto.Password)

		if !isValid {
			c.JSON(http.StatusBadRequest, gin.H{"code": "IncorrectPassword", "error": msg})
			return
		}

		token, refreshToken, err := helpers.GenerateTokens("", "", *user.Username)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"code": "ServerError", "error": " Error occurred while creating token and refresh token"})
			return
		}

		services.UpdateTokens(token, refreshToken, user.UserId, database.PosUsersCollection)

		err = database.PosUsersCollection.FindOne(ctx, bson.M{"user_id": user.UserId}).Decode(&user)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"code": "ServerError", "error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"user": user})
	}
}
