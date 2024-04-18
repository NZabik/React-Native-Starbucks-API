import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, TextInput, Alert, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Formik } from 'formik';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProductItem({ item, modifyProduct }) {
    return (
        <Formik
            initialValues={{ name: item.name, price: item.price.toString() }}
            onSubmit={values => modifyProduct(item.id, values)}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={styles.container}>
                    <TextInput 
                        style={styles.text}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                    />
                    <TextInput
                        style={styles.text}
                        onChangeText={handleChange('price')}
                        onBlur={handleBlur('price')}
                        value={values.price}
                        keyboardType="numeric"
                    />
                    <Button color="#A7000C" title="Modifier" onPress={handleSubmit} />
                </View>
            )}
        </Formik>
    );
}

function ModifyProduct() {
    const [products, setProducts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
            const response = await axios.get('http://10.0.2.2:8000/api/products', {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            });

            setProducts(response.data);
            setRefreshing(false);
        }
    }

    async function modifyProduct(id, values) {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
            await axios.put(`http://10.0.2.2:8000/api/products/${id}`, values, {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            });
            Alert.alert('Produit modifié avec succès');
            setRefreshing(true);
            fetchProducts();
        }
    }

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        style={styles.liste}
        >
        <FlatList
            data={products}
            extraData={refreshing}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <ProductItem item={item} modifyProduct={modifyProduct} />}
            onRefresh={fetchProducts}
            refreshing={refreshing}
        />
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        alignItems: 'center',
        borderColor: '#FFF',
        borderStyle: 'solid',
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 5,
        marginTop: 5,
        paddingBottom: 10,
        width: 300,
    },
    text: {
        height: 40,
        width: 280,
        borderColor: '#B8B8B8B8',
        borderRadius: 10,
        color: '#fff',
        borderWidth: 1,
        marginBottom: 10,
        marginTop: 10,
        paddingHorizontal: 10,
    },
    liste: {
        backgroundColor: '#000',
        alignItems: 'center',
    },
});
export default ModifyProduct;