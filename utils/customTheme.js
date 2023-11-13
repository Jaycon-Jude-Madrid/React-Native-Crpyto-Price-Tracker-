

import { DefaultTheme, DarkTheme, configureFonts } from 'react-native-paper';


export const fontConfig = {
    fontFamily: Platform.select({

        default: 'Roboto',
    }),
    android: {
        regular: {
            fontFamily: 'Robot-Regular',
            fontWeight: 'normal',
        },
        medium: {
            fontFamily: 'Robot-Medium',
            fontWeight: '500',
        },
        bold: {
            fontFamily: 'Roboto-Bold',
            fontWeight: '700',
        },
        thin: {
            fontFamily: 'Roboto-Thin',
            fontWeight: '100',
        },
        light: {
            fontFamily: 'Roboto-Light',
            fontWeight: '300',
        },
        black: {
            fontFamily: 'Roboto-Black',
            fontWeight: '900',
        }
    }
}

export const MyTheme = {
    ...DefaultTheme,
    // Customize specific properties
    colors: {
        ...DefaultTheme.colors,
        primary: '#0165ff',
        secondary: '#182b4c',
        accent: "#181e25",
        gains: "#03a66d",
        lose: "#d34058",
        iconsColor: "#a6afbb"
    },




    // Add additional properties as needed
    spacing: {
        small: 8,
        medium: 16,
        large: 24,
    },
};
