import { expect, describe, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { AxiosHttpClient } from "@infra/implementations/axios-http-client/axios-http-client";
import axios from "axios";
import { postsListMock } from "@data/mocks";

function makeSut() {
  const sut = new AxiosHttpClient();
  return { sut };
}

describe("<AxiosHttpClient />", () => {
  it("should return method body and url correctly", async () => {
    const axiosMocked = vi.spyOn(axios, "request").mockResolvedValueOnce({ data: [] });
    const { sut } = makeSut();

    await sut.request({
      method: "get",
      url: "http://test.com",
      body: {
        title: "Test Title",
      },
    });

    expect(axiosMocked).toHaveBeenCalledWith({
      method: "get",
      url: "http://test.com",
      data: {
        title: "Test Title",
      },
    });
  });

  it("should return request with data correctly", async () => {
    const dataMocked = postsListMock();
    vi.spyOn(axios, "request").mockResolvedValueOnce({ data: dataMocked });
    const { sut } = makeSut();

    const response = await sut.request({ method: "get", url: "http://test.com" });

    expect(response.data).toEqual(dataMocked);
  });
});
