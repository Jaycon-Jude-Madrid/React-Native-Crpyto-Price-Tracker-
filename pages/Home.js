import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeHeader from '../components/Home/HomeHeader'
import RecoToBuy from '../components/Home/RecoToBuy'
import AllCoins from '../components/Home/AllCoins'
import { useAuthContext } from '../Hooks/useAuthContext'


const Home = () => {


    const { userId } = useAuthContext();


    console.log(userId)

    console.log(userId)




    return (


        <SafeAreaView style={{ flex: 1, backgroundColor: "white", height: "100%", paddingLeft: 20, paddingRight: 20 }}>
            <HomeHeader />
            <RecoToBuy />
            <AllCoins />

        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },

})