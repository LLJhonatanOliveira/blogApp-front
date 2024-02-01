import styled from "styled-components";
import { Post } from "../protocols/postsProtocol";
interface BoxPostProps {
  post: Post;
}
export default function BoxPost({ post }: BoxPostProps) {
  return (
    <ContainerPost>
      <img src={post.image} alt="" />
      <PostBody>
        <h1>{post.title} | @{post.user.userName}</h1>
        <span>{post.description}</span>
        <h2>
          {post.category?.name} | #{post.tag?.name}
        </h2>
      </PostBody>
    </ContainerPost>
  );
}

const ContainerPost = styled.div`
  display: flex;
  margin-bottom: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  position: relative;
  img {
    width: 180px;
    height: 120px;
    background-color: black;
  }
  h1 {
    font-size: 25px;
    margin-bottom: 5px;
    color: #831515;
  }
  h2 {
    margin-top: 5px;
    font-size: 15px;
    position: absolute;
    bottom: 8px;
    color: #831515;
  }
  span {
    display: flex;
    font-size: 18px;
    margin-top: 3px;
  }
`;

const PostBody = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 12px;
`;
