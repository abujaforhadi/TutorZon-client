import React, { createContext, useState } from 'react';


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    const CreateUser = async (email, password) => {

    }
    const userInfo = {
        CreateUser,

    }


    return (
        <AuthContext.Provider value={userInfo}>
            {children}

        </AuthContext.Provider>
    );
};

export default AuthProvider;