import { ChangeEvent, useState } from "react";
import { IPostCreate } from "@domain/contracts/post-create.contracts";

type Props = {
  createPostUseCase: IPostCreate;
};

export function CreatePost({ createPostUseCase }: Props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");

  const handleInputTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleInputBody = (e: ChangeEvent<HTMLInputElement>) => {
    setBody(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await createPostUseCase.create({ title, body });
      setMessage("Created the post successfully");
    } catch (error) {
      setMessage("Failed the new post");
    }
  };

  return (
    <div>
      {message && <span>{message}</span>}
      <h1>Create New Post</h1>
      <input type="text" placeholder="Title" value={title} onChange={handleInputTitle} />
      <input type="text" placeholder="Body" value={body} onChange={handleInputBody} />
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
}
