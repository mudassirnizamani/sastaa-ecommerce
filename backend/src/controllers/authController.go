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

func Signup() gin.HandlerFunc {
	return func(c *gin.Context) {
		var signupDto dtos.SignupDto

		if err := c.BindJSON(&signupDto); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"code": "ServerError", "error": err.Error()})
			return
		}

		err := validator.New().Struct(signupDto)

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"code": "ValidationError", "error": err.Error()})
			return
		}

		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		count, err := database.UsersCollection.CountDocuments(ctx, bson.M{"email_address": signupDto.EmailAddress})

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"code": "ServerError", "error": "something went wrong while counting user emails"})
			return
		} else if count > 0 {
			c.JSON(http.StatusBadRequest, gin.H{"code": "EmailAlreadyExist", "error": "email address already exists"})
			return
		}

		hashedPassword := helpers.HashPassword(*signupDto.Password)

		insertNumber, err := services.CreateUser(signupDto, hashedPassword)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"code": "ServerError", "error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"succeeded": true, "insertNumber": insertNumber.InsertedID})
	}
}

func Signin() gin.HandlerFunc {
	return func(c *gin.Context) {
		var dto dtos.SigninDto

		if err := c.BindJSON(&dto); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"code": "ServerError", "error": err.Error()})
			return
		}

		validationErr := validator.New().Struct(dto)

		if validationErr != nil {
			c.JSON(http.StatusBadRequest, gin.H{"code": "ValidationError", "error": validationErr.Error()})
			return
		}

		var user models.UserModel

		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		err := database.UsersCollection.FindOne(ctx, bson.M{"email_address": dto.EmailAddress}).Decode(&user)

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"code": "EmailNotFound", "error": "email address does not exist"})
			return
		}

		isValid, msg := helpers.CheckIsPasswordValid(*user.Password, *dto.Password)

		if !isValid {
			c.JSON(http.StatusBadRequest, gin.H{"code": "IncorrectPassword", "error": msg})
			return
		}

		token, refreshToken, err := helpers.GenerateTokens(*user.EmailAddress, *user.PhoneNumber)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"code": "ServerError", "error": " Error occurred while creating token and refresh token"})
			return
		}

		services.UpdateTokens(token, refreshToken, user.UserId)

		err = database.UsersCollection.FindOne(ctx, bson.M{"user_id": user.UserId}).Decode(&user)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"code": "ServerError", "error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"user": user})
	}
}
