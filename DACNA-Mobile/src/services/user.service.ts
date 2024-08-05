import { config } from "src/config/config";
import { mapToServerResponse } from "@models/HttpReponse";

import { FullUser, User } from "@models/User.model";
import { LoginFormModel } from "@screens/Login/models/login-form.model";

const apiURL = config.apiURL;

const CheckUserSession = async () => {
  return await fetch(`${apiURL}/user/check-user`).then(mapToServerResponse);
};

const getUser = async () => {
  return await fetch(`${apiURL}/user`).then(mapToServerResponse<FullUser>);
};

const LoginUser = async (form: LoginFormModel) => {
  const body = {
    username: form.username,
    password: form.password,
  };

  const result = await fetch(`${apiURL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  }).then(mapToServerResponse<FullUser>);

  return result;
};

const LogoutUser = async () => {
  return await fetch(`${apiURL}/user/logout`, {
    method: "PUT",
    credentials: "include",
  }).then(mapToServerResponse);
};

export default {
  CheckUserSession,
  getUser,
  LoginUser,
  LogoutUser,
};
