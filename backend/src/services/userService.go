package services

import (
	"context"
	"errors"
	"sastaa-ecommerce-backend/src/database"
	"sastaa-ecommerce-backend/src/dtos"
	"sastaa-ecommerce-backend/src/helpers"
	"sastaa-ecommerce-backend/src/models"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func CreateUser(signupDto dtos.SignupDto, hashedPassword string) (*mongo.InsertOneResult, error) {
	var user models.UserModel

	user.ID = primitive.NewObjectID()
	user.UserId = user.ID.Hex()
	user.EmailAddress = signupDto.EmailAddress
	user.PhoneNumber = signupDto.PhoneNumber
	user.Password = &hashedPassword

	token, refreshToken, err := helpers.GenerateTokens(*user.EmailAddress, *user.PhoneNumber)

	if err != nil {
		return &mongo.InsertOneResult{}, errors.New("error occurred while generating token")
	}

	user.Token = &token
	user.RefreshToken = &refreshToken

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	insertionNumber, insertErr := database.UsersCollection.InsertOne(ctx, user)

	if insertErr != nil {
		return &mongo.InsertOneResult{}, errors.New("error occurred while inserting the user")
	}

	return insertionNumber, nil
}
