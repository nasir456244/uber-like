import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import Map from '../components/Map'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';


export default function MapScreen() {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation()
  return (
    <View>
      <TouchableOpacity 
        onPress={() => navigation.navigate('HomeScreen')}
        
        className="absolute top-16 left-8 bg-gray-100 z-50 p-3 rounded-full shadow-lg">
        <Icon name="menu" />
      </TouchableOpacity>
      <View className="h-1/2">
        <Map />

      </View>
      <View className="h-1/2">
        <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="NavigateCard" component={NavigateCard} />
        <Stack.Screen name="RideOptionsCard" component={RideOptionsCard} />

        </Stack.Navigator>

      </View>
    </View>
  )
}