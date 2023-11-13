import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NewsHeader from '../components/News/NewsHeader'
import NewsReco from '../components/News/NewsReco'

const News = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", height: "100%" }}>
            <NewsHeader />
            <NewsReco />
        </SafeAreaView>
    )
}

export default News

const styles = StyleSheet.create({})