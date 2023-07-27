import Signin from "@/interfaces/Signin.interface";
import Signup from "@/interfaces/Signup.interface";
import { AxiosResponse } from "axios";
import apiClient from "../apiClient";

function Signup(data: Signup): Promise<AxiosResponse> {
  const model = {
    email_address: data.emailAddress,
    phone_number: data.phoneNumber,
    password: data.password,
  };

  return apiClient.post("/signup", model);
}

function Signin(data: Signin) {
  const model = {
    email_address: data.emailAddress,
    password: data.password,
  };

  return apiClient.post("/signin", model);
}

export default { Signup, Signin };
