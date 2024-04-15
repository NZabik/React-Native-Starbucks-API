import { StyleSheet, Text, View, FlatList, TouchableHighlight, Alert } from 'react-native';
import React, { useState } from 'react';

function Products() {
    const [products, setProducts] = useState([
        {
            name: 'Iced Latte',
        },
        {
            name: 'Doubleshot Iced Coffee',
        },
        {
            name: 'Doubleshot Vanilla Iced Coffee',
        },
        {
            name: 'Caramel Macchiato',
        },
        {
            name: 'Iced Caramel Macchiato',
        },
        {
            name: 'Iced Cappuccino',
        },
        {
            name: 'Ristretto Bianco',
        },
        {
            name: 'Cold Brew Latte',
        },
        {
            name: 'Mocha',
        },
        {
            name: 'Iced Mocha',
        },
        {
            name: 'Americano',
        },
        {
            name: 'Iced Americano',
        },
        {
            name: 'Café Filtre',
        },
        {
            name: 'Café Filtre Glacé',
        },
        {
            name: 'Chocolat Viennois Signature',
        },
        {
            name: 'Chocolat Viennois Signature Glacé',
        },
    ]);

    return (

        <FlatList data={products} renderItem={(item) =>
            <TouchableHighlight
                onPress={() => {
                    Alert.alert('Votre commande', 'Vous avez commandé un ' + item.item.name)
                }}
                activeOpacity={0.8}
                underlayColor="rgba(167, 0, 12, 0.3)"
            >
                <View key={Math.random()} style={styles.container}>
                    <Text style={styles.card}>{item.item.name}</Text>
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
    }
});

export default Products;