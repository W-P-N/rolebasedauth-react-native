import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Platform, StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import AuthContextProvider, { AuthContext } from './context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import Login from './components/logic/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: ({tintColor}) => <Ionicons name='exit' size={24} onPress={authCtx.logout} color={tintColor}/>
      }}
    >
      <Stack.Screen name='Welcome' component={Home} options={{
         headerStyle: {
          backgroundColor: 'lightblue',
          marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        },
      }}/>
    </Stack.Navigator>
  )
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: 'yellow'}
      }}
    >
      <Stack.Screen name='Login' component={Login} />
    </Stack.Navigator>
  )
};

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  )
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      if(storedToken) {
        authCtx.login(storedToken);
      }

      setIsTryingLogin(false);
    };
    fetchToken();
  });

  if(isTryingLogin) {
    return <ActivityIndicator size='large' />
  }
  return <Navigation />
}

export default function App() {

  return (
    <>
        <StatusBar style="auto"  />
          <AuthContextProvider>
            <Root />
          </AuthContextProvider>
      
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
