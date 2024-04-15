import { StyleSheet, Text, View, Button, Linking } from 'react-native';


function Contact() {
    const phoneNumber = '0123456789';
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Téléphone:</Text>
            <Text style={styles.text}>0123456789</Text>
            <Button
                title="Nous appeler"
                onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
                color="#A7000C"
            />
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
        marginBottom: 20,
    },
});
export default Contact;