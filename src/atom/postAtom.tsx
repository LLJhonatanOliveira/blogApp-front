import { atom } from "recoil";

export const filter = atom<string>({
    key: 'filter',
    default: '',
});
