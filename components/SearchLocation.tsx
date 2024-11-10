import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { EvilIcons } from '@expo/vector-icons';


import Animated, { useAnimatedStyle, withTiming, useSharedValue, SlideInRight } from 'react-native-reanimated';
import { useDebounce } from '@/hooks/useDebouce';
import { getLocation } from '@/utils/getLocation';

interface Props {
    handleChooseLocation: (location: string) => void
}

const SearchLocation = ({ handleChooseLocation }: Props) => {

    const [searchText, setSearchText] = useState('');
    const [location, setLocation] = useState<string>();
    const animatedHeight = useSharedValue<number>(0);
    const debouncedSearchText = useDebounce(searchText, 300);
    const [listLocation, setListLocation] = useState<any[]>([]);
    const MAX_HEIGHT = 210;

    const handleButton = (location: string) => {
        handleChooseLocation(location);
        setLocation(location)
        setListLocation([])
    }
    useEffect(() => {
        if (debouncedSearchText) {
            const getLocations = async () => {
                const data = await getLocation(debouncedSearchText);
                setListLocation([...data]);
            };
            getLocations();
        } else {
            setListLocation([]);
        }
    }, [debouncedSearchText]);

    useEffect(() => {
        const newHeight = listLocation.length * 70;
        animatedHeight.value = withTiming(newHeight > MAX_HEIGHT ? MAX_HEIGHT : newHeight, { duration: 300 });
    }, [listLocation]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: animatedHeight.value,
            maxHeight: MAX_HEIGHT,
        };
    });

    return (
        <View>
            <Animated.View className={'px-3'} style={styles.card}>
                <Text className='text-xl px-6 font-bold py-3'>
                    Bạn muốn đi du lịch ở đâu?
                </Text>
                <View className='p-3'>
                    <View className='flex-row justify-between items-center py-2 border rounded-md'>
                        <Ionicons name='search' style={{ paddingHorizontal: 10 }} size={20} />
                        <TextInput
                            className='flex-1 pr-2'
                            placeholder='Nhập địa điểm'
                            onChangeText={(text) => {
                                setSearchText(text);
                                setLocation(text)
                            }}

                            value={location}
                        />
                    </View>
                </View>
                <Animated.ScrollView
                    className='py-2'
                    nestedScrollEnabled={true}
                    style={animatedStyle}
                >
                    {listLocation?.map((location: any) => (
                        <TouchableOpacity
                            className='flex-1 border-b-2'
                            key={location.place_id}
                            onPress={() => handleButton(location.display_name)}
                        >
                            <View className='flex-row gap-3 py-3 w-[90%]'>
                                <EvilIcons name="location" size={30} color="red" />
                                <Text>{location.display_name}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </Animated.ScrollView>
            </Animated.View>
        </View>
    );
};

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
    }
});

export default SearchLocation;