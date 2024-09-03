import { postsListMock } from "@data/mocks";
import { IPostList } from "@domain/contracts/post.contracts";

export class PostListUseCaseInMemory implements IPostList {
  async list(): Promise<IPostList.Model> {
    return await Promise.resolve(postsListMock());
  }
}
