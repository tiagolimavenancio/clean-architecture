import { expect, describe, it } from "vitest";
import "@testing-library/jest-dom/vitest";
import { postsListAPIMock } from "@data/mocks";
import { PostCreateUseCase } from "@data/useCases/PostCreateUseCase/post-create-usecase";
import { PostModel } from "@domain/models";
import { AxiosHttpClientInMemory } from "@infra/implementations";

type SutParams = {
  axiosHttpClientInMemory?: AxiosHttpClientInMemory;
};

function makeSut({ axiosHttpClientInMemory = new AxiosHttpClientInMemory() }: SutParams = {}) {
  const sut = new PostCreateUseCase(axiosHttpClientInMemory);
  return { sut, axiosHttpClientInMemory };
}

describe("<PostCreateUseCase />", () => {
  it("should return method create with correct method and url", async () => {
    const axiosHttpClientInMemory = new AxiosHttpClientInMemory();
    axiosHttpClientInMemory.response = { data: postsListAPIMock() };

    const { sut } = makeSut({ axiosHttpClientInMemory });
    await sut.create({ title: "test title", body: "test body" });

    expect(axiosHttpClientInMemory.method).toBe("post");
    expect(axiosHttpClientInMemory.url).toBe("https://jsonplaceholder.typicode.com/posts");
    expect(axiosHttpClientInMemory.data).toEqual({
      title: "test title",
      body: "test body",
    });
  });

  it("should return method create with data correctly", async () => {
    const axiosHttpClientInMemory = new AxiosHttpClientInMemory();
    const postCreateApi = {
      id: 4,
      title: "test title",
      body: "test body",
    };

    axiosHttpClientInMemory.response = { data: postCreateApi };

    const { sut } = makeSut({ axiosHttpClientInMemory });
    const data = await sut.create({ title: "test title", body: "test body" });

    expect(data).toEqual({
      id: postCreateApi.id,
      title: postCreateApi.title,
      body: postCreateApi.body,
    } as unknown as PostModel);
  });
});
