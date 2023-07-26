package dtos

type SignupDto struct {
	EmailAddress *string `json:"email_address"`
	PhoneNumber  *string `json:"phone_number"`
	Password     *string `json:"password"`
}

type SigninDto struct {
	EmailAddress *string `json:"email_address"`
	Password     *string `json:"password"`
}
