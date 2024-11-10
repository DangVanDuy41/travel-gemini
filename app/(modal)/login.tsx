import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'


import { useOAuth } from '@clerk/clerk-expo'

import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'


const ggImage = require('@/assets/images/R.png');
const fbImage = require('@/assets/images/fb.jpg');

const Index = () => {
    useWarmUpBrowser()
    const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
    const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: 'oauth_facebook' });

    enum Strategy {
        GOOGLE = "oauth_google",
        FACEBOOK = "oauth_facebook",
    }
    const onSelectedAuth = async (strategy: Strategy) => {
        const selectedAuth = {
            [Strategy.GOOGLE]: googleAuth,
            [Strategy.FACEBOOK]: facebookAuth
        }[strategy]
        try {
            const { createdSessionId, setActive } = await selectedAuth();
            if (createdSessionId) {
                await setActive!({ session: createdSessionId })
                router.replace('/');
            }
        } catch (err) {
            console.error("Oauth error", err)

        }
    }
    return (
        <SafeAreaView className='p-3'>
            <View className='py-10 px-5'>
                <Text className='text-4xl font-bold'>Vui lòng đăng nhập</Text>
                <Text className='text-2xl text-gray-800  my-3'>Chào mừng bạn trở lại</Text>
                <Text className='text-2xl text-gray-800 '>Bạn đang mất tích!</Text>
            </View>
            <TextInput placeholder='Email' autoCapitalize='none' className='border-[1px] rounded-xl outline-none mt-6 p-3 ' />
            <TouchableOpacity >
                <View className='p-5 rounded-xl bg-black mt-7'>
                    <Text className='text-center  text-white font-bold'>Continue</Text>
                </View>
            </TouchableOpacity>

            <View className='flex-row mt-7 items-center'>
                <View className='flex-1 border-b-black border-b-[1px]' />
                <Text className='font-m mx-2 font-bold'>Or</Text>
                <View className='flex-1 border-b-black border-b-[1px]' />
            </View>

            <View>
                <TouchableOpacity onPress={() => onSelectedAuth(Strategy.GOOGLE)}>
                    <View className='flex-row items-center  rounded-xl  mt-7 p-5 border-black border-[1px]'>
                        <Image
                            source={ggImage}
                            className='w-[30] h-[30]'
                        />
                        <Text className='ml-5 text-center flex-1 font-medium'>Continue with Google</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onSelectedAuth(Strategy.FACEBOOK)}>
                    <View className='flex-row items-center  rounded-xl  mt-7 p-5 border-black border-[1px]'>
                        <Image
                            source={fbImage}
                            className='w-[30] h-[30]'
                        />
                        <Text className='ml-5 text-center flex-1 font-medium'>Continue with Facebook</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Index