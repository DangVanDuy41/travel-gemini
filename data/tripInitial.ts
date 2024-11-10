import { Trip } from "@/types/Trip";

export const initialTrip: Trip = {
  id: "",
  travelPlan: {
    location: "",
    duration: "",
    budget: "",
    numberOfPeople: 1,
    geoCoordinates: {
      latitude: 0,
      longitude: 0,
    },
    transportation: {
      toDestination: {
        option: "",
        details: "",
        bookingURL: "",
        price: "",
      },
      inDestination: {
        option: "",
        details: "",
        bookingURL: "",
        price: "",
      },
    },
    hotels: [],
    dailyItinerary: [],
  },
  userId: ""
};