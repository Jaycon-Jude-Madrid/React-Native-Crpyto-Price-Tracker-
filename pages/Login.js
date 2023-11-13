import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";

import Ionicons from "react-native-vector-icons/Ionicons";

import { useTheme } from "react-native-paper";
import { useState } from "react";
import { auth } from "../utils/firebase-config";
import useFirebaseAuth from "../Hooks/useFirebaseAuth";

const Login = ({ navigation }) => {
    const theme = useTheme();

    const { SignInWithEmailAndPassword, error } = useFirebaseAuth()
    const {
        control,
        handleSubmit,
        formState: { errors }, reset
    } = useForm({
        defaultValues: {
            Email: "",
            Password: "",
        },
    });

    const onSubmit = (data) => {
        console.log(data)
        SignInWithEmailAndPassword(data.Email, data.Password, navigation, reset);


    };
    const [togglePassword, setTogglePassword] = useState(true);



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", height: "100%" }}>
            <View style={styles.LoginImageContainer}>
                <Image
                    source={require("../assets/Images/LoginImage.jpg")}
                    style={styles.LoginImageStyle}
                />
            </View>
            <View>
                <Text
                    variant="displayMedium"
                    style={[styles.headline, { color: theme.colors.primary }]}
                >
                    Login
                </Text>
            </View>
            <View style={styles.formInputContainer}>
                <View style={styles.SectionStyle}>
                    <Ionicons name="at-sharp" size={20} color={theme.colors.iconsColor} />
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Email"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                mode="flat"
                                style={styles.textInputStyle}
                                activeUnderlineColor={theme.colors.iconsColor}
                                underlineColor={theme.colors.iconsColor}
                                placeholderTextColor={theme.colors.iconsColor}
                                secureTextEntry={togglePassword}
                                autoCapitalize="none"
                                keyboardType="email-address"


                            />
                        )}
                        name="Email"
                    />
                </View>

                {errors.Email && (
                    <Text style={styles.requiredErrorLabel} variant="labelSmall">
                        {" "}
                        Required.
                    </Text>
                )}

                <View style={[styles.SectionStyle, { marginTop: 5 }]}>
                    <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color={theme.colors.iconsColor}
                    />
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                placeholder="Password"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                mode="flat"
                                style={styles.textInputStyle}
                                activeUnderlineColor={theme.colors.iconsColor}
                                underlineColor={theme.colors.iconsColor}
                                placeholderTextColor={theme.colors.iconsColor}
                                secureTextEntry={togglePassword}
                                type

                            />
                        )}
                        name="Password"
                    />

                    <TouchableOpacity onPress={() => setTogglePassword(!togglePassword)}>
                        <Ionicons
                            name={togglePassword ? `eye-outline` : "md-eye-off-outline"}
                            size={20}
                            color={theme.colors.iconsColor}
                        />
                    </TouchableOpacity>
                </View>
                {errors.Password && (
                    <Text style={styles.requiredErrorLabel} variant="labelSmall">
                        Required.
                    </Text>
                )}
                {error && (
                    <Text style={styles.requiredErrorLabel} variant="labelSmall">

                        {error}
                    </Text>
                )}
                <TouchableOpacity>
                    <Text
                        variant="labelMedium"
                        style={[
                            styles.forgotPasswordStyle,
                            { color: theme.colors.primary },
                        ]}
                    >
                        Forgot Password?
                    </Text>
                </TouchableOpacity>


                <TouchableOpacity>
                    <Button
                        mode="contained"
                        style={styles.btnStyle}
                        labelStyle={{ fontSize: 16, fontFamily: "Roboto-Bold" }}
                        onPress={handleSubmit(onSubmit)}
                    >
                        Login
                    </Button>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                    <Text
                        variant="labelMedium"
                        style={[
                            styles.registerNowStyle,
                            { color: theme.colors.iconsColor },
                        ]}
                    >
                        New to Crypto?{" "}
                        <Text
                            variant="labelMedium"
                            style={[
                                ,
                                { color: theme.colors.primary, fontFamily: "Roboto-Medium" },
                            ]}
                        >
                            Register Now!
                        </Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    requiredErrorLabel: { color: "red", textAlign: "center", marginTop: 5 },
    SectionStyle: {
        flexDirection: "row",

        alignItems: "center",
    },
    forgotPasswordStyle: {
        fontFamily: "Roboto-Medium",
        textAlign: "right",
        padding: 20,
    },
    btnStyle: {
        borderRadius: 15,
        padding: 5,
        marginBottom: 10,
    },
    registerNowStyle: { textAlign: "center", marginTop: 20 },
    formInputContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
    },
    textInputStyle: {
        backgroundColor: "transparent",
        width: 275,
        fontSize: 14,
    },
    headline: {
        fontSize: 35,
        padding: 20,
        fontFamily: "Roboto-Medium",
    },
    scrollView: {},
    LoginImageContainer: {
        height: 320,
    },
    LoginImageStyle: {
        width: 400,
        height: "100%",
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 20,
    },
});
