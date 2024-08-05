import { config } from "src/config/config";

import { mapToServerResponse } from "@models/HttpReponse";
import { Group } from "@models/Group.model";

const apiURL = config.apiURL;

const getGroup = async (id: string) => {
  return await fetch(`${apiURL}/group/detail?id=${id}`).then(mapToServerResponse<Group>);
};

const getGroupList = async () => {
  return await fetch(`${apiURL}/group/list`).then(
    mapToServerResponse<{
      groups: Group[];
      total: number;
    }>
  );
};

export default {
  getGroup,
  getGroupList,
};
