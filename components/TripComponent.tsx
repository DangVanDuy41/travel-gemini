import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Trip } from '@/types/Trip';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

interface Props {
    trip: Trip;
}

const image = require('@/assets/images/Travelling-the-world-photos.jpg');

const TripComponent = ({ trip }: Props) => {

    const dateFormat = trip.created?.toDate().toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    return (
        <View className='p-4'>
            <View className="rounded-xl shadow-md p" >
                <Image
                    source={image}
                    className="w-full h-[200] rounded-2xl"
                    resizeMode="cover"
                />

                <View className="absolute top-0 left-0 w-full h-full bg-black opacity-40 rounded-2xl" />
                <View className="p-4 absolute bottom-0 ">
                    <View className='w-[230]'>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode='head'
                            className="text-2xl text-white font-bold mb-2"
                            
                        >
                            {trip.travelPlan.location}
                        </Text>
                        <Text className="text-base font-medium text-white mb-2">
                            {dateFormat}
                        </Text>
                        <Text className="text-base font-medium  mb-2 text-white">Chi phí: {trip.travelPlan.budget}</Text>
                        <Text className="text-base font-medium text-white">{trip.travelPlan.numberOfPeople} Người</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => router.push(`/(details)/${trip.id}`)} className='absolute top-20 right-4' >
                    <View className='p-5 bg-white rounded-full'>
                        <AntDesign name="arrowright" size={30} color="black" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>

    );
};

export default TripComponent;