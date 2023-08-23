package dtos

type SignupDto struct {
	EmailAddress *string `json:"email_address"  validate:"required,email"`
	PhoneNumber  *string `json:"phone_number"  validate:"required"`
	Password     *string `json:"password" validate:"required,min=6"`
}

type SigninDto struct {
	EmailAddress *string `json:"email_address"  validate:"required,email"`
	Password     *string `json:"password" validate:"required,min=6"`
}

type PosAuthDto struct {
	UserName string `json:"username" bson:"username" validate:"required"`
	Password string `json:"password" bson:"password" validate:"required,min=6"`
}
