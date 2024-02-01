import { atom } from "recoil";

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