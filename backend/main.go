package main

import (
	"os"
	"sastaa-ecommerce-backend/src/database"
	"sastaa-ecommerce-backend/src/routes"

	"github.com/gin-contrib/cors"
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

	app.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Access-Control-Allow-Origin"},
		AllowCredentials: true,
	}))

	// Injects Routes in Pipeline
	routes.BootstrapRoutes(app)

	app.Run(":" + port)
}
