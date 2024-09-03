import { expect, describe, it } from "vitest";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { ItemPost } from "./item-post";
import { postsListMock } from "../../../../data/mocks";

function makeSut() {
  render(<ItemPost post={postsListMock()[0]} />);
}

describe("<ItemPost />", () => {
  it("should return item post with values correctly", () => {
    makeSut();
    expect(screen.getByText("Create a login form using formik in react js")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Todays article will demonstrate how to develop a login form in react js using formik."
      )
    ).toBeInTheDocument();
  });
});
