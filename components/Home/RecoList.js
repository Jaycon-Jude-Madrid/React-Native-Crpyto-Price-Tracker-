import { StyleSheet, View, Image } from 'react-native'
import React from 'react'
import { useTheme, Text } from 'react-native-paper'

const RecoList = ({ item }) => {

    const btcPriceInUSD = 25024;
    const btcAmount = item.item.price_btc;
    const usdValue = btcAmount * btcPriceInUSD;

    const theme = useTheme();
    return (
        <View style={[styles.container, { borderColor: theme.colors.iconsColor }]}>
            <View>
                <Image source={{ uri: item.item.large }} style={styles.image} />
            </View>
            <View>
                <Text variant="labelMedium" style={styles.coinNameStyle}>{item.item.name}</Text>
                <Text variant="labelSmall" style={styles.coinPriceStyle}>${usdValue.toFixed(2)}<Text variant="labelSmall" style={[styles.coinPercentageStyle, { color: theme.colors.iconsColor }]}> Rank #{item.item.market_cap_rank}</Text>
                </Text>

            </View>
        </View>
    )
}

export default RecoList

const styles = StyleSheet.create({
    container: {
        height: 120,
        width: 120,
        borderWidth: 0.2,
        borderRadius: 5, marginRight: 10, marginTop: 10, marginBottom: 15, backgroundColor: 'white',
        justifyContent: 'space-between',
        padding: 10,
    },
    coinNameStyle: {
        fontSize: 15, fontFamily: "Roboto-Medium"
    }, coinPriceStyle: {
        fontSize: 12, fontFamily: "Roboto-Regular", marginTop: 5,
    }, coinPercentageStyle: {
        fontSize: 12,
    }, image: {
        height: 30,
        width: 30,
    },
})