import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "react-native-paper";
import Home from "./Home";
import Favorites from "./Favorites";
import Profile from "./Profile";
import News from "./News";

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
    const screenOptions = (route, color) => {
        let iconName;

        switch (route.name) {
            case "Home":
                iconName = "home-outline";
                break;
            case "Favorites":
                iconName = "star-outline";
                break;
            case "News":
                iconName = "newspaper-outline";
                break;
            case "Profile":
                iconName = "person-outline";
                break;
            default:
                break;
        }

        return <Ionicons name={iconName} color={color} size={22} />;
    };

    const theme = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => screenOptions(route, color),
                headerShown: false,
                tabBarIconStyle: {
                    color: "red",
                },
                tabBarInactiveTintColor: theme.colors.iconsColor,


            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="News" component={News} />
            <Tab.Screen name="Favorites" component={Favorites} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

