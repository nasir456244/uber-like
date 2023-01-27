import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'

export default function NavFavourites() {

    const data = [
        {
          id: "123",
          icon: "home",
          location: "Home",
          destination: "Sunnybank hills"
        },
        {
          id: "456",
          icon: "briefcase",
          location: "Work",
          destination: "Sunshine coast"
        }
      ]
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
            <View className="bg-gray-200" style={{height: 0.5}} />
        )}
        renderItem={({item}) => (
            <TouchableOpacity className="flex-row items-center p-5">
                <Icon
                    className="mr-4 rounded-full bg-gray-300 p-3"
                    name={item.icon}
                    type="ionicon"
                    color="white"
                    size={17}
                />
                <View>
                    <Text className="font-semibold text-xl">{item.location}</Text>
                    <Text className="text-gray-500">{item.destination}</Text>
                </View>
            </TouchableOpacity>
        ) }
      >

      </FlatList>
    </View>
  )
}