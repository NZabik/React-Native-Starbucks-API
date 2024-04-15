import { StyleSheet, Text, View, FlatList, TouchableHighlight, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Products() {
    const [products, setProducts] = useState('');
    useEffect(() => {
        async function getTokenAndFetchProducts() {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                fetchProducts(token);
            }
        }

        getTokenAndFetchProducts();
    }, []);
    async function fetchProducts(token) {
        try {
            const response = await axios.get('http://10.0.2.2:8000/api/products', {
                headers: {
                    Authorization: `bearer ${token}`
                }
            });
    
            if (response.status === 200) {
                console.log('Products fetched successfully');
                setProducts(response.data); // supposons que response.data est un tableau de produits
            } else {
                console.log('Failed to fetch products');
            }
        } catch (error) {
            console.error('An error occurred while fetching products:', error);
        }
    }
    return (

        <FlatList data={products} renderItem={(item) =>
            <TouchableHighlight
                onPress={() => {
                    Alert.alert('Votre commande', 'Vous avez commandé un ' + item.item.name)
                }}
                activeOpacity={0.8}
                underlayColor="rgba(167, 0, 12, 0.3)"
            >
                <View key={Math.random()} style={styles.card}>
                    <Text style={styles.cardText}>{item.item.name}</Text>
                    <Text style={styles.cardText}>{item.item.price} €</Text>
                </View>
            </TouchableHighlight>}
            style={{ width: '100%' }}
            keyExtractor={item => Math.random()}
        />

    );
}
const styles = StyleSheet.create({
    card: {
        width: '100%',
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#A7000C',
        color: '#fff',
    },
    cardText: {
        color: '#fff',
    }
});

export default Products;