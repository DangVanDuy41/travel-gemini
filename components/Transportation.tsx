import { View, Text } from 'react-native'
import React from 'react'
import { Transportation } from '@/types/Trip'
import { styled } from 'nativewind'

interface Props {
    transportation: Transportation 
}

const Transport = ({ transportation }: Props) => {
    return (
        <View>
            <View className='flex-row items-center gap-1 py-3'>
                <Text className='text-2xl'>🏎️</Text>
                <Text className='text-xl font-extrabold'> Gợi ý cách di chuyển:</Text>
            </View>
            <View>
                <Text className='font-medium text-base'>Phương tiện di chuyển</Text>
                <Text><Text className='font-semibold'>Phương tiện:</Text> {transportation.toDestination.option}</Text>
                <Text><Text className='font-semibold'>Chi tiết: </Text> {transportation.toDestination.details}</Text>
                <Text>🏷️ {transportation.toDestination.price}</Text>
                <Text className='font-medium text-base pt-3'>Phương tiện dùng để tham quan </Text>
                <Text><Text className='font-semibold'>Phương tiện:</Text>  {transportation.inDestination.option}</Text>
                <Text><Text className='font-semibold'>Chi tiết: </Text> {transportation.inDestination.details}</Text>
                <Text>🏷️ {transportation.inDestination.price}</Text>
            </View>
        </View>
    )
}

export default Transport