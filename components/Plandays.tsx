import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { DailyItinerary } from '@/types/Trip'

interface Props {
    dailyItinerary: DailyItinerary[],
}
const Plandays = ({ dailyItinerary }: Props) => {
    return (
        <View>
            <Text className='text-xl font-bold py-5'> 🧳 Lịch trình chi tiết</Text>
            <View>
                {dailyItinerary.map((item, index) => (
                    <View key={index}>
                        <Text className='text-lg font-bold'>{item.day}:</Text>
                        <View >
                            {item.activitie.map((detail, index) => (
                                <View style={styles.card} key={index}>
                                    <Text><Text className='text-base font-bold'>Thời gian: </Text>{detail.time}</Text>
                                    <Text className='text-base'>{detail.description}</Text>
                                    {detail.ticketPrice && <Text>🎟️ {detail.ticketPrice}</Text>}
                                </View>
                            ))}
                        </View>
                    </View>
                ))}
            </View>
        </View>

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
        padding: 10,
        gap: 20
    }
})
export default Plandays