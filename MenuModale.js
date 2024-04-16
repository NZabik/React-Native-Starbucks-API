import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Products from './Products';

function MenuModale() {
    const [isDisplayed, setIsDisplayed] = useState(false);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [token, setToken] = useState(null);

    async function getToken() {
        const storedToken = await AsyncStorage.getItem('userToken');
        setToken(storedToken);
    }

    useEffect(() => {
        getToken();
    }, [isFocused]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setIsDisplayed(false);
        });

        return () => {
            unsubscribe();
        };
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ marginTop: 20, marginBottom: 40 }}>
                {isDisplayed && (<Products />)}
                {token ? (
                    <TouchableOpacity
                        onPress={() => setIsDisplayed(prevState => !prevState)}
                        style={{ width: 'auto', backgroundColor: '#A7000C', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 3 }}
                        activeOpacity={0.5}
                    >
                        <Text style={{ color: '#fff', textAlign: 'center' }}>
                            {isDisplayed ? 'Fermer' : 'Menu'}
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <Text style={{ color: '#fff', textAlign: 'center' }}>
                        Veuillez vous connecter
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

export default MenuModale;