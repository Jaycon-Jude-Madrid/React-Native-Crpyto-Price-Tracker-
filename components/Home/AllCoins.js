import { FlatList, StyleSheet, View } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import { Text, TextInput } from "react-native-paper";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useTheme, ActivityIndicator } from "react-native-paper";
import AllCoinsList from "./AllCoinsList";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import SpecificCoinModal from "../../pages/SpecificCoinModal";
import useFetch from "../../Hooks/useFetch";
import { RefreshControl } from "react-native-gesture-handler";




const AllCoins = () => {

    const theme = useTheme();
    const { data, isLoading, error } = useFetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d')
    const [selectedCoinData, setSelectedCoinData] = useState(null);
    const [searchField, setSearchField] = useState("");
    const bottomSheetModalRef = useRef(null);

    const handleRefresh = () => {
        return true
    };


    const filteredCoins = data.filter(
        item => {
            return (
                item
                    .name
                    .toLowerCase()
                    .includes(searchField.toLowerCase()) ||
                item
                    .id
                    .toLowerCase()
                    .includes(searchField.toLowerCase())
            );
        }
    );

    const handleChange = (text) => {
        setSearchField(text);
    };

    // variables
    const snapPoints = useMemo(() => ['50%', '50%'], []);
    const openModal = (item) => {
        setSelectedCoinData(item)
        bottomSheetModalRef.current?.present()
    }
    return (
        <View style={styles.parentContainer}>
            <View style={styles.MaintitleContainer}>
                <View style={styles.titleContainer}>

                    <Text
                        variant="labelSmall"
                        style={[styles.titleStyle, { color: theme.colors.iconsColor }]}
                    >
                        All coins
                    </Text>
                    <FontAwesome5 name="coins" size={16} color={theme.colors.primary} />
                </View>
                <View>
                    <TextInput
                        label="Search coin..."
                        style={styles.textInputStyle}
                        right={<TextInput.Icon icon="magnify" size={20} />}
                        underlineColor={'transparent'}
                        activeUnderlineColor={theme.colors.iconsColor}
                        onChangeText={handleChange}
                        value={searchField}

                    />
                </View>
            </View>

            <View>
                {
                    isLoading ?
                        <View style={styles.isLoadingContainer}>

                            <ActivityIndicator animating={true} color={theme.colors.primary} size={60} />
                            <Text variant="labelMedium">Fetching data...</Text>
                        </View>
                        :

                        <View>
                            <FlatList
                                initialNumToRender={5}
                                refreshing={true}
                                data={filteredCoins}
                                renderItem={({ item }) => (
                                    <AllCoinsList item={item} openModal={openModal}
                                    />
                                )}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingBottom: 300 }}

                                refreshControl={
                                    <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
                                }

                            />
                        </View>

                }

            </View>

            <BottomSheetModal

                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
                style={styles.bottomSheet}
                enablePanDownToClose={true}

            >
                {selectedCoinData && <SpecificCoinModal currentPrice={selectedCoinData.current_price}
                    logoUrl={selectedCoinData.image}
                    name={selectedCoinData.name}
                    symbol={selectedCoinData.symbol}
                    priceChangePercentage7d={selectedCoinData.price_change_percentage_7d_in_currency}
                    sparkline={selectedCoinData?.sparkline_in_7d.price}
                    id={selectedCoinData?.id}
                    marketCap={selectedCoinData?.market_cap}
                    cirSupply={selectedCoinData?.circulating_supply}
                    totalSupply={selectedCoinData?.total_supply}
                    marketCapRank={selectedCoinData?.market_cap_rank}


                />}


            </BottomSheetModal>
        </View>
    );
};

export default AllCoins;

const styles = StyleSheet.create({
    parentContainer: {
        marginTop: 30,
    }, MaintitleContainer: {
        justifyContent: "space-between",
        flexDirection: "row",

    },
    textInputStyle: {
        width: 180, fontSize: 12,
        backgroundColor: 'transparent',

    },
    titleContainer: {
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    titleStyle: {
        fontSize: 12,
        fontFamily: "Roboto-Bold",
    }, bottomSheet: {

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }, isLoadingContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        height: 300,
    }
});
