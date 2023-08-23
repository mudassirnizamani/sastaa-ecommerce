import React, {createContext, useContext, useEffect, useState} from 'react';
import User from '../interfaces/User.interface';
import authService from '../server/services/authService';
import {AxiosError} from 'axios';
import AppStack from '../router/AppStack';
import AuthStack from '../router/AuthStack';
import {ToastAndroid} from 'react-native';
import userHelper from '../helpers/userHelper';

type AuthContextData = {
  user: User | null;
  signin: (username: string, password: string) => void;
  signup: (username: string, password: string) => void;
  loading: boolean;
  isUserAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface Props {}

export function AuthContextProvider({}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isUserAuthenticated, setIsUserAuthenticated] =
    useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const checkLocalStorage = async () => {
    await userHelper.getUser().then(res => {
      if (res !== null) {
        setCurrentUser({
          id: res.id,
          refreshToken: res.refreshToken,
          token: res.token,
          username: res.username,
        });
        return setIsUserAuthenticated(true);
      }
    });
  };

  useEffect(() => {
    checkLocalStorage();
  }, []);

  const signin = (username: string, password: string) => {
    setLoading(true);
    authService
      .signin(username, password)
      .then(res => {
        setLoading(false);
        if (res.status === 200) {
          userHelper.saveTokens(
            res.data.user.token,
            res.data.user.refresh_token,
          );
          userHelper.saveUser(res.data.user.username, res.data.user.user_id);
          return setIsUserAuthenticated(true);
        }
      })
      .catch((err: AxiosError) => {
        setLoading(false);
        if (
          err.response?.data.code === 'UserNotFound' ||
          err.response?.data.code === 'IncorrectPassword'
        ) {
          ToastAndroid.show(err.response?.data.error, ToastAndroid.LONG);
        }
        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
      });
  };

  const signup = (username: string, password: string) => {
    setLoading(true);
    authService
      .signup(username, password)
      .then(res => {
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        setLoading(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        signin: signin,
        signup: signup,
        user: currentUser,
        loading: loading,
        isUserAuthenticated: isUserAuthenticated,
      }}>
      {isUserAuthenticated ? <AppStack /> : <AuthStack />}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext<AuthContextData>(AuthContext);
