import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, Button } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useState } from "react";

import { useTheme } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import useFirebaseAuth from "../Hooks/useFirebaseAuth";
import { auth } from "../utils/firebase-config";

const Signup = ({ navigation }) => {
    const theme = useTheme();
    const { CreateUserWithEmailAndPassword, error } = useFirebaseAuth();
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            Fullname: "",
            Email: "",
            Password: "",


        },
    });

    const onSubmit = (data) => {

        CreateUserWithEmailAndPassword(data.Fullname, data.Email, data.Password, navigation);
        console.log(data.Password)

    };




    const [togglePassword, setTogglePassword] = useState(true);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", height: "100%" }}>
            <View style={styles.LoginImageContainer}>
                <Image
                    source={require("../assets/Images/SignupImage.jpg")}
                    style={styles.LoginImageStyle}
                />
            </View>
            <View>
                <Text
                    variant="displayMedium"
                    style={[styles.headline, { color: theme.colors.primary }]}
                >
                    Signup
                </Text>
            </View>
            <View style={styles.formInputContainer}>
                <View style={styles.SectionStyle}>
                    <Ionicons
                        name="person-outline"
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
                                placeholder="Fullname"
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
                        name="Fullname"
                    />
                </View>
                {errors.Fullname && (
                    <Text style={styles.requiredErrorLabel} variant="labelSmall">
                        {" "}
                        Required.
                    </Text>
                )}


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
                        Required
                    </Text>
                )}

                <View style={[styles.SectionStyle, {}]}>
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
                                autoCapitalize="none"
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
                        {" "}
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
                            { color: theme.colors.iconsColor },
                        ]}
                    >
                        By signing up, you're agree to our{" "}
                        <Text
                            variant="labelMedium"
                            style={[
                                ,
                                { color: theme.colors.primary, fontFamily: "Roboto-Medium" },
                            ]}
                        >
                            Terms and Conditions
                        </Text>{" "}
                        and{" "}
                        <Text
                            variant="labelMedium"
                            style={[
                                ,
                                { color: theme.colors.primary, fontFamily: "Roboto-Medium" },
                            ]}
                        >
                            Privacy Policy
                        </Text>
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Button
                        mode="contained"
                        style={styles.btnStyle}
                        labelStyle={{ fontSize: 16, fontFamily: 'Roboto-Bold' }}
                        onPress={handleSubmit(onSubmit)}
                    >
                        Signup
                    </Button>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text
                        variant="labelMedium"
                        style={[
                            styles.registerNowStyle,
                            { color: theme.colors.iconsColor },
                        ]}
                    >
                        Already have an account?{" "}
                        <Text
                            variant="labelMedium"
                            style={[
                                ,
                                { color: theme.colors.primary, fontFamily: "Roboto-Medium" },
                            ]}
                        >
                            Login Now!
                        </Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Signup;

const styles = StyleSheet.create({
    requiredErrorLabel: { color: "red", textAlign: "center", },
    SectionStyle: {
        flexDirection: "row",

        alignItems: "center",
    },
    forgotPasswordStyle: {
        fontFamily: "Roboto-Medium",
        textAlign: "center",
        padding: 20,
    },
    btnStyle: {
        borderRadius: 15,
        padding: 5, marginTop: 15
    },
    registerNowStyle: { textAlign: "center", marginTop: 20 },
    formInputContainer: {
        paddingLeft: 20,
        paddingRight: 20,


        borderRadius: 10,
    },
    textInputStyle: {
        backgroundColor: "transparent",
        width: 275,
        fontSize: 14,
        fontFamily: "Roboto-Bold",
    },
    headline: {
        fontSize: 35,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 5,
        fontFamily: "Roboto-Medium",
    },
    scrollView: {},
    LoginImageContainer: {
        height: 260,
    },
    LoginImageStyle: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        alignSelf: "center",

    },
});
