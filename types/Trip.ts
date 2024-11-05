export interface Trip {
    travelPlan: TravelPlan;
}
export interface TravelPlan {
    location: string;
    duration: string;
    budget: string;
    numberOfPeople: number;
    geoCoordinates:GeoCoordinates
    transportation: Transportation
    hotels: Hotel[];
    dailyItinerary: DailyItinerary[];
}
export interface DailyItinerary {
    day: string;
    activitie: Activity[];
}

export interface Activity {
    time: string,
    activity: string;
    description: string;
    bestTimeToVisit: BestTimeToVisit;
    geoCoordinates: GeoCoordinates;
    ticketPrice?: string;
}
export enum BestTimeToVisit {
    Afternoon = "Afternoon",
    Morning = "Morning",
}
export interface GeoCoordinates {
    latitude: number;
    longitude: number;
}


export interface Hotel {
    hotelName: string;
    address: string;
    pricePerNight: string;
    imageURL: string;
    geoCoordinates: GeoCoordinates;
    rating: number;
    description: string;
    
}
export interface Transportation {
    toDestination: Destination;
    inDestination: Destination;
}

export interface Destination {
    option: string;
    details: string;
    bookingURL: string;
    price: string;
}
