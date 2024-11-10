import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, RefreshControl, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';

import { useAuth } from '@clerk/clerk-expo';
import { Trip } from '@/types/Trip';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/utils/FireBaseConfig';
import TripComponent from '@/components/TripComponent';

import Header from '@/components/Header';
import InputFilter from '@/components/InputFilter';
import { router } from 'expo-router';


const Index = () => {
    const [allTrips, setAllTrips] = useState<Trip[]>([]);
    const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
    const { userId } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const getUserTrips = async () => {
        if (!userId) return;
        setLoading(true);
        try {
            const q = query(collection(db, "UserTrips"), where("userId", "==", userId));
            const querySnapshot = await getDocs(q);
            const trips: Trip[] = [];
            querySnapshot.forEach((doc) => {
                trips.push(doc.data() as Trip);
            });
            setAllTrips(trips);
            setFilteredTrips(trips);
        } catch (error) {
            console.error("Error fetching trips:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await getUserTrips();
        setRefreshing(false);
    };

    const handleFilter = (trips: Trip[]) => {
        setFilteredTrips(trips);
    }

    useEffect(() => {
        if (userId) getUserTrips();
    }, [userId]);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <Header />
            
            <InputFilter handleFilter={handleFilter} trips={allTrips} />
            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="black" />
                </View>
            ) : filteredTrips.length === 0 ? (
                <View className="mt-32 items-center">
                    <Entypo name="location" size={60} color="black" />
                    <Text className="text-2xl font-medium my-3">Chưa có chuyến đi nào</Text>
                    <Text className="w-[300] text-center text-base">
                        Có vẻ như đã đến lúc lên kế hoạch cho những trải nghiệm du lịch mới! Bắt đầu bên dưới
                    </Text>
                    <TouchableOpacity
                        className="py-4 mx-auto bg-black w-[150] rounded-lg mt-10"
                    >
                        <Text className="text-white text-base text-center font-medium">Tạo lịch trình</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View className='flex-1 px-3'>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={handleRefresh}
                            />
                        }
                    >
                        <View>
                            {filteredTrips.map((trip) => (
                                <TripComponent key={trip.id} trip={trip} />
                            ))}
                        </View>
                    </ScrollView>
                </View>
            )}
        </SafeAreaView>
    );
};

export default Index;