import { postModelAdapter } from "@data/useCases/adapter/post-model.adapter";
import { IPostList } from "@domain/contracts/post.contracts";
import { PostModelAPI } from "@domain/models";
import { IHttpClient } from "@infra/contracts/http-client";

export class PostListUseCase implements IPostList {
  constructor(private readonly httpClient: IHttpClient<PostModelAPI[]>) {}

  async list(): Promise<IPostList.Model> {
    const { data } = await this.httpClient.request({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/posts",
    });

    return data.map(postModelAdapter.toPostModel);
  }
}
