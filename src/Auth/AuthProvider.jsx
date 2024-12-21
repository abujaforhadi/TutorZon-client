import React, { createContext, useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Auth from '../Firebase/Firebase.config';



export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    const CreateUser = async (email, password) => {

    }
     // implement google login
    const loginWithGoogle=()=>{
       
        const provider = new GoogleAuthProvider();
        signInWithPopup(Auth, provider)

    }
    const userInfo = {
        CreateUser,
        loginWithGoogle

    }


    return (
        <AuthContext.Provider value={userInfo}>
            {children}

        </AuthContext.Provider>
    );
};

export default AuthProvider;