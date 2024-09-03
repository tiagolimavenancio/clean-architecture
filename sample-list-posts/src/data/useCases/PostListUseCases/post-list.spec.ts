import { expect, describe, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import { PostListUseCase } from "@data/useCases/PostListUseCases/post-list.usecase";
import { HttpResponse, IHttpClient } from "@infra/contracts/http-client";
import { postsListAPIMock } from "@data/mocks";
import { PostModel } from "@domain/models";

class AxiosHttpClientInMemory implements IHttpClient {
  method?: string;
  url?: string;

  response: HttpResponse = { data: "" };

  async request(params: IHttpClient.Params): Promise<HttpResponse> {
    this.method = params.method;
    this.url = params.url;

    return await Promise.resolve(this.response);
  }
}

type SutParams = {
  axiosHttpClientInMemory?: AxiosHttpClientInMemory;
};

function makeSut({ axiosHttpClientInMemory = new AxiosHttpClientInMemory() }: SutParams = {}) {
  const sut = new PostListUseCase(axiosHttpClientInMemory);
  return { sut, axiosHttpClientInMemory };
}

describe("<PostListUseCase />", () => {
  it("should return method list with correct method and url", async () => {
    const axiosHttpClientInMemory = new AxiosHttpClientInMemory();
    axiosHttpClientInMemory.response = { data: postsListAPIMock() };

    const { sut } = makeSut({ axiosHttpClientInMemory });
    await sut.list();

    expect(axiosHttpClientInMemory.method).toBe("get");
    expect(axiosHttpClientInMemory.url).toBe("https://jsonplaceholder.typicode.com/posts");
  });

  it("should return method list with data correctly", async () => {
    const axiosHttpClientInMemory = new AxiosHttpClientInMemory();
    const postListApi = postsListAPIMock();
    axiosHttpClientInMemory.response = { data: postListApi };

    const { sut } = makeSut({ axiosHttpClientInMemory });
    const data = await sut.list();

    expect(data[0]).toEqual({
      id: postListApi[0].id,
      title: postListApi[0].title,
      body: postListApi[0].body,
    } as PostModel);
  });
});
