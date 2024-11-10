import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { Hotel } from '@/types/Trip'
interface Props {
    hotels: Hotel[]
}
const HotelsComponent = ({ hotels }: Props) => {
    return (
        <View>
            <Text className='font-bold text-xl py-3'>🏨 Gợi ý khách sạn:</Text>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                {hotels.map(((hotel, index) => (
                    <View key={index} className='w-[200] mr-6'>
                        <Image className='rounded-2xl' style={{ width: 200, height: 200 }} source={require('../assets/images/OIP.jpg')} />
                        <View className='p-2'>
                            <Text numberOfLines={1} className='font-bold text-lg'>{hotel.hotelName}</Text>
                            <Text numberOfLines={2} className='h-[40]'>{hotel.description}</Text>
                            <Text numberOfLines={2}>📍  {hotel.address}</Text>
                            <View className='flex-row justify-between'>
                                <Text className='font-bold'>🏷️  {hotel.pricePerNight}</Text>
                                <Text className='font-bold'>⭐  {hotel.rating}</Text>
                            </View>
                        </View>
                    </View>
                )))}
            </ScrollView>
        </View>
    )

}

export default HotelsComponent