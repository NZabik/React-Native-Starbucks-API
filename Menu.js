import { StyleSheet, Text, View, Button, SafeAreaView, Platform, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Products from './Products';

function Menu2() {
    const [refreshKey, setRefreshKey] = useState(0);
    const isFocused = useIsFocused();
    const [token, setToken] = useState(null);

    async function getToken() {
        const storedToken = await AsyncStorage.getItem('userToken');
        setToken(storedToken);
    }

    useEffect(() => {
        getToken();
        if (isFocused) {
            setRefreshKey(prevKey => prevKey + 1);
        }
    }, [isFocused]);



    return (
        // SafeAreaView permet de gérer les problèmes de padding sur les appareils android
        <SafeAreaView style={styles.container}>
            <View style={{ marginTop: 20, marginBottom: 40 }}>
                {token ? (<Products key={refreshKey} />) : (
                    <Text style={{ color: '#fff', textAlign: 'center' }}>
                        Veuillez vous connecter pour voir nos produits
                    </Text>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Menu2;