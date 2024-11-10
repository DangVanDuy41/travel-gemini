import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'

import { Href, router, Stack, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Transport from '@/components/Transportation'
import { initialTrip } from '@/data/tripInitial'
import HotelsComponent from '@/components/HotelsComponent'
import Plandays from '@/components/Plandays'
import { Trip } from '@/types/Trip'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/utils/FireBaseConfig'


const MyTrip = () => {

    const [userTrip, setUserTrip] = useState<Trip | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const WIDTH_IMAGE = Dimensions.get('window').width;
    const { id } = useLocalSearchParams<{ id: string }>();

    const getUserTrips = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "UserTrips"), where("id", "==", id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUserTrip({ ...doc.data() as Trip });
            });

        } catch (error) {
            console.error("Error fetching trips:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserTrips();
    }, [])

    const handleBack = () => {
        setUserTrip(initialTrip)
        router.back();
    }

    return (
        <>
            <Stack.Screen options={{
                headerTransparent: true,
                title: '',
                headerLeft: () => (
                    <TouchableOpacity className='p-2 rounded-full bg-white' onPress={handleBack}>
                        <Ionicons name='backspace-outline' size={30} />

                    </TouchableOpacity>
                ),
            }} />
            {loading || !userTrip ? (<View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="black" />
                <Text className='mt-3'>Đang tải lịch trình</Text>
            </View>
            ) : (
                <View className='flex-1 bg-white'>
                    <ScrollView>
                        <Image style={{ width: WIDTH_IMAGE, height: 350 }} source={require('@/assets/images/Travelling-the-world-photos.jpg')} />
                        <View className='p-3 mt-[-30] bg-[#ffffff] rounded-[30px]'>
                            <Text
                                className='text-2xl font-extrabold'
                                numberOfLines={2}
                                ellipsizeMode='head'
                            >
                                {userTrip?.travelPlan.location}
                            </Text>
                            <Text className='text-base text-[grey] py-1'>{userTrip?.travelPlan.duration}</Text>
                            <Text className='text-base text-[grey]'>🚌 {userTrip?.travelPlan.numberOfPeople} người</Text>
                            <Transport transportation={userTrip?.travelPlan.transportation} />
                            <HotelsComponent hotels={userTrip?.travelPlan.hotels} />
                            <Plandays dailyItinerary={userTrip?.travelPlan.dailyItinerary} />
                        </View>
                        <View className='p-3'>
                            <TouchableOpacity
                                className='w-full p-3 bg-black rounded-xl'
                                onPress={() => router.push(`/(details)/tripMap?userTrip=${encodeURIComponent(JSON.stringify(userTrip))}` as Href)}
                            >
                                <Text className='text-white  text-center text-xl'>Xem bản đồ</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView >
                </View >
            )}

        </>
    )
}

export default MyTrip