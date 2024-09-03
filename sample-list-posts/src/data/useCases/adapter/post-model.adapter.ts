import { PostModel, PostModelAPI } from "@domain/models";

export function toPostModel(postApi: PostModelAPI): PostModel {
  return {
    id: postApi.id,
    title: postApi.title,
    body: postApi.body,
  };
}

export const postModelAdapter = { toPostModel };
