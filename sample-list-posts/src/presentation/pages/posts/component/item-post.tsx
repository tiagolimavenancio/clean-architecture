import { PostModel } from "../../../../domain/models";

type Props = {
  post: PostModel;
};

export const ItemPost = ({ post, ...rest }: Props) => {
  return (
    <div {...rest}>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};
