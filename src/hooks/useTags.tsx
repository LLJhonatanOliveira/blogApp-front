import useSWR from "swr";
import {  Tag } from "../protocols/postsProtocol";
import axios from "axios";

interface UseTagsResult {
    fetchedAllTags: Tag[];
    isLoading: boolean;
    isError: any;
}

export default function useTags(): UseTagsResult{
    const {data, error, isLoading} = useSWR(`/get-tags`, (url) =>
    axios.get(url).then((res) => 
    res.data) )
    return {
        fetchedAllTags: data,
        isLoading,
        isError: error
    }
}