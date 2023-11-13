import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from 'react-native-paper';

const BreaknewsList = ({ item }) => {

    const { source, title, publishedAt, url, urlToImage } = item;

    const theme = useTheme()

    const now = new Date();

    // Specify the date string
    const dateString = publishedAt;

    // Create a new Date object from the date string
    const date = new Date(dateString);

    // Calculate the difference in milliseconds between the current date and the provided date
    const diffInMilliseconds = now - date;

    // Convert the difference to hours
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));

    // Format the result as "X hours ago"
    const result = diffInHours + " hours ago";

    const handleLinkPress = () => {
        Linking.openURL(url);
    };

    return (
        <TouchableOpacity onLongPress={() => handleLinkPress()}>
            <ImageBackground source={{ uri: urlToImage }} // Replace with your image path
                style={styles.imageContainer} imageStyle={{ borderRadius: 30 }}>

                <View style={styles.textContainer}>
                    <View style={styles.cryptoCurrencyBackground}>

                        <Text style={styles.textStyle}>Cryptocurrency</Text>
                    </View>
                    <View>

                        <View style={styles.sourceAndTimeContainer}>
                            <View style={styles.sourceAndCheck}>

                                <Text style={styles.sourceAndTimeStyle}>{source.name}</Text>
                                <Ionicons name="checkmark-sharp" size={12} color={'white'} style={{ backgroundColor: theme.colors.primary, borderRadius: 50, padding: 3, height: 18 }} />

                            </View>
                            <Entypo name={'dot-single'} color={'white'} size={20} />
                            <Text style={styles.sourceAndTimeStyle}>{diffInHours >= 24 ? "1 day ago" : result}</Text>
                        </View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleStyle}>"{title}"</Text>
                        </View>
                    </View>


                </View>

            </ImageBackground>
        </TouchableOpacity>

    )
}

export default BreaknewsList

const styles = StyleSheet.create({
    imageContainer: {
        height: 220,
        width: 350,
        resizeMode: 'cover',
        marginRight: 10, marginLeft: 5, marginBottom: 10, marginTop: 20,


    },
    cryptoCurrencyBackground: {
        backgroundColor: '#0b86e7', width: 105, padding: 5, paddingLeft: 7, justifyContent: 'center', borderRadius: 10
    },
    textStyle: {
        color: 'white',
        fontFamily: 'Roboto-Black'
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: "space-between",
        padding: 20,
        height: '100%',
    }, sourceAndTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    }, sourceAndTimeStyle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 15, color: 'white',

    }, titleContainer: {
        marginTop: 5

    }, titleStyle: {
        fontFamily: 'Roboto-Black', fontSize: 20, color: 'white',

    }, sourceAndCheck: {
        flexDirection: 'row', alignContent: 'center', gap: 5
    }
})