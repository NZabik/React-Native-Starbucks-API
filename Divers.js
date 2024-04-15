import { StyleSheet, Text, View, TouchableOpacity, Modal, Button } from 'react-native';
import React, { useState, useEffect } from 'react';

function Divers() {
    const [isDisplayed, setIsDisplayed] = useState(false);
    const [modal, setModal] = useState(false);
    return (
        <View style={styles.container}>
            {/*  modale */}
            <Modal transparent={true} visible={modal} animationType="fade">
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,.5)'
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        padding: 17,
                        elevation: 40,
                        shadowColor: '#A7000C',
                        shadowOpacity: .4,
                        shadowRadius: 5,
                        shadowOffset: { width: 0, height: 0 },
                        alignItems: 'flex-end',
                    }}>
                        <TouchableOpacity onPress={() => setModal(false)}>
                            <Text style={{
                                textAlignVertical: "center",
                                textAlign: "center",
                                borderStyle: "solid",
                                borderWidth: 2,
                                borderRadius: 30,
                                borderColor: '#A7000C',
                                fontSize: 15,
                                width: 30,
                                height: 30,
                                color: '#A7000C',
                                marginBottom: 8
                            }}>X</Text>
                        </TouchableOpacity>
                        <Text>Ceci est ma première modale</Text>
                    </View>
                </View>
            </Modal>
            {!isDisplayed && <Button onPress={() => setModal(true)} title='test modale'></Button>}
        </View>
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
    },
});
export default Divers;