
import React, { useEffect } from 'react'

import TripProvider from '@/utils/TripContext'
import * as SecureStore from 'expo-secure-store';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { router, Stack } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';


const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
const tokenCache = {
    async getToken(key: string) {
        try {
            return SecureStore.getItemAsync(key);
        } catch (err) {
            return null;
        }
    },
    async saveToken(key: string, value: string) {
        try {
            return SecureStore.setItemAsync(key, value);
        } catch (err) {
            return;
        }
    },
};

const InitialLayout = () => {

    const { isSignedIn, isLoaded } = useAuth();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.replace(`/(modal)/login`)
        }
    }, [isSignedIn, isLoaded])

    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='(details)/[id]' />
            <Stack.Screen name='(details)/tripMap'
                options={{             
                    title: "Xem bản đồ",
                   
                }}
            />
            <Stack.Screen name='(modal)/login' options={{ headerShown: false }} />
            <Stack.Screen name='createTrip' options={{ headerTitle: "Tạo lịch trình" }} />
            <Stack.Screen name='oauth-native-callback' options={{ headerShown: false }} />
        </Stack>
    )
}
const RootLayout = () => {
    return (
        <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
            <TripProvider>
                <InitialLayout />
            </TripProvider>
        </ClerkProvider>
    )
}
export default RootLayout