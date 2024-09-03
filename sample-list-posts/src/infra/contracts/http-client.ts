/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
export type HttpResponse<TData = any> = {
  data: TData;
};

export type HttpMethod = "get" | "post" | "put" | "delete";

export type ParamsHttp = {
  url: string;
  method: HttpMethod;
  body?: any;
};

export interface IHttpClient<TData = any> {
  request(params: IHttpClient.Params): Promise<HttpResponse<TData>>;
}

export namespace IHttpClient {
  export type Params = ParamsHttp;
}
