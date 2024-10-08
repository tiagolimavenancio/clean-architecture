/* eslint-disable @typescript-eslint/no-namespace */
import { PostModel } from "../models";

export interface IPostList {
  list(): Promise<IPostList.Model>;
}

export namespace IPostList {
  export type Model = PostModel[];
}
