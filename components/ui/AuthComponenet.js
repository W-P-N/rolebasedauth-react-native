import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, View } from "react-native";
import CustomButton from "../ui/CustomButton";
import { login } from "../../util/authenticate";

const DbUrl = 'https://react-native-2c1be-default-rtdb.firebaseio.com/users.json';


function AuthComponenet({handleLogin}) {
    // const authCtx = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // const [isAuthenticating, setIsAuthenticating] = useState(false);

    const handleSubmit = async () => {
        handleLogin({username, password})
    };

    // if(isAuthenticating) {
    //     return <ActivityIndicator size='large'/>
    // }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Username</Text>
            <TextInput style={styles.inputField} onChangeText={
                (text) => setUsername(text) 
            } textContentType='username'/>
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.inputField} onChangeText={
                (text) => setPassword(text)
            } textContentType='password' secureTextEntry={true}/>
            <CustomButton text='Login' onPress={handleSubmit}/>
        </View>
    );
};

export default AuthComponenet;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems:'flex-start',
        padding: 24
    },
    inputField: {
        marginVertical: 12,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 4,
        fontSize: 14,
        width: 300
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})


