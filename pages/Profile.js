import { StyleSheet, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar, Text, useTheme, IconButton, Colors } from 'react-native-paper';


const Profile = () => {

    const theme = useTheme()
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", height: "100%", paddingLeft: 20, paddingRight: 20 }}>

            <Text style={styles.TitleStyle}>Profile</Text>

            <View style={styles.textAndImageContainer}>


                <Avatar.Text size={70} label="JD" />
                <View style={styles.iconButtonStyle}
                >

                    <IconButton
                        icon="pencil"
                        color={"#0165ff"}
                        size={20}
                        onPress={() => console.log("Profile")}
                        accessibilityLabel="Edit profile"
                    />
                </View>


                <View style={styles.textContainer}>

                    <Text variant="titleLarge" style={styles.nameStyle}>
                        Jaycon Jude Madrid
                    </Text>
                    <Text variant="labelMedium" style={[styles.emailStyle, { color: theme.colors.iconsColor }]}>
                        jayconmadrid46@gmail.com
                    </Text>


                </View>
                <View>
                    <Text variant="bodyLarge" style={[styles.textStyle, { color: theme.colors.iconsColor }]}>Crypto Enthusiast</Text>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    TitleStyle: {
        textAlign: 'center', paddingTop: 40,
        fontSize: 22, fontFamily: 'Roboto-Medium'
    },
    textAndImageContainer: {

        marginVertical: 60,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
    }, iconButtonStyle: {
        position: 'absolute', top: -20, right: 100
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center', gap: 2
    }, nameStyle: {
        fontFamily: 'Roboto-Medium'
    }, emailStyle: {
        fontFamily: 'Roboto-Medium'
    }, textStyle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 20,
    }
})