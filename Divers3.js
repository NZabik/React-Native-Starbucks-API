import { StyleSheet, Text, View } from 'react-native';


function Divers3() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Divers3</Text>
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
export default Divers3;