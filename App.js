import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import { Provider } from 'react-redux'
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MapScreen from './screens/MapScreen';
import { KeyboardAvoidingView, Platform } from 'react-native';
import EatsScreen from './screens/EatsScreen';



const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={{flex: 1}}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          >
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
              <Stack.Screen name="MapScreen" component={MapScreen} />
              <Stack.Screen name="EatsScreen" component={EatsScreen} />

            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}


