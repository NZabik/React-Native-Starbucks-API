import { StyleSheet, Text, View } from 'react-native';


function Divers2() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Divers2</Text>
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
export default Divers2;