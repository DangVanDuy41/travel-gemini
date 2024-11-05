import { Trip } from "@/types/Trip";

export const initialTrip: Trip = {
    travelPlan: {
      family:{numberOfPeople:0},
      location: "",
      duration: "",
      budget: "",
      numberOfPeople: 0,
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
  };