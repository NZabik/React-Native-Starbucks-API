import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Products from './Products';

function Menu() {
    const [isDisplayed, setIsDisplayed] = useState(false);
    const [modal, setModal] = useState(false);
    const navigation = useNavigation();
    // ferme automatiquement la liste quand on change de page
    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setIsDisplayed(false);
        });

        return unsubscribe;
    }, [navigation]);

    return (
        // SafeAreaView permet de gérer les problèmes de padding sur les appareils android
        <SafeAreaView style={styles.container}>
            <View style={{ marginTop: 20, marginBottom: 40 }}>
                {isDisplayed && (<Products />)}
                <TouchableOpacity
                    onPress={() => setIsDisplayed(prevState => !prevState)}
                    style={{ width: 'auto', backgroundColor: '#A7000C', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 3 }}
                    activeOpacity={0.5}
                >
                    <Text style={{ color: '#fff', textAlign: 'center' }}>
                        {isDisplayed ? 'Fermer' : 'Menu'}</Text>
                </TouchableOpacity>
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

export default Menu;