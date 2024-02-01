import styled from "styled-components";
import BoxPost from "../components/BoxPost";
import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";
import useAllPosts from "../hooks/useAllPosts";
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Pagination,
  Stack,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRecoilState, useRecoilValue } from "recoil";
import { filter, page, valueState } from "../atom/postAtom";
import { mutate } from "swr";
import { useNavigate } from "react-router-dom";

export default function AllPosts() {
  const { fetchedAllPosts, isLoading, isError } = useAllPosts();
  const [value, setValue] = useRecoilState(valueState);
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useRecoilState(page);
  const filterData = useRecoilValue(filter);
  return (
    <Main>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Ups! Error</p>}
      {fetchedAllPosts && (
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
            {fetchedAllPosts.data.map((post) => (
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
                count={fetchedAllPosts.pagination.totalPages}
                onChange={(event, value) => {
                  setPageNumber(value);
                  mutate(`/get-posts?page=${pageNumber}&filter=${filterData}`);
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
  }
`;

const Main = styled.div`
  display: flex;
  height: 100vh;
`;
