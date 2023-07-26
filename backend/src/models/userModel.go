package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserModel struct {
	ID           primitive.ObjectID `bson:"_id"`
	EmailAddress *string            `json:"email_address" bson:"email_address"`
	PhoneNumber  *string            `json:"phone_number" bson:"phone_number"`
	Password     *string            `json:"password" bson:"password"`
	Token        *string            `json:"tokens" bson:"tokens"`
	RefreshToken *string            `json:"refresh_token" bson:"refresh_token"`
	UserId       string             `json:"user_id" bson:"user_id"`
}
