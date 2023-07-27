import AuthContextValue from "@/interfaces/AuthContext.interface";
import User from "@/interfaces/User.interface";
import authenticationService from "@/server/services/authenticationService";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext({} as AuthContextValue);

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  const signin = (email: string, password: string) => {
    setLoading(true);
    authenticationService
      .Signin({ emailAddress: email, password: password })
      .then((res) => {
        setLoading(false);
        setCurrentUser({
          emailAddress: res.data.user.email_address,
          phoneNumber: res.data.user.phone_number,
          refreshToken: res.data.user.refresh_token,
          token: res.data.user.token,
          userId: res.data.user.user_id,
        });
        router.push("/")
      })
      .catch((err: AxiosError) => {
        setLoading(false);
        if (err?.response?.data?.code === "EmailNotFound") {
          return toast.error("Email address does not exist");
        } else if (err?.response?.data?.code === "IncorrectPassword") {
          return toast.error("Password is Incorrect");
        } else {
          return toast.error("Something went wrong");
        }
      });
  };

  const signup = async (
    email: string,
    password: string,
    phoneNumber: string
  ) => {
    setLoading(true);
    authenticationService
      .Signup({
        emailAddress: email,
        password: password,
        phoneNumber: phoneNumber,
      })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          toast.success("Successfully created account");
          return router.push("/authentication/signin");
        } else {
          return toast.error("Something went wrong");
        }
      })
      .catch((err: AxiosError) => {
        setLoading(false);
        if (err?.response?.data?.code === "EmailAlreadyExist") {
          return toast.error("Email already exist");
        } else {
          return toast.error("Something went wrong");
        }
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        signin: signin,
        loading: loading,
        signup: signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext<AuthContextValue>(AuthContext);
