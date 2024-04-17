import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        async function getToken() {
            const storedToken = await AsyncStorage.getItem('userToken');
            setToken(storedToken);
        }

        getToken();
    }, []);

    async function login() {
        try {
            const response = await axios.post('http://10.0.2.2:8000/api/login_check', {
                username: username,
                password: password
            });

            if (response.status === 200) {
                console.log('Login successful');
                const token = response.data.token; // récupérer le token
                console.log('Token:', token);
                // stocker le token pour une utilisation ultérieure
                await AsyncStorage.setItem('userToken', token);
                setToken(token);
                // naviguer vers la page d'accueil
                navigation.navigate('Présentation');
            } else {
                console.log('Login failed');
                // handle failed login here
            }
        } catch (error) {
            console.error('An error occurred while logging in:', error);
            // handle error here
        }
    }

    async function logout() {
        // supprimer le token du stockage
        await AsyncStorage.removeItem('userToken');
        setToken(null);

        // naviguer vers la page de connexion
        navigation.navigate('Présentation');
    }

    return (
        <View style={styles.container}>
            <Text style={{ color: '#fff', marginBottom: 20 }}>Connexion / déconnexion</Text>
            {!token && (<TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#8B8888"
                onChangeText={setUsername}
                value={username}
            />)}
            {!token && (<TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#8B8888"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />)}
            {!token && (
            <View style={styles.button}>
        <Button color="#A7000C" title="Connexion" onPress={login} />
    </View>)}
    {token && (
    <View style={styles.button}>
        <Button color="#A7000C" title="Déconnexion" onPress={logout} />
    </View>)}
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
    input: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        color: '#fff',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        marginBottom: 10,
    },
});