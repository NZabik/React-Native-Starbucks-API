import { StyleSheet, Text, View, Button, Linking } from 'react-native';


function Contact2() {
    const mail = 'test@gmail.com';
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Email</Text>
            <Text style={styles.text}>test@gmail.com</Text>
            <Button
                title="Nous écrire"
                onPress={() => Linking.openURL(`mailto:${mail}`)}
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
export default Contact2;