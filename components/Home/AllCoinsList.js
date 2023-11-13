import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import React, { memo } from "react";
import { Text, useTheme } from "react-native-paper";
import { VictoryChart, VictoryLine } from "victory-native";

const AllCoinsList = ({ item, openModal }) => {
    const theme = useTheme();

    let formatting_options = {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    };
    let dollarString = new Intl.NumberFormat("en-US", formatting_options);
    let finalString = dollarString.format(item.current_price);
    const priceColor =
        item.price_change_percentage_7d_in_currency > 0
            ? theme.colors.gains
            : theme.colors.lose;
    const oneDayData = item.sparkline_in_7d.price.slice(-24);
    return (
        <TouchableOpacity onPress={() => openModal(item)}>
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <View style={styles.logoContentContainer}>
                        <View>
                            <Image source={{ uri: item.image }} style={styles.image} />
                        </View>
                        <View>
                            <Text variant="titleSmall" style={styles.titleName}>
                                {item.name}
                            </Text>
                            <Text
                                variant="labelSmall"
                                style={[{ color: theme.colors.iconsColor }]}
                            >
                                {item.symbol.toUpperCase()}
                            </Text>
                        </View>
                    </View>




                    <View >

                        <VictoryLine
                            dependentAxis
                            data={oneDayData}
                            style={{
                                data: { stroke: priceColor, strokeWidth: 1.3 },
                            }}
                            width={160}
                            height={120}
                        />

                    </View>
                    <View style={styles.oneDayContainer}>
                        <Text variant="labelSmall" style={[styles.oneDayStyle, { color: theme.colors.iconsColor }]}>1d</Text>
                    </View>

                    <View>
                        <Text variant="titleSmall" style={styles.currentPriceStyle}>
                            {finalString}
                        </Text>
                        <Text variant="labelSmall">
                            $761{" "}
                            <Text style={[, { color: priceColor }]}>
                                {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                            </Text>
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default memo(AllCoinsList);

const styles = StyleSheet.create({
    container: {
        height: 100,
        marginRight: 10,
        backgroundColor: "white",
        justifyContent: "space-between",
        marginLeft: 10,
    },
    titleName: {
        fontFamily: "Roboto-Medium",
    },
    contentContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: "100%",
    },
    logoContentContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    image: {
        height: 30,
        width: 30,
    },
    currentPriceStyle: {
        fontFamily: "Roboto-Medium",
    },
    oneDayContainer: {
        position: "absolute",
        right: 80
    }, oneDayStyle: {
        fontFamily: "Roboto-Medium",

    }
});
