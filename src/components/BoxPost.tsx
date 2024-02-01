import styled from "styled-components";

export default function BoxPost() {
  return (
    <ContainerPost>
        <div className="imagem"></div>
      <img src="" alt="" />
      <PostBody>
        <PostHeader>
          <h1>Post Title - Author1</h1>
        </PostHeader>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae adipisci fugit praesentium tempore eaque. Molestias nihil et laboriosam, quibusdam earum sint. Tempore corporis explicabo ut corrupti est rem autem ipsam.</span>
        <PostInfo>
          <h2>Category |</h2>
          <h2>Tag</h2>
          <h2>Tag</h2>
        </PostInfo>
      </PostBody>
    </ContainerPost>
  );
}

const ContainerPost = styled.div`
  display: flex;
  margin-bottom: 10px;
  .imagem{
    width: 180px;
    height: 120px;
    background-color: black;
    
  }
  span{
    display: flex;
    flex-wrap: wrap;
    width: 50%;
  }
`;

const PostBody = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 12px;
  
`;

const PostInfo = styled.div`
    display: flex;
`
    
const PostHeader = styled.div``;
