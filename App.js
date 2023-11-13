import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { MyTheme } from './utils/customTheme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './pages/Login';
import Signup from './pages/Signup';
import BottomNavigation from './pages/BottomNavigation';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'; import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { UserContextProvider } from './context/UserContext';
import { LogBox } from 'react-native';
export default function App() {

  const [fontsLoaded] = useFonts({
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'),

  });

  const Stack = createNativeStackNavigator();
  LogBox.ignoreAllLogs();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider >

        <BottomSheetModalProvider>
          <PaperProvider theme={MyTheme}>
            <UserContextProvider>

              <NavigationContainer>

                <Stack.Navigator initialRouteName='Login ' screenOptions={{
                  headerShown: false
                }}>
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Signup" component={Signup} />
                  <Stack.Screen name="BottomNavigation" component={BottomNavigation} />

                </Stack.Navigator>
              </NavigationContainer>

            </UserContextProvider>
          </PaperProvider >
        </BottomSheetModalProvider>
      </SafeAreaProvider >
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
});
