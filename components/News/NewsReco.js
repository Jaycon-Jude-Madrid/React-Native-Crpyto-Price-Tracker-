import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme, TextInput, Text } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import RecoList from './RecoList';
import useFetch from '../../Hooks/useFetch';

const NewsReco = () => {

    const { data } = useFetch("https://newsapi.org/v2/everything?q=bitcoin&apiKey=c8c09c09bbf94a00bb56767423be2eaa")

    const filteredData = data?.articles?.slice(0, 50).filter(item => item.author || item.urlToImage).sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    return (
        <View>
            <Text style={styles.RecoStyle}>Recommendation</Text>

            <View>
                <FlatList
                    data={filteredData}
                    renderItem={({ item }) => <RecoList item={item} />}
                    keyExtractor={(item, index) => index}
                    contentContainerStyle={{ paddingBottom: 430, paddingHorizontal: 5 }}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator
                />
            </View>
        </View >
    )
}

export default NewsReco

const styles = StyleSheet.create({
    RecoStyle: {
        marginLeft: 20, marginTop: 10, marginBottom: 10, fontFamily: 'Roboto-Medium', fontSize: 20

    }
})