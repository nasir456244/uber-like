import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_KEY } from "@env"
import { useDispatch } from 'react-redux'
import { setDestination } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native'
import NavFavourites from './NavFavourites'
import { Icon } from 'react-native-elements'

export default function NavigateCard() {
    const dispatch = useDispatch()
    const navigation = useNavigation()
  return (
    <SafeAreaView className="bg-white flex-1">
      <Text className="text-center py-5 text-xl">Good Morning, NSR</Text>
      <View className="border-t border-gray-200 flex-shrink">
        <View>
        <GooglePlacesAutocomplete 
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          placeholder="Where To?"
          styles={{
            container: {
              flex: 0,
              backgroundColor: "white",
              paddingTop: 20
            },
            textInput: 18,
          }}
          query={{
            key: GOOGLE_MAPS_KEY,
            language: 'en'
          }}
          minLength={2}
          enablePoweredByContainer={false}
          onPress={(data, details = null) => {
            dispatch(setDestination({
              location: details?.geometry.location,
              description: data.description,
            }))
            navigation.navigate('RideOptionsCard')
          }}
          fetchDetails={true}
        />

        </View>
        <NavFavourites />
      </View>
      <View className="flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100">
        <TouchableOpacity 
          onPress={() => navigation.navigate("RideOptionsCard")}
          className="flex flex-row justify-around items-center bg-black w-24 px-1 py-3 rounded-full">
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text className="text-white text-center">Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex flex-row items-center justify-between w-24 px-4 py-3 rounded-full">
          <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
          <Text className="text-center">Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}