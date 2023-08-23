import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../interfaces/User.interface';

const saveUser = async (username: string, id: string) => {
  await AsyncStorage.setItem('user_id', id);
  await AsyncStorage.setItem('user_username', username);
};

const deleteUser = async () => {
  await AsyncStorage.removeItem('user_id');
  await AsyncStorage.removeItem('user_username');
};

const saveTokens = async (token: string, refreshToken: string) => {
  await AsyncStorage.setItem('token', token);
  await AsyncStorage.setItem('refresh_token', refreshToken);
};

const deleteTokens = async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('refresh_token');
};

const getUser = async (): Promise<User | null> => {
  const token = await AsyncStorage.getItem('token');
  const refreshToken = await AsyncStorage.getItem('refresh_token');
  const username = await AsyncStorage.getItem('user_username');
  const id = await AsyncStorage.getItem('user_id');

  if (token !== null && username !== null) {
    return {refreshToken: refreshToken!, token: token, id: id!, username};
  } else return null;
};

export default {saveUser, deleteUser, saveTokens, deleteTokens, getUser};
