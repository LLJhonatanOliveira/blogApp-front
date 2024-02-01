import useSWR, { mutate } from "swr";
import { FetchedPosts } from "../protocols/postsProtocol";
import { useRecoilValue } from "recoil";
import { filter, page } from "../atom/postAtom";
import axios from "axios";

interface UsePostsResult {
    fetchedAllPosts: FetchedPosts;
    isLoading: boolean;
    isError: any;
}

export default function useAllPosts(): UsePostsResult{
    const pageNumber = useRecoilValue(page);
    const filterData = useRecoilValue(filter)
    const {data, error, isLoading} = useSWR(`/get-posts?page=${pageNumber}&filter=${filterData}`, (url) =>
    axios.get(url).then((res) => 
    res.data) )
    mutate(`/get-tags`);
    mutate(`/get-categories`)
    return {
        fetchedAllPosts: data,
        isLoading,
        isError: error
    }
}