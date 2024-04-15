import { StyleSheet, View, SafeAreaView, Platform, StatusBar } from 'react-native';
import React from 'react';
import Products from './Products';

function Menu2() {
    return (
        // SafeAreaView permet de gérer les problèmes de padding sur les appareils android
        <SafeAreaView style={styles.container}>
            <View style={{ marginTop: 20, marginBottom: 40 }}>
                {<Products />}
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