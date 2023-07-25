package routes

import (
	"sastaa-ecommerce-backend/src/controllers"

	"github.com/gin-gonic/gin"
)

func AuthRoutes(app *gin.Engine) {
	app.POST("/signup", controllers.Signup())
}
