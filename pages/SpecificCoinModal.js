import { StyleSheet, View, Image, Dimensions, Linking } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory-native';
import { useTheme, Text } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ToastAndroid } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import useFetch from '../Hooks/useFetch';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

const { width: SIZE } = Dimensions.get('window');

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
        priority: Notifications.AndroidNotificationPriority.HIGH,
    }),
});
const SpecificCoinModal = ({ currentPrice, logoUrl, name, symbol, priceChangePercentage7d, sparkline, id, marketCap, cirSupply, totalSupply, marketCapRank }) => {

    const { data, isLoading } = useFetch(`https://api.coingecko.com/api/v3/coins/${id}`)
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const [bookmark, setbookmark] = useState(false)

    const notificationListener = useRef();
    const responseListener = useRef();

    const firstSentence = data?.description?.en.split('.')[0]

    const handleLinkPress = () => {
        Linking.openURL(data?.links?.homepage[0]);
    };



    const theme = useTheme();

    const priceChangeColor = priceChangePercentage7d > 0 ? '#03a66d' : '#d34058';

    async function schedulePushNotification() {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: `Added this ${name.toLowerCase()} coin to your favorites list.`,
                body: 'Here is the notification body',
                data: { data: 'goes here' },
                sound: 'default',
                android: {
                    channelId: 'default',
                    vibrate: [0, 250, 250, 250], // Vibration pattern
                },
            },
            trigger: { seconds: 1 },
        });



    }

    const handleBookMark = async () => {
        setbookmark(!bookmark)

        if (bookmark === false) {
            await schedulePushNotification();

        } else {

            ToastAndroid.showWithGravity(
                `Remove ${name.toLowerCase()} coin from your favorites list`,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );

        }



    }

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response)
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);
    return (
        <ScrollView style={styles.chartWrapper} showsVerticalScrollIndicator={false}
        >


            <View style={styles.titlesWrapper}>
                <View style={styles.upperTitles}>
                    <View style={styles.upperLeftTitle}>
                        <Image source={{ uri: logoUrl }} style={styles.image} />
                        <Text style={styles.subtitle}>{name} ({symbol.toUpperCase()})</Text>
                    </View>
                    <Text style={[styles.subtitle, { color: "#a6afbb" }]}>7d</Text>
                </View>
                <View style={styles.lowerTitles}>

                    <Text style={[styles.title, { color: priceChangeColor }]}>{priceChangePercentage7d.toFixed(2)}%</Text>
                    <Ionicons name="bookmark-sharp" size={25} color={bookmark ? '#0165ff' : '#a6afbb'} onPress={() => handleBookMark()} />

                </View>
                <View style={styles.lowerTitles}>

                    <Text style={[styles.supplyStyle]}>Market cap: {marketCap?.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    })}</Text>
                    <Text style={[styles.supplyStyle]}>Market cap rank: #{marketCapRank}</Text>


                </View>
                <View style={styles.lowerTitles}>

                    <Text style={[styles.supplyStyle]}>Totaly Supply: {totalSupply?.toLocaleString()}</Text>
                    <Text style={[styles.supplyStyle]}>Circulating Supply: {cirSupply?.toLocaleString()}</Text>


                </View>
            </View>


            <View style={styles.chartLineWrapper}>


                <VictoryLine

                    data={sparkline}
                    style={{
                        data: { stroke: priceChangeColor, strokeWidth: 1 },
                    }}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    width={SIZE}

                />

            </View>


            <View style={styles.descriptionContainer}>
                <Text variant="titleSmall" style={styles.titleName}>Description</Text>
                <Text variant="labelSmall" style={styles.descriptionContentStyle}>{firstSentence}.</Text>

                <TouchableOpacity style={styles.homepageContainer} onPress={() => handleLinkPress()}>

                    <Text variant="labelSmall">Visit homepage</Text>

                    <SimpleLineIcons name="direction" size={18} color={'#0165ff'} />
                </TouchableOpacity>

            </View>

        </ScrollView>

    )
}

export default SpecificCoinModal

const styles = StyleSheet.create({
    chartWrapper: {
        marginVertical: 10,
        padding: 0,

    },
    titlesWrapper: {
        marginHorizontal: 16
    },
    upperTitles: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    upperLeftTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 24,
        height: 24,
        marginRight: 4,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: 'Roboto-Black',

    },
    lowerTitles: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5

    },
    boldTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 14,
    },

    supplyStyle: {
        fontSize: 11,
        fontFamily: 'Roboto-Medium'
    },
    chartLineWrapper: {
        marginTop: -10
    },
    descriptionContainer: {
        marginHorizontal: 10,
        marginTop: -30,
        flexDirection: 'column',
        gap: 10
    }, titleName: {
        fontFamily: "Roboto-Medium",
    },
    descriptionContentStyle: {
        color: '#708090'
    },
    homepageContainer: {
        flexDirection: 'row',
        gap: 5,
        marginTop: 6
    }
});

async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}