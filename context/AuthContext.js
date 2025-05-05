import { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
    token: '',
    login: (token, role_) => {},
    logout: () => {},
    isAuthenticated: false,
    userRole: ''
});

export default function AuthContextProvider({children}) {
    const [authToken, setAuthToken] = useState();
    const [role, setRole] = useState();

    const login =  (token, role_) => {
        setAuthToken(token);
        AsyncStorage.setItem('token', token.toString());
        console.log(role_);
        try {
            setRole(role_);
            AsyncStorage.setItem('role', role_);
        } catch (error) {
            console.log(error)
        }
    };

    const logout = () => {
        setAuthToken(null);
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('role');
    };

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        login: login,
        logout: logout,
        userRole: role
    }
    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
