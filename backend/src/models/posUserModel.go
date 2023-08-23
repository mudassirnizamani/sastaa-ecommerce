package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type PosUser struct {
	ID           primitive.ObjectID `bson:"_id"`
	Username     *string            `bson:"username" json:"username"`
	Password     *string            `bson:"password" json:"password"`
	Token        *string            `bson:"token" json:"token"`
	RefreshToken *string            `bson:"refresh_token" json:"refresh_token"`
	UserId       string             `bson:"user_id" json:"user_id"`
}
