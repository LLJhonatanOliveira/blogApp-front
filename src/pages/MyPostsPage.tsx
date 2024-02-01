import styled from "styled-components";
import BoxPost from "../components/BoxPost";
import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Pagination,
  Stack,
} from "@mui/material";
import { mutate } from "swr";
import { useRecoilState, useRecoilValue } from "recoil";
import useMyPosts from "../hooks/useMyPosts";
import { filter, page, valueState } from "../atom/postAtom";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

export default function MyPosts() {
  const { fetchedMyPosts, isLoading, isError } = useMyPosts();
  const [value, setValue] = useRecoilState(valueState);
  const [pageNumber, setPageNumber] = useRecoilState(page);
  const filterData = useRecoilValue(filter);
  const navigate = useNavigate();
  return (
    <Main>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Ups! Error</p>}
      {fetchedMyPosts && (
        <>
          <ContainerPosts>
            <Button
              sx={{
                position: "fixed",
                right: "50px",
                backgroundColor: "black",
              }}
              variant="contained"
              endIcon={<LogoutIcon />}
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
            >
              Logout
            </Button>
            <Button
              sx={{
                position: "fixed",
                right: "300px",
                backgroundColor: "black",
              }}
              variant="contained"
              onClick={() => {
                navigate("/new-post");
              }}
            >
              New Post
            </Button>
            <SearchBar />
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
                console.log(newValue);
                if (newValue === 0) {
                  navigate("/posts");
                } else {
                  navigate("/posts/user");
                }
              }}
            >
              <BottomNavigationAction label="Feed" />
              <BottomNavigationAction label="My Posts" />
            </BottomNavigation>
            {fetchedMyPosts.data.map((post) => (
              <BoxPost key={post.id} post={post} />
            ))}
            <Stack
              spacing={2}
              sx={{
                alignItems: "center",
                marginTop: "15px",
                position: "absolute",
                bottom: "20px",
                left: "50%",
              }}
            >
              <Pagination
                count={fetchedMyPosts.pagination.totalPages}
                onChange={(event, value) => {
                  setPageNumber(value);
                  mutate(
                    `/get-posts-user?page=${pageNumber}&filter=${filterData}`
                  );
                }}
              />
            </Stack>
          </ContainerPosts>
          <SideBar />
        </>
      )}
    </Main>
  );
}

const ContainerPosts = styled.div`
  display: flex;
  flex-direction: column;
  width: 70vw;
  height: 100vh;
  height: auto;
  box-sizing: border-box;
  position: relative;
  padding: 20px;
  .feed {
    font-size: 30px;
    position: relative;
    left: 50%;
    margin-top: 10px;
    margin-bottom: 10px;
    color: black;
    text-decoration: none;
  }
`;

const Main = styled.div`
  display: flex;
  height: 100vh;
`;
