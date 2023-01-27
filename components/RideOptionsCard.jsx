import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'

export default function RideOptionsCard() {
  const travelTimeInformation = useSelector(selectTravelTimeInformation)

  const data = [
    {
      id: "Uber-X-123",
      title: "UberX",
      multiplier: 1,
      image: "https://links.papareact.com/3pn"
    },
    {
      id: "Uber-XL-456",
      title: "Uber XL",
      multiplier: 1.2,
      image: "https://links.papareact.com/5w8"
    },
    {
      id: "Uber-LUX-789",
      title: "Uber LUX",
      multiplier: 1.75,
      image: "https://links.papareact.com/7pf"
    },
  ]
  const navigation = useNavigation()

  const [selected, setSelected] = useState(null)

  const SURGE_CHARGE_RATE = 1.5

  return (
    <SafeAreaView className="bg-white flex-grow">
      <View>
        <TouchableOpacity 
          onPress={() => navigation.navigate('NavigateCard')} 
          className="absolute top-3 left-5 p-3 rounded-ful">
          <Icon  name="chevron-left" type="fontawesome"/>
        </TouchableOpacity>
        <Text className="text-center py-5 text-xl">Select a ride - {
          travelTimeInformation?.distance?.text || 1324.5 + " " + 'km'
        } </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => setSelected(item)} 
            className={` ${item?.id === selected?.id && "bg-gray-200"} flex-row items-center justify-between px-10`}>
            <Image 
              style={{
                height: 100,
                width: 100,
                resizeMode: "contain"
              }}
              source={{
                uri: item.image
              }}
            />
            <View className="-ml-6">
              <Text className="text-xl font-semibold">{item.title}</Text>
              <Text>{travelTimeInformation?.duration?.text || "2 days 4 hours"} Travel Time</Text>

            </View>
            <Text className="text-xl">
              {new Intl.NumberFormat('en-au', {
                style: 'currency',
                currency: 'AUD'
              }).format(
                travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE
                  * item?.multiplier / 100
               ||  400548 * SURGE_CHARGE_RATE
                * item?.multiplier / 100
            )}
            </Text>
          </TouchableOpacity>
        )} 
      />
      <View className="mt-auto border-t border-gray-200">
        <TouchableOpacity disabled={!selected} 
          className={`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}>
          <Text className="text-center text-white text-xl">
            Choose { selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}