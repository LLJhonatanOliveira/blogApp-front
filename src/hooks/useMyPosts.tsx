import useSWR from "swr";
import { FetchedPosts } from "../protocols/postsProtocol";
import { useRecoilValue } from "recoil";
import { filter, page } from "../atom/postAtom";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../context/userContext";

interface UsePostsResult {
    fetchedMyPosts: FetchedPosts;
    isLoading: boolean;
    isError: any;
}

export default function useMyPosts(): UsePostsResult{
    const pageNumber = useRecoilValue(page);
    const filterData = useRecoilValue(filter);
    const {userData} = useContext(UserContext);
    const {data, error, isLoading} = useSWR(`/get-posts-user?page=${pageNumber}&filter=${filterData}`, (url) =>
    axios.get(url, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      }).then((res) => 
    res.data) )
    return {
        fetchedMyPosts: data,
        isLoading,
        isError: error
    }
}