import { StyleSheet, Alert, BackHandler, View, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { GeoCoordinates, Trip } from '@/types/Trip';
import { useLocalSearchParams } from 'expo-router';

interface LocationWithTitle {
    geoCoordinates: GeoCoordinates;
    title: string;
}

const TripMap = () => {
    const { userTrip } = useLocalSearchParams();
    const tripData: Trip = JSON.parse(decodeURIComponent(Array.isArray(userTrip) ? userTrip[0] : userTrip));
    
    function getAllGeoCoordinates(): LocationWithTitle[] {
        const geoCoordinatesArray: LocationWithTitle[] = [];
        geoCoordinatesArray.push({
            geoCoordinates: tripData.travelPlan.geoCoordinates,
            title: tripData.travelPlan.location
        });
        tripData.travelPlan.hotels.forEach(hotel => {
            geoCoordinatesArray.push({
                geoCoordinates: hotel.geoCoordinates,
                title: hotel.hotelName
            });
        });
        tripData.travelPlan.dailyItinerary.forEach(itinerary => {
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
    const [locationGranted, setLocationGranted] = useState<boolean | null>(null);

    useEffect(() => {
        const coordinates = getAllGeoCoordinates();
        setMapMarker([...coordinates]);
    }, []);

    useEffect(() => {
        const checkLocationPermission = async () => {
            let { status } = await Location.getForegroundPermissionsAsync();
            if (status === 'granted') {
                setLocationGranted(true);
            } else {
                let { status: requestStatus } = await Location.requestForegroundPermissionsAsync();
                if (requestStatus === 'granted') {
                    setLocationGranted(true);
                } else {
                    setLocationGranted(false);
                    Alert.alert(
                        'Permission Required',
                        'App needs access to your location. Please grant location permission in settings.',
                        [
                            { text: 'Open Settings', onPress: () =>  Linking.openSettings() },
                            { text: 'Cancel', style: 'cancel', onPress: () => BackHandler.exitApp() },
                        ],
                        { cancelable: false }
                    );
                }
            }
        };

        checkLocationPermission();
    }, []);

    return (
        <View style={styles.container}>
            {locationGranted && (
                <MapView
                    style={styles.map}
                    showsUserLocation
                    showsMyLocationButton
                >
                    {mapMarker.map((item, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: item.geoCoordinates.latitude,
                                longitude: item.geoCoordinates.longitude,
                            }}
                            title={item.title}
                        />
                    ))}
                </MapView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default TripMap;