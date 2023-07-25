package main

import (
	"os"
	"sastaa-ecommerce-backend/src/database"

	"github.com/gin-gonic/gin"
)

func main() {
	database.DatabaseInstance()

	var port = os.Getenv("PORT")

	if port == "" {
		port = "5000"
	}

	var app *gin.Engine = gin.New()

	app.Use(gin.Logger())

	app.Run(":" + port)
}
