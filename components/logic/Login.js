import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, View } from "react-native";
import CustomButton from "../ui/CustomButton";
import { login } from "../../util/authenticate";
import AuthComponenet from "../ui/AuthComponenet";

const DbUrl = 'https://react-native-2c1be-default-rtdb.firebaseio.com/users.json';


function Login({}) {
    const authCtx = useContext(AuthContext);

    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const handleLogin = async ({username, password}) => {
        setIsAuthenticating(true);
        try {
            const {token, role} = await login({username, password});
            authCtx.login(token, role);
        } catch (error) {
            Alert.alert('Invalid Authentication', 'Could not log you in, rewrite the credentails');
            setIsAuthenticating(false);           
        }
    };

    if(isAuthenticating) {
        return <ActivityIndicator size='large'/>
    }

    return (
        <AuthComponenet handleLogin={handleLogin}/>
    );
};

export default Login;



