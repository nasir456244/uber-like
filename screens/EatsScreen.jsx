import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function EatsScreen() {
    const navigation = useNavigation()
  return (
    <SafeAreaView>
      <Text>Eats</Text>

      <View className="mt-auto border-t border-gray-200">
        <TouchableOpacity 
            onPress={() => navigation.navigate('HomeScreen')}
          className="bg-black py-3 m-3">
          <Text className="text-center text-white text-xl">
            Go back
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}