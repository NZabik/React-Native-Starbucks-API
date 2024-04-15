import { StyleSheet, Text, Image, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

function Accueil() {
    const [logo, setLogo] = useState(require('./assets/BSG.png'));
    const navigation = useNavigation();
    const changeLogo = () => {
        // Cette fonction change le logo
        if (logo === require('./assets/BSG.png')) {
            setLogo(require('./assets/Viper.png')); // On change le logo
        } else {
            setLogo(require('./assets/BSG.png'));
        }
    };

    return (
        // SafeAreaView permet de gérer les problèmes de padding sur les appareils android
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>STARBUCKS</Text>
            {/* Changement de logo */}
            <TouchableOpacity onPress={changeLogo}>
                <Image source={logo} style={styles.logo} resizeMode="contain" />
            </TouchableOpacity>
            <Text style={styles.text2}>Test d'application Starbucks sur le thème de Battlestar Galactica !</Text>
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
    logo: {
        width: 300,
        height: 300,
        marginBottom: 40,
    },
    text: {
        color: '#fff',
        fontSize: 60,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    text2: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
    },
});

export default Accueil;