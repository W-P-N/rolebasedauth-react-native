import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/ui/CustomButton";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Home() {
    const [role, setRole] = useState();

    useEffect(() => {
        const getRole = async() => {
            const userRole = await AsyncStorage.getItem('role');
            setRole(userRole);
        };

        getRole();
    }, []);

    return (
        <>
        <View style={styles.container}>
            <Text>
                This is Home Screen
            </Text>
            <CustomButton text={`${role}`}/>
        </View>
        </>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
