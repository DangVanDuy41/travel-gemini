import { StyleSheet, Alert, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GeoCoordinates } from '@/types/Trip';
import { useTripContext } from '@/utils/useTripContext';

interface LocationWithTitle {
    geoCoordinates: GeoCoordinates;
    title: string;
}

const TripMap = () => {
    
    console.log('qweqwe')
    const { tripResult } = useTripContext();
    function getAllGeoCoordinates(): LocationWithTitle[] {
        const geoCoordinatesArray: LocationWithTitle[] = [];

      
        geoCoordinatesArray.push({
            geoCoordinates: tripResult.travelPlan.geoCoordinates,
            title: tripResult.travelPlan.location 
        });

        
        tripResult.travelPlan.hotels.forEach(hotel => {
            geoCoordinatesArray.push({
                geoCoordinates: hotel.geoCoordinates,
                title: hotel.hotelName 
            });
        });

      
        tripResult.travelPlan.dailyItinerary.forEach(itinerary => {
            itinerary.activitie.forEach(activity => {
                geoCoordinatesArray.push({
                    geoCoordinates: activity.geoCoordinates,
                    title: activity.activity 
                });
            });
        });

        return geoCoordinatesArray;
    }
    const [mapMarker, setMapMarker] = useState<LocationWithTitle[]>([]);
    useEffect(() => {
        const coordinates = getAllGeoCoordinates();
        console.log(coordinates);
        setMapMarker([...coordinates])
    }, [])
    useEffect(() => {
        const getPermissions = async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert(
                        'Permission Required',
                        'App needs access to your location to function properly. Please grant location permissions.',
                        [
                            {
                                text: 'OK',
                                onPress: () => BackHandler.exitApp(),
                            },
                        ],
                        { cancelable: false }
                    );
                } else {
                    console.log('Location permissions granted');
                   
                }
            } catch (error) {
                console.error('Error requesting location permissions:', error);
            }
        };

        getPermissions();
    }, []);

    return (
        <SafeAreaView className='flex-1'>
            <MapView
                style={styles.map}             
                showsUserLocation
                showsMyLocationButton
            >
                {mapMarker.map((item, index) => (
                    <Marker key={index}
                        coordinate={{
                            latitude: item.geoCoordinates.latitude,
                            longitude: item.geoCoordinates.longitude
                        }}
                        title={item.title}
                    >
                    </Marker>
                ))}
            </MapView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
export default TripMap