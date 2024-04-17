import React from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductSchema = Yup.object().shape({
    name: Yup.string()
        .required('Required'),
    price: Yup.number()
        .required('Required'),
    // Ajoutez d'autres champs si nécessaire
});

async function addProduct(values) {
    try {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
            const response = await axios.post('http://10.0.2.2:8000/api/products', values, {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            });

            console.log(response.data);
        }
    } catch (error) {
        console.error(error);
    }
}

export default function AddProduct() {
    return (
        <Formik
            initialValues={{ name: '', price: '' }}
            validationSchema={ProductSchema}
            onSubmit={values => addProduct(values)}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        placeholder="Nom du produit"
                        placeholderTextColor="#8B8888"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={handleChange('price')}
                        onBlur={handleBlur('price')}
                        value={values.price}
                        placeholder="Prix du produit"
                        keyboardType="numeric"
                        placeholderTextColor="#8B8888"
                    />
                    <Button color="#A7000C" title="Ajouter" onPress={handleSubmit} />
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
        width: 300,
        borderColor: '#FFF',
        borderRadius: 10,
        color: '#fff',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});