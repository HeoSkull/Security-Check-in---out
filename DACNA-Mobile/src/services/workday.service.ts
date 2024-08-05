import { config } from "src/config/config";
import { mapToServerResponse, mapToServerResponseDebug } from "@models/HttpReponse";

import { Workday } from "@models/Workday.model";

const apiURL = config.apiURL;

const GetWorkday = async (id: string) => {
  return await fetch(`${apiURL}/workday&id=${id}`).then(mapToServerResponse<Workday>);
};

const GetCurrentWorkday = async () => {
  return await fetch(`${apiURL}/workday/current`).then(mapToServerResponse<Workday>);
};

const CheckIn = async (group_id: string) => {
  return await fetch(`${apiURL}/workday/check-in?group_id=${group_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then(mapToServerResponse);
};

const CheckOut = async (id: string) => {
  return await fetch(`${apiURL}/workday/check-out?id=${id}`, {
    method: "POST",
    credentials: "include",
  }).then(mapToServerResponse);
};

export default {
  GetWorkday,
  GetCurrentWorkday,
  CheckIn,
  CheckOut,
};
