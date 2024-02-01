export interface Post {
    id:number
    image: string;
    title: string;
    description: string;
    category?: Category;
    tag?: Tag;
    user: User;
}

export interface Category {
    id: number;
    name: string;
}
export interface Tag {
    id: number;
    name: string;
}

export interface User {
    id: number;
    userName: string;
}


export interface FetchedPosts extends Post {
    data: Post[],
    pagination: {
        currentPage: number,
        totalPages: number
    }
}