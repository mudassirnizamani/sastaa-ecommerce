import apiClient from '../apiClient';

function signup(username: string, password: string) {
  return apiClient.post('/pos/signup', {
    username: username,
    password: password,
  });
}

function signin(username: string, password: string) {
  return apiClient.post('/pos/signin', {
    username: username,
    password: password,
  });
}

export default {signin, signup};
