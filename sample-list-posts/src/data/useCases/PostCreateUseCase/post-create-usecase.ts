import { postModelAdapter } from "@data/useCases/adapter/post-model.adapter";
import { IPostCreate } from "@domain/contracts/post-create.contracts";
import { PostModel, PostModelAPI } from "@domain/models";
import { IHttpClient } from "@infra/contracts/http-client";

export class PostCreateUseCase implements IPostCreate {
  constructor(private readonly httpClient: IHttpClient<PostModelAPI>) {}

  async create(params: IPostCreate.Params): Promise<PostModel> {
    const { data } = await this.httpClient.request({
      method: "post",
      url: "https://jsonplaceholder.typicode.com/posts",
      body: params,
    });

    return postModelAdapter.toPostModel(data);
  }
}
