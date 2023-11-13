import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { Text, useTheme } from 'react-native-paper';
import Ionicons from "react-native-vector-icons/Ionicons";
import { db } from '../../utils/firebase-config';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { LogBox } from 'react-native';


const HomeHeader = () => {
    const theme = useTheme();

    const { userId } = useAuthContext()

    const [data, setData] = useState([])


    LogBox.ignoreAllLogs();
    console.log(userId)
    useEffect(() => {
        const getData = async () => {

            const docRef = doc(db, "Users", userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());

                setData(docSnap.data());
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        getData();
    }, [userId])
    return (
        <View style={styles.HeaderNameContainer}>
            <View>
                <Text variant="labelLarge" style={styles.nameStyle}>{data?.fullname}</Text>
                <Text variant="labelSmall" style={[styles.subNameStyle, { color: theme.colors.iconsColor }]}>{data?.email}</Text>
            </View>
            <View>
                <TouchableOpacity>
                    <Ionicons name="notifications" size={25} color={theme.colors.iconsColor} style={{ marginTop: true ? 10 : 0 }} >
                    </Ionicons>
                    {true && <Text variant="labelSmall" style={styles.NotificationStyle}>1</Text>}

                </TouchableOpacity>

            </View>

        </View >
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    nameStyle: {
        fontFamily: 'Roboto-Medium', fontSize: 15,
    },
    subNameStyle: {
        fontSize: 12.

    },
    HeaderNameContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    }
    ,
    NotificationStyle: {
        position: 'relative',
        left: 12,
        bottom: 28,
        backgroundColor: 'red',
        borderRadius: 50,
        height: 15,
        width: 15,
        textAlign: 'center',
        color: 'white',
        fontSize: 12
    }
})