import {createContext, useContext, useState} from 'react';
import type {ReactNode} from 'react';

import {AddUserTable, GetMail} from "../db.ts";


type LoginContextType = {
    user: boolean;
    isLoggedIn: boolean;
    login: (email: string, password: string) => boolean;

    Register: (email: string, password: string) => boolean;
    logout: () => void;
};

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<boolean>(false);
    console.log('mon user :' + user)

    const Register = async (email: string, password: string) => {

        const dbValue = await GetMail(email)


        if ((email.trim() == "" || password == "") || (dbValue?.email.trim() == email.trim())) {
            setUser(false);
            console.log(setUser(false))
            return false;
        } else {
            await AddUserTable(email.trim(), password.trim())


            setUser(true);
            return true;
        }
    };

    const login = async (email: string, password: string) => {
        const user = await GetMail(email)
        if ((!user || (user.password != password))) {
            setUser(false);
            return false;
        }
        if(email.trim() == "" || password.trim() == ""){
            setUser(false);
            return false;

        } else {
            setUser(true);
            return true

        }

    }


    const logout = () => {
        setUser(false);
    };

    const isLoggedIn = user;

    return (
        <LoginContext.Provider value={{user, isLoggedIn, logout, Register, login}}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => {
    const context = useContext(LoginContext);
    if (!context) {
        throw new Error('useLogin must be used within a LoginProvider');
    }
    return context;
};



