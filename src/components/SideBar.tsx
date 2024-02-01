import styled from "styled-components";
import useCategories from "../hooks/useCategories";
import useTags from "../hooks/useTags";

export default function SideBar() {
  const { fetchedCategories, isLoading, isError } = useCategories();
  const { fetchedAllTags } = useTags();
  return (
    <ContainerSideBar>
      <Border></Border>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Ups! Error</p>}
      <SideBarInfo>
        <CategoriesBox>
          <h1>Categories</h1>
          {fetchedCategories &&
            fetchedCategories.map((cat) => <h2 key={cat.id}>{cat.name}</h2>)}
        </CategoriesBox>
        <TagsBox>
          <h1>Tags</h1>
          {fetchedAllTags &&
            fetchedAllTags.map((tag) => <h2 key={tag.id}>#{tag.name}</h2>)}
        </TagsBox>
      </SideBarInfo>
    </ContainerSideBar>
  );
}

const CategoriesBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30vh;
  h1{
    font-size: 20px;
    color: #831515;
    margin-bottom: 10px;
  }
  h2{
    font-size: 15px;
    margin-bottom: 3px;
  }
`;

const TagsBox = styled.div`
      h1{
    font-size: 20px;
    color: #831515;
    margin-bottom: 10px;
  }
  h2{
    font-size: 15px;
    margin-bottom: 3px;
  }
`;
const SideBarInfo = styled.div``;
const ContainerSideBar = styled.div`
  display: flex;
  margin-top: 14vh;
`;
const Border = styled.div`
  height: 70vh;
  width: 2px;
  border-style: solid;
  background-color: lightgray;
  margin-right: 25px;
`;
