import { PostCreateUseCase, PostListUseCase } from "@data/useCases";
import { AxiosHttpClient } from "./infra/implementations/axios-http-client/axios-http-client";
import { CreatePost, Post } from "./presentation/pages";
import "./App.css";

function App() {
  const postListUseCase = new PostListUseCase(new AxiosHttpClient());
  const postCreateUseCase = new PostCreateUseCase(new AxiosHttpClient());

  return (
    <>
      <CreatePost createPostUseCase={postCreateUseCase} />
      <Post postListUseCase={postListUseCase} />
    </>
  );
}

export default App;
