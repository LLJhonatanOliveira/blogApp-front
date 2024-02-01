import styled from "styled-components";
import BoxPost from "../components/BoxPost";
import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";

export default function AllPosts() {
  return (
    <Main>
      <ContainerPosts>
      <SearchBar />
        <BoxPost />
        <BoxPost />
        <BoxPost />
        <BoxPost />
        <BoxPost />
      </ContainerPosts>
      <SideBar />
    </Main>
  );
}

const ContainerPosts = styled.div`
  display: flex;
  flex-direction: column;
  width: 70vw;
`;

const Main = styled.div`
    display: flex;
    height: 100vh;
`
