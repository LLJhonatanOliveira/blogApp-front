import { ReactNode, createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

interface UserData {
    userName: string;
    token: string;
}

interface UserContextType {
    userData: UserData;
    setUserData: (data: UserData) => void;
}

const UserContext = createContext<UserContextType>({ userData: { userName: '', token: '' }, setUserData: () => {} });

export default UserContext;

export function UserProvider({ children }: { children: ReactNode }) {
    const [userData, setUserData] = useLocalStorage('userData', { userName: '', token: '' });

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
}
