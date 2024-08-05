export type ServerResponse<T = any> = {
  data: T;
  error: any;
  message: string;
  status: number;
};

export const mapToServerResponse = async <T = any>(response: Response) => {
  const data = JSON.parse(await response.text()) as ServerResponse<T>;

  if (data.status >= 400 && data.status < 600) {
    throw new Error(data.message);
  }

  return data;
};

export const mapToServerResponseDebug = async <T = any>(response: Response) => {
  console.log(response);
  const data = (await response.json()) as ServerResponse<T>;
  console.log(data);
  return data;
};
