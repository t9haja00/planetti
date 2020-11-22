import http from './httpService';

const changePasswordApi = process.env.REACT_APP_CHANGEPASSWORD;

export function changePassword(userPassword, email) {
  const { oldPassword, newPassword } = userPassword;

  return http.post(changePasswordApi, {newPassword}, {
    auth: {
    username: email,
    password: oldPassword,
    }
  });
}