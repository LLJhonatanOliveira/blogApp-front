import { atom } from "recoil";
import { Post } from "../protocols/postsProtocol";

export const filter = atom<string>({
    key: 'filter',
    default: '',
});

export const page = atom<number>({
    key: 'page',
    default:1,
})

export const valueState = atom<number>({
    key: 'valueState',
    default:0,
})

export const postState = atom<Post>({
    key:'postState',
    default:{
        id:0,
        image: '',
        title:'',
        description: '',
        category:{
            id: 0,
            name:''
        },
        tag: {
            id: 0,
            name: ''
        },

        user: {
            id:0,
            userName:''
        }
    }
})