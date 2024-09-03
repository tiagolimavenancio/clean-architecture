import { expect, describe, it, vi } from "vitest";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { CreatePost } from "@presentation/pages/create-posts/create-posts";
import { IPostCreate } from "@domain/contracts/post-create.contracts";
import { PostModel } from "@domain/models";
import { postsListMock } from "@data/mocks";

class CreatePostUseCaseInMemory implements IPostCreate {
  title = "";
  body = "";

  post = postsListMock()[0];

  async create(params: IPostCreate.Params): Promise<PostModel> {
    this.title = params.title;
    this.body = params.body;

    return await Promise.resolve(this.post);
  }
}

type SutParams = {
  createPostUseCaseInMemory?: CreatePostUseCaseInMemory;
};

function makeSut({ createPostUseCaseInMemory = new CreatePostUseCaseInMemory() }: SutParams = {}) {
  render(<CreatePost createPostUseCase={createPostUseCaseInMemory} />);

  return { createPostUseCaseInMemory };
}

function filledCreatePostForm() {
  const inputTitle = screen.getByPlaceholderText("Title") as HTMLInputElement;
  const inputBody = screen.getByPlaceholderText("Body") as HTMLInputElement;

  fireEvent.change(inputTitle, { target: { value: "test title" } });
  fireEvent.change(inputBody, { target: { value: "test body" } });

  fireEvent.click(screen.getByText("Create"));

  return { inputTitle, inputBody };
}

describe("<CreatePost />", () => {
  it("should caller post create use case with params correctly", async () => {
    const { createPostUseCaseInMemory } = makeSut();
    const { inputTitle, inputBody } = filledCreatePostForm();

    expect(createPostUseCaseInMemory.title).toBe(inputTitle.value);
    expect(createPostUseCaseInMemory.body).toBe(inputBody.value);
  });

  it("should show message success correctly", async () => {
    makeSut();
    filledCreatePostForm();

    await waitFor(() => screen.getByText("Created the post successfully"));

    expect(screen.getByText("Created the post successfully")).toBeInTheDocument();
  });

  it("should show message error if create post failed", async () => {
    const createPostUseCaseInMemory = new CreatePostUseCaseInMemory();
    vi.spyOn(createPostUseCaseInMemory, "create").mockRejectedValueOnce(() =>
      Promise.reject(new Error())
    );

    makeSut({ createPostUseCaseInMemory });
    filledCreatePostForm();

    await waitFor(() => screen.getByText("Failed the new post"));

    expect(screen.getByText("Failed the new post")).toBeInTheDocument();
  });
});
