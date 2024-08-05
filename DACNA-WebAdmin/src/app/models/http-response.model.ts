export type ServerResponse<T = any> = {
  data: T;
  error: any;
  message: string;
  status: number;
};
