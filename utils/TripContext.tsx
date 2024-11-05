import { View } from 'react-native'
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { Trip } from '@/types/Trip';
import { initialTrip } from '@/data/tripInitial';

interface TripProviderProps {
    children: ReactNode;
}
interface TripData {
    totalDays: number,
    budget: string,
    location: string,
    traveler: number,
}

interface TripContextType {
    tripData: TripData
    setTripData: Dispatch<SetStateAction<TripData>>;
    tripResult : Trip
    setTripResult: Dispatch<SetStateAction<Trip>>;
}
export const TripContext = createContext<TripContextType | undefined>(undefined);

const TripProvider = ({ children }: TripProviderProps) => {
    const [tripData, setTripData] = useState<TripData>({
        totalDays: 1,
        budget: 'Trung bình',
        location: '',
        traveler: 1
    });
    const [tripResult,setTripResult]  = useState<Trip >(initialTrip);
    return (
        <TripContext.Provider value={{ tripData, setTripData,tripResult,setTripResult }}>
            {children}
        </TripContext.Provider>
    )
}

export default TripProvider