
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AI_PROMPT, chatSession } from '@/utils/AIModal'
import { useTripContext } from '@/utils/useTripContext'
import LottieView from 'lottie-react-native'
import { Href, router, Stack } from 'expo-router'
import { Text } from 'react-native'
import { useAuth } from '@clerk/clerk-expo'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/utils/FireBaseConfig'
const GenerateTrip = () => {

  const { setTripResult, tripData } = useTripContext();
  const { userId } = useAuth();

  const GenerateAiTrip = async () => {
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', tripData.location)
      .replace('{totalDays}', tripData.totalDays + '')
      .replace('{totalNights}', tripData.totalDays - 1 + '')
      .replace('{traveler}', tripData.traveler + '')
      .replace('{budget}', tripData.budget)
      .replace('{totalDay}', tripData.totalDays + '')
      .replace('{totalNight}', tripData.totalDays - 1 + '')
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    const data = await JSON.parse(result.response.text());

    if (data) {
      setTripResult({ ...data })
      const docId = Date.now().toString();
      await setDoc(doc(db, "UserTrips", docId), {
        id: docId,
        userId,
        created:new Date(),
        ...data
      })

      router.replace(("/(details)/" + docId) as Href);
    }else{
      router.replace("/");
    }

  }
  useEffect(() => {
    GenerateAiTrip()
  }, [])

  return (
    <SafeAreaView className='flex-1 items-center justify-center'>
      <Stack.Screen options={{ headerShown: false }} />
      <LottieView style={{ width: 500, height: 500 }} source={require('../assets/animatedFiles.json')} autoPlay loop />
      <Text className='text-3xl font-extrabold'>Đang tạo lịch trình...</Text>
    </SafeAreaView>
  )
}

export default GenerateTrip