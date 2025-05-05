import axios from "axios";


async function authenticate(username, password) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAnvBvzI1loqbYrnrrMBxkQFB_sfeqpLA4`;
    const dbUrl = 'https://react-native-2c1be-default-rtdb.firebaseio.com/users.json';

    const resp = await axios.post(url, {
        email: username,
        password: password,
        returnSecureToken: true
    });

    const db = await axios.get(dbUrl);

    const users = db.data;
    try {
        const role = Object.values(users).find(user => user.email === username).role;
        const token = resp.data.idToken;
        return { token, role };
    } catch (error) {
        console.log(error)
        return;
    }

};

export function login({username, password}) {
    return authenticate(username, password)
}
