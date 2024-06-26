import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';

export default function Login() {
    const [token, setToken] = useState(null);
    const navigation = useNavigation();
    const [roles, setUserRoles] = useState(null);
    useEffect(() => {
        async function getToken() {
            const storedToken = await AsyncStorage.getItem('userToken');
            setToken(storedToken);
        }

        getToken();
    }, []);

    async function login(values) {
        try {
            const response = await axios.post('http://10.0.2.2:8000/api/login_check', {
                username: values.username,
                password: values.password
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
            Alert.alert('Erreur', 'Nom ou mot de passe incorrects');
        }
    }

    async function logout() {
        // supprimer le token du stockage
        await AsyncStorage.removeItem('userToken');
        setToken(null);
        setUserRoles(null);
        // naviguer vers la page de connexion
        navigation.navigate('Présentation');
    }

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={login}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={styles.container}>
                    {!token && (<TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="#8B8888"
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}
                    />)}
                    {!token && (<TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#8B8888"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry
                    />)}
                    {!token && (
                        <View style={styles.button}>
                            <Button color="#A7000C" title="Connexion" onPress={handleSubmit} />
                        </View>
                    )}
                    {token && (
                        <View style={styles.button}>
                            <Button color="#A7000C" title="Déconnexion" onPress={logout} />
                        </View>
                    )}
                </View>
            )}
        </Formik>
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
        borderColor: '#FFF',
        borderRadius: 10,
        color: '#fff',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        marginBottom: 10,
    },
});