package database

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"github.com/joho/godotenv"
)

func DatabaseInstance() *mongo.Client {
	if err := godotenv.Load(".env"); err != nil {
		log.Fatal("error occurred while loading .env file")
		log.Fatal(err)
	}

	url := os.Getenv("MONGODB_CONNECTION_URL")

	var ctx, cancel = context.WithTimeout(context.TODO(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(url))

	if err != nil {
		log.Fatal("error occurred while connecting do database")
		log.Fatal(err)
	}

	return client
}

var mongoClient *mongo.Client = DatabaseInstance()

func openCollection(dbClient *mongo.Client, collectionName string) *mongo.Collection {
	var collection *mongo.Collection = dbClient.Database("Cluster0").Collection(collectionName)
	return collection
}

var UsersCollection *mongo.Collection = openCollection(mongoClient, "users")
