import useSWR from "swr";
import { Category, FetchedPosts } from "../protocols/postsProtocol";
import axios from "axios";

interface UseCategoriesResult {
    fetchedCategories: Category[];
    isLoading: boolean;
    isError: any;
}

export default function useCategories(): UseCategoriesResult{
    const {data, error, isLoading} = useSWR(`/get-categories`, (url) =>
    axios.get(url).then((res) => 
    res.data) )
    return {
        fetchedCategories: data,
        isLoading,
        isError: error
    }
}