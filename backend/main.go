package main

import (
	"os"
	"sastaa-ecommerce-backend/src/database"
	"sastaa-ecommerce-backend/src/routes"

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
	routes.AuthRoutes(app)

	app.Run(":" + port)
}
