import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native'
import React from 'react'

import { useTripContext } from '@/utils/useTripContext'
import { router, Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Transport from '@/components/Transportation'
import { initialTrip } from '@/data/tripInitial'
import HotelsComponent from '@/components/HotelsComponent'
import Plandays from '@/components/Plandays'


const MyTrip = () => {
  const { tripResult, setTripResult } = useTripContext();
  const WIDTH_IMAGE = Dimensions.get('window').width;
  const handleBack = () => {
    setTripResult(initialTrip)
    router.replace('/');
  }
  console.log(tripResult)
  return (
    <>
      <Stack.Screen options={{
        headerTransparent: true,
        title: '',
        headerLeft: () => (
          <TouchableOpacity className='p-2 rounded-full bg-white' onPress={handleBack}>
            <Ionicons name='backspace-outline' size={30} />
          </TouchableOpacity>
        )
      }} />
      <View className='flex-1 bg-white'>
        <ScrollView>
          <Image style={{ width: WIDTH_IMAGE, height: 350 }} source={require('../assets/images/Travelling-the-world-photos.jpg')} />
          <View className='p-3 mt-[-30] bg-[#ffffff] rounded-[30px]'>
            <Text className='text-2xl font-extrabold  ' >{tripResult.travelPlan.location}</Text>
            <Text className='text-base text-[grey] py-1'>{tripResult.travelPlan.duration}</Text>
            <Text className='text-base text-[grey]'>🚌 {tripResult.travelPlan.numberOfPeople} người</Text>
            <Transport transportation={tripResult.travelPlan.transportation} />
            <HotelsComponent hotels={tripResult.travelPlan.hotels} />
            <Plandays dailyItinerary={tripResult.travelPlan.dailyItinerary} />
          </View>
          <View className='p-3'>
            <TouchableOpacity className='w-full p-3 bg-black rounded-xl' onPress={() => router.push('/tripMap')}>
              <Text className='text-white  text-center text-xl'>Xem bản đồ</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    </>
  )
}

export default MyTrip