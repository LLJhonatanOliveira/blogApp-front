import { atom } from "recoil";
export interface UserData{
    userName: string;
    token: string;
}
export const userState = atom<UserData>({
    key: 'userState',
    default:{
        userName:"",
        token:""
    }
})