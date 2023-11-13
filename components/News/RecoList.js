import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo'
import { Linking } from 'react-native';


const RecoList = ({ item }) => {

    const { author, title, url, urlToImage, publishedAt, } = item;



    const dateObj = new Date(publishedAt);

    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('en-US', options);

    const handleLinkPress = () => {
        Linking.openURL(url);
    };



    const TitleLength = () => {

        if (title.length >= 100) {
            return title.slice(0, 70)
        } else {
            return title
        }
    }
    return (
        <TouchableOpacity style={styles.recoListContainer} onPress={() => handleLinkPress()}>
            <View style={styles.imageandContentsContainer}>

                <View style={styles.imageStyleContainer}>
                    <Image style={styles.imageStyle} source={{ uri: urlToImage }} />
                </View>
                <View style={styles.contentsContainer}>
                    <Text style={[styles.cryptoStyle, { fontFamily: 'Roboto-Medium', fontSize: 14 }]}>
                        Cryptocurrency
                    </Text>
                    <Text style={{ width: 200, fontFamily: 'Roboto-Bold', fontSize: 18 }}>

                        {TitleLength()}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.cryptoStyle}>
                            {author}
                        </Text>
                        <Entypo name={'dot-single'} color={'#b7b7b7'} size={20} />
                        <Text style={styles.cryptoStyle}>
                            {formattedDate}
                        </Text>
                    </View>

                </View>
            </View>
        </TouchableOpacity>
    )
}

export default RecoList

const styles = StyleSheet.create({
    recoListContainer: {
        padding: 10, height: 'auto'
    }, imageStyleContainer: {
        width: 100,


    }, imageStyle: {
        width: 120,
        height: 120,
        resizeMode: "cover",
        borderRadius: 20
    }, imageandContentsContainer: {

        flexDirection: "row", alignItems: 'center', gap: 30

    }, contentsContainer: {
        flexDirection: 'column', justifyContent: 'space-between', height: 120,
    }, cryptoStyle: {
        color: '#c1c1c1', fontFamily: 'Roboto-Regular', fontSize: 12
    }
})