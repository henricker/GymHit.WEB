import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useState } from "react"

type AuthContextProps = {
    children: ReactNode
}

type AuthProps = {
    id: string,
    email: string;
    accessToken: string;
    profile_url: string;
    fantasy_name: string;
}

type AuthData = {
    user: AuthProps;
    login: (data: AuthProps) => void;
    getAuth: () => AuthProps;
}

export const AuthContext = createContext({} as AuthData)

export function AuthContextProvider({ children }: AuthContextProps) {
    const [auth, setAuth] = useState({} as AuthProps);

    function login(data: AuthProps) {
        setAuth(data);
        localStorage.setItem('auth', JSON.stringify(data));
    }

    function getAuth() {
        if(auth?.accessToken)
            return auth;

        const authExists = JSON.parse(localStorage.getItem('auth') ?? '{}');

        if(authExists) {
            setAuth(authExists);
            return authExists;
        }

        return null;
    }

    return (
        <AuthContext.Provider value={{ getAuth, login, user: auth } as AuthData} >
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthData =>
  useContext(AuthContext);
