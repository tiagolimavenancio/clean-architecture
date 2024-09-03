import { PostModel } from "@domain/models";

export interface IPostCreate {
  create(params: IPostCreate.Params): Promise<PostModel>;
}

export namespace IPostCreate {
  export type Params = {
    title: string;
    body: string;
  };
}
