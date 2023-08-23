package routes

import (
	"sastaa-ecommerce-backend/src/controllers"

	"github.com/gin-gonic/gin"
)

func BootstrapRoutes(app *gin.Engine) {
	authRoutes(app)
}

func authRoutes(app *gin.Engine) {
	// Auth Routes
	app.POST("/signup", controllers.Signup())
	app.POST("/signin", controllers.Signin())
	app.POST("/pos/signup", controllers.PosSignup())
	app.POST("/pos/signin", controllers.PosSignin())

}
