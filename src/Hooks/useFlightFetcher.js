import React, { useState, useEffect } from "react";
import axios from "axios";

const useFlightFetcher = (originLocation, destinationLocation, depTravelDates, adultsNumber) => {
    const [flights, setFlights] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        if (!originLocation || !destinationLocation || !depTravelDates || !adultsNumber) return;

        const fetchFlights = async () => {
            setIsLoading(true);


            const flightData = {
                "originLocation": originLocation,
                "destinationLocation": destinationLocation,
                "depTravelDates": depTravelDates,
                "adultsNumber": adultsNumber     
            }
            
            try {
                const response = await axios.post("http://localhost:3000/api/v1/bookFlight", flightData);
                setFlights(response.data);
                setIsLoading(false);
                setError(null);
                console.log(`sccessfully fetched ${JSON.stringify(response.data)} flights`);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };
        fetchFlights();
    }, [originLocation, destinationLocation, depTravelDates, adultsNumber]
);
    return { flights, error, isLoading };
};
export default useFlightFetcher;