import { useState, useEffect } from "react";
import axios from "axios";

const useFlightFetcher = ( userInputPlace ) => {

    const [places, setPlaces] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() =>{

        if (!userInputPlace) return;

        const fetchPlaces = async () => {
            setIsLoading(true);
            try {
                // real google places api
                const response = await axios.post(`http://localhost:44169/api/v1/findPlaces?destination=${userInputPlace}`);
                // const response = await axios.get(`https://run.mocky.io/v3/34f28135-32ee-46f1-82a1-940474437a75`);

                // mocky api
                // const response = await axios.get(``);
                // mock api for florida places
                // const response = await axios.get(`https://run.mocky.io/v3/cb83cd98-7856-4b3b-9f94-ac25ad34709c`);                
                setPlaces(response.data);
                setIsLoading(false);
                setError(null);
                // console.log(`sccessfully fetched ${JSON.stringify(response.data)} places`);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };
        fetchPlaces();
    },[userInputPlace]

    );
    return { places, error, isLoading };
};


export default useFlightFetcher