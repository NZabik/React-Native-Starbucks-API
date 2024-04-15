import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import { Popup } from 'react-native-map-link';
import { Marker } from 'react-native-maps';

function Contact3() {

    const [isVisible, setIsVisible] = useState(false);
    const options = {
        latitude: 50.37216,
        longitude: 3.08272,
        title: '133 Rue Saint-Thomas, 59500 Douai',
        dialogTitle: 'Naviguer vers 133 Rue Saint-Thomas, 59500 Douai',
        dialogMessage: ' Sélectionner le logiciel de navigation',
        cancelText: 'Annuler',
    };
    return (
        <>
            <Popup
                isVisible={isVisible}
                onCancelPressed={() => setIsVisible(false)}
                onAppPressed={() => setIsVisible(false)}
                onBackButtonPressed={() => setIsVisible(false)}
                modalProps={{
                    animationIn: 'slideInUp',
                }}
                appsWhiteList={[]}
                options={options}
                style={{}}
            />
            <View style={styles.container}>
                <Text style={styles.text}>133 Rue Saint-Thomas, 59500 Douai</Text>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 50.37216,
                        longitude: 3.08272,
                        latitudeDelta: 0.004,
                        longitudeDelta: 0.004,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: 50.37216,
                            longitude: 3.08272,
                        }}
                        title={"SOFIP Douai"}
                        description={"133 Rue Saint-Thomas"}
                    />
                </MapView>
                {!isVisible && <Button onPress={() => setIsVisible(true)} color="#A7000C" title='Navigation'></Button>}
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',

    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    map: {
        width: '100%',
        height: '80%',
        marginBottom: 20,
    },
});
export default Contact3;