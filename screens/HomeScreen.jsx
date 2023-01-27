import { Image, SafeAreaView, View } from 'react-native'
import React from 'react'
import NavOptions from '../components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_KEY} from "@env"
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice'
import NavFavourites from '../components/NavFavourites';

export default function HomeScreen() {

  const dispatch = useDispatch()

  return (
    <SafeAreaView className=" bg-white h-full">

      <View className="p-5">
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain"
          }}
          source={{
            uri: "https://links.papareact.com/gzs"
          }} 
        />
        <GooglePlacesAutocomplete 
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          placeholder="Where From?"
          styles={{
            container: {
              flex: 0,
            },
            textInput: 18,
          }}
          query={{
            key: GOOGLE_MAPS_KEY,
            language: 'en',
            type: ('airport')
          }}
          minLength={2}
          enablePoweredByContainer={false}
          onPress={(data, details = null) => {
            dispatch(setOrigin({
              location: details?.geometry.location,
              description: data.description,
            }))
            dispatch(setDestination(null))
          }}
          fetchDetails={true}
        />
      <NavOptions />
      <NavFavourites />
      </View>
    </SafeAreaView>
  )
}