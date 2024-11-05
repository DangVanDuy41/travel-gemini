import { View, Text, TouchableOpacity, StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import CalendarPicker from "react-native-calendar-picker";
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cartBudgetData } from '@/data/budgetData';
import { useTripContext } from '@/utils/useTripContext';
import moment, { Moment } from 'moment';
import { router } from 'expo-router';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const Index = () => {
  const { tripData, setTripData } = useTripContext();
  const [openCard, setOpenCard] = useState<number | null>(null);
  const [activeBudget, setActiveBudget] = useState<number>(1);
  const [startDay, setStartDay] = useState<Moment | null>(null);
  const [endDay, setEndDay] = useState<Moment | null>(null);
  const handleBudget = (index: number, value: string) => {
    setActiveBudget(index);
    setTripData(prev => ({ ...prev, budget: value }))
  }
  const handleDays = (date: Date, type: string) => {
    if (type === "START_DATE") {
      setStartDay(moment(date))
    } else {
      setEndDay(moment(date))
    }
  }
  useEffect(() => {
    if (endDay && startDay) {
      const totalDays = endDay?.diff(startDay, 'days')
      setTripData(prev => ({ ...prev, totalDays: totalDays + 1 }))
    }

  }, [startDay, endDay])
  return (
    <SafeAreaView className='flex-1'>
      <View style={{ flex: 1 }}>
        <View style={styles.card}>
          {openCard !== 0 && (
            <AnimatedTouchableOpacity entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)} className={'flex-row justify-between items-center p-5'} onPress={() => setOpenCard(0)}>
              <Text className='font-medium'>Nơi đến</Text>
              <Text className='font-bold text-lg'>Bất kì đâu</Text>
            </AnimatedTouchableOpacity>
          )}
          {openCard === 0 && (
            <Animated.View className={'px-10'}>
              <Animated.Text entering={FadeIn} className='text-3xl font-bold py-5 pb-10'>Bạn muốn đi du lịch ở đâu ?</Animated.Text>
              <View className='pb-10 '>
                <View className='flex-row justify-between items-center py-3 border rounded-md '>
                  <Ionicons name='search' style={{ paddingHorizontal: 20 }} size={20} />
                  <TextInput
                    className='flex-1 pr-2'
                    placeholder='Nhập địa điểm'
                    value={tripData.location}
                    onChangeText={(text) => setTripData(prev => ({ ...prev, location: text }))}
                  />
                </View>

              </View>
            </Animated.View>
          )}
        </View>
        <View style={styles.card}>
          {openCard !== 1 && (
            <AnimatedTouchableOpacity entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)} className={'flex-row justify-between items-center p-5'} onPress={() => setOpenCard(1)}>
              <Text className='font-medium'>Số lượng người</Text>
              <Text className='font-bold text-lg'>Tùy chọn</Text>
            </AnimatedTouchableOpacity>
          )}
          {openCard === 1 && (
            <Animated.View className={'px-10'} >
              <Animated.Text entering={FadeIn} className='text-3xl font-bold  py-5  pb-10 '>Bao nhiêu người ?</Animated.Text>
              <View className='pb-10 '>
                <View className='flex-row justify-between items-center py-3 border rounded-md '>
                  <Ionicons name='search' style={{ paddingHorizontal: 20 }} size={20} />
                  <TextInput
                    className='flex-1 pr-2'
                    placeholder='Nhập số lượng người'
                    value={String(tripData.traveler)}
                    onChangeText={(text) => setTripData(prev => ({ ...prev, traveler: Number(text) }))}
                  />
                </View>
              </View>
            </Animated.View>
          )}
        </View>
        <View style={styles.card}>
          {openCard !== 2 && (
            <AnimatedTouchableOpacity entering={FadeIn.duration(200)} exiting={FadeOut} className={'flex-row justify-between items-center p-5'} onPress={() => setOpenCard(2)}>
              <Text className='font-medium'>Thời điểm</Text>
              <Text className='font-bold text-lg'>Linh hoạt</Text>
            </AnimatedTouchableOpacity>
          )}
          {openCard === 2 && (
            <Animated.View >
              <Animated.Text entering={FadeIn.delay(200)} className='text-3xl px-10 font-bold  py-5 pb-10 '>
                Bạn đi khi nào ?
              </Animated.Text>

              <CalendarPicker
                width={350}
                onDateChange={(date, type) => handleDays(date, type)}
                allowRangeSelection={true}
                minDate={new Date()}
                selectedRangeStyle={{
                  backgroundColor: 'black',
                }}
                selectedDayTextStyle={{
                  color: 'white'
                }}
              />
            </Animated.View>
          )}
        </View>
        <View style={styles.card}>
          {openCard !== 3 && (
            <AnimatedTouchableOpacity entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)} className={'flex-row justify-between items-center p-5'} onPress={() => setOpenCard(3)}>
              <Text className='font-medium'>Mức chi phí</Text>
              <Text className='font-bold text-lg'>Tùy chọn</Text>
            </AnimatedTouchableOpacity>
          )}
          {openCard === 3 && (
            <Animated.View  >
              <Animated.Text entering={FadeIn} className='text-3xl font-bold  py-5 px-10'>Mức chi phí ?</Animated.Text>
              <View className='px-3 pb-4'>
                {cartBudgetData.map((item, index) => (
                  <TouchableOpacity key={index} onPress={() => handleBudget(index, item.value)} className={`flex-row items-center p-3  ${activeBudget === index ? 'border' : ''}`} style={styles.card}>
                    <View className='flex-1'>
                      <Text className='text-base font-extrabold'>{item.value}</Text>
                      <Text>{item.title}</Text>
                    </View>
                    <Text className='text-4xl'>{item.icon}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>
          )}
        </View>
      </View>    
      <View className='p-3'>
        <TouchableOpacity className='bg-black p-3 mb-3 rounded-2xl' onPress={() => router.replace('/generateTripPlan')}>
          <Text className='text-white text-xl text-center font-bold'>Bắt đầu tạo lịch trình</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    margin: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    gap: 20
  }
})
export default Index