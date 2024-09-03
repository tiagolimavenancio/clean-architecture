import { expect, describe, it } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { PostListUseCaseInMemory } from "@data/useCases/PostListUseCases/in-memory/post-list.usecase.in-memory";
import { Post } from "./posts";

function makeSut() {
  render(<Post postListUseCase={new PostListUseCaseInMemory()} />);
}

describe("<Post />", () => {
  it("should render posts list correctly", async () => {
    makeSut();

    await waitFor(() => screen.getByText("Create a login form using formik in react js"));
    expect(screen.getAllByTestId("post-test-id").length).toBe(2);
  });
});
