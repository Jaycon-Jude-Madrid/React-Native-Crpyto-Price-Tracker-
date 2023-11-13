import { StyleSheet, View, FlatList, Animated } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import {
    useTheme,
    TextInput,
    Text,
    IconButton,
    Tooltip,
    ActivityIndicator,
} from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import BreaknewsList from "./BreaknewsList";
import useFetch from "../../Hooks/useFetch";


const today = new Date();

const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const dateYesterday = yesterday.toISOString().slice(0, 10);
const dateToday = today.toISOString().slice(0, 10);

const NewsHeader = () => {
    const [toggleSearch, setSearchToggle] = useState(false);

    const { data, isLoading, error } = useFetch(
        `https://newsapi.org/v2/everything?q=Cryptocurrency&from=${dateYesterday}&to=${dateToday}&sortBy=popularity&apiKey=c8c09c09bbf94a00bb56767423be2eaa`
    );
    const theme = useTheme();

    const handleToggle = () => {
        setSearchToggle(!toggleSearch);
    };



    return (
        <View>
            <View style={styles.newsHeaderContainer}>
                {toggleSearch && (
                    <TextInput
                        label="Search news..."
                        style={styles.textInputStyle}
                        underlineColor={"transparent"}
                        activeUnderlineColor={theme.colors.iconsColor}
                    />
                )}

                <TouchableOpacity
                    style={[styles.iconSearchStyle, { backgroundColor: "#f6f5f8" }]}
                    onPress={handleToggle}
                >
                    {toggleSearch ? (
                        <Ionicons name="close-outline" size={22} color={"black"} />
                    ) : (
                        <Ionicons name="ios-search-outline" size={22} color={"black"} />
                    )}
                </TouchableOpacity>
            </View>

            <View style={styles.breakingnewsContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>


                    <Text variant="headlineSmall" style={styles.breakingnewsStyle}>
                        Breaking news{" "}
                    </Text>
                    <Tooltip title="Click the image to see full details" style={{ marginTop: 8 }} enterTouchDelay={0}>
                        <EvilIcons name="question" size={20} color={"black"} onPress={() => { }} />
                    </Tooltip>
                </View>
            </View>

            {isLoading ? (
                <View style={styles.isLoadingContainer}>
                    <ActivityIndicator
                        animating={true}
                        color={theme.colors.primary}
                        size={60}
                    />
                    <Text variant="labelMedium">Fetching news...</Text>
                </View>
            ) : (
                <View>
                    <FlatList
                        data={data?.articles.slice(0, 50)}
                        renderItem={({ item }) => <BreaknewsList item={item} />}
                        keyExtractor={(item, index) => index}
                        horizontal
                        showsHorizontalScrollIndicator={false}


                    />
                </View>
            )}
        </View>
    );
};

export default NewsHeader;

const styles = StyleSheet.create({
    newsHeaderContainer: {
        paddingTop: 30,
        paddingRight: 30,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    iconSearchStyle: {
        borderRadius: 50,
        padding: 5,
    },
    textInputStyle: {
        width: 130,
        fontSize: 13,
        backgroundColor: "transparent",
    },
    breakingnewsStyle: {
        fontFamily: "Roboto-Medium",
    },
    breakingnewsContainer: {
        paddingHorizontal: 15,
    },
    isLoadingContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
});
