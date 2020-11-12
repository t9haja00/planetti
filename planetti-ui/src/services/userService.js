import http from './httpService';

const usersApi = process.env.REACT_APP_USERS;

export function getUserInfoById(userId) {
  return http.get(`${usersApi}/${userId}`);
}

export function signup(user) {
  const { name, email, password } = user;

  return http.post(usersApi, {
    name,
    email: email.toLowerCase(),
    password
  });
}

export function changeNameAndEmail(userInfo, userId) {
  const { name, email } =  userInfo;
  return http.put(`${usersApi}/${userId}`, {
    name,
    email
  });
}

export function deleteUserAccount(userId) {
  return http.delete(`${usersApi}/${userId}`);
}