import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'
import Ionicons from "react-native-vector-icons/Ionicons";
import RecoList from './RecoList';
import useFetch from '../../Hooks/useFetch';

const RecoToBuy = () => {

    const theme = useTheme();
    const { data, isLoading } = useFetch('https://api.coingecko.com/api/v3/search/trending')

    return (
        <View style={styles.container}>

            <View style={styles.titleContainer}>
                <Text variant="labelSmall" style={[styles.titleStyle, { color: theme.colors.iconsColor }]}>Recommended to buy</Text>

                <Ionicons name="thumbs-up-sharp" size={16} color={theme.colors.primary} />
            </View>
            <View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={data.coins}
                    renderItem={({ item }) => <RecoList item={item} />}
                />
            </View>
        </View>
    )
}

export default RecoToBuy

const styles = StyleSheet.create({
    container: {
        marginTop: 40

    },
    titleContainer: {
        justifyContent: "flex-start", flexDirection: 'row',
        alignItems: 'center',
        gap: 10,

    },
    titleStyle: {
        fontSize: 12,
        fontFamily: 'Roboto-Bold'
    }
})