import { StyleSheet, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, Button, useTheme } from "react-native-paper";
import { TouchableOpacity } from 'react-native-gesture-handler';

const Favorites = ({ navigation }) => {

    const theme = useTheme()
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", height: "100%", paddingLeft: 20, paddingRight: 20 }}>
            <Text style={styles.TitleStyle}>Favorites</Text>

            <View>

                <View style={styles.LoginImageContainer}>
                    <Image
                        source={require("../assets/Images/BitcoinEmpty.png")}
                        style={styles.LoginImageStyle}
                    />
                </View>
                <View style={styles.contentContainer}>

                    <Text style={[styles.contentStyle]} variant="titleLarge" >Look's like you don't have any favorite coins yet.</Text>
                    <Text style={[styles.contentStyle, { color: theme.colors.iconsColor }]} variant="labelMedium">Browse back to home to find your favorite coin.</Text>

                </View>

                <View style={styles.ButtonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>

                        <Button icon="home">
                            Home
                        </Button>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    )
}

export default Favorites

const styles = StyleSheet.create({
    TitleStyle: {
        textAlign: 'center', paddingTop: 40,
        fontSize: 22, fontFamily: 'Roboto-Medium'
    }, LoginImageContainer: {
        height: 320,
        marginTop: 30
    },
    LoginImageStyle: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        alignSelf: "center",

    },
    contentStyle: {
        textAlign: 'center'
    },
    contentContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 20
    }, ButtonContainer: {
        marginTop: 40
    }
})