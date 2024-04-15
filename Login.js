import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

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
                // naviguer vers la page d'accueil
                navigation.navigate('Accueil');
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

        // naviguer vers la page de connexion
        navigation.navigate('Accueil');
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={setUsername}
                value={username}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />
            <Button title="Login" onPress={login} />
            <Button title="Logout" onPress={logout} />
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
});