
import React from 'react'
import { Stack } from 'expo-router'
import TripProvider from '@/utils/TripContext'

const InitialLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='myTrip'  />
            <Stack.Screen name='tripMap' options={{ headerShown: false }}  />
        </Stack>
    )
}
const RootLayout = () => {
    return (
        <TripProvider>
            <InitialLayout />
        </TripProvider>

    )
}
export default RootLayout