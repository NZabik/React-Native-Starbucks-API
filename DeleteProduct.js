import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { useIsFocused, useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function DeleteProduct() {
    const [products, setProducts] = useState([]);
    const [active, setActive] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            fetchProducts();
        }, [])
    );

    async function fetchProducts() {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
            const response = await axios.get('http://10.0.2.2:8000/api/products', {
                headers: {
                    Authorization: `bearer ${storedToken}`
                }
            });
            setProducts(response.data);
        }
        setRefreshing(false);
    }

    async function deleteProduct(id) {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
            await axios.delete(`http://10.0.2.2:8000/api/products/${id}`, {
                headers: {
                    Authorization: `bearer ${storedToken}`
                }
            });
            Alert.alert('Produit supprimé avec succès');
            fetchProducts();
        }
    }
    

    return (
        <FlatList
            data={products}
            extraData={refreshing}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.container}>
                    <View style={styles.liste}>
                        <View>
                            <Text style={styles.text}>{item.name}</Text>
                            <Text style={styles.text}>{item.price} €</Text>
                        </View>
                        <View>
                            <Button color="#A7000C" title="Supprimer" onPress={() => deleteProduct(item.id)} />
                        </View>
                    </View>
                </View>
            )}
            onRefresh={fetchProducts}
            refreshing={refreshing}
        />
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        alignItems: 'center',
    },
    liste: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 10,
        width: 300,
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
    },
    text: {
        color: '#fff',
    },
});
export default DeleteProduct;