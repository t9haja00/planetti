import http from './httpService';

const usersApi = process.env.REACT_APP_USERS;

export function signup(user) {
  const { name, email, password } = user;

  return http.post(usersApi, {
    name,
    email: email.toLowerCase(),
    password
  });
}