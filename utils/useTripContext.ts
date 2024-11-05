import { useContext } from "react"
import { TripContext } from "./TripContext"

export const useTripContext = () => {
    const context = useContext(TripContext);
    if (context ==undefined) {
        throw new Error('useTripContext must be used within a TripProvider');
    }
    return context;
}