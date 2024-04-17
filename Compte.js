import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import { decode as atob, encode as btoa } from 'base-64'
if (!global.btoa) {  global.btoa = btoa }
if (!global.atob) { global.atob = atob }

function Compte() {
    const isFocused = useIsFocused();
    const [username, setUsername] = useState(null);

    async function decodeToken() {
        try {
            const storedToken = await AsyncStorage.getItem('userToken');
            if (storedToken) {
                const decodedToken = jwtDecode(storedToken);
                console.log(username);
                setUsername(decodedToken.username);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        decodeToken();
    // Effet de nettoyage
    return () => {
        setUsername(null);
    };
}, [isFocused]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Compte</Text>
            {username && <Text style={styles.text}>Nom d'utilisateur : {username}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 20,
    },
});

export default Compte;