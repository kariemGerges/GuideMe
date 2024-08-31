import { useEffect, useState } from 'react';
import axios from 'axios';

const useChatBotFetcher = (userInput) => {

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    console.log(`userInput from the Hook ${userInput}`);

    useEffect (() =>{

        if (!userInput) return;

        const fetchResponse = async () => {
            setIsLoading(true);
            try {
                const response = await axios.post("http://localhost:3000/api/v1/geminiChatBot", { prompt : userInput 
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setResponse(response.data.response.candidates[0].content.parts[0].text);
                setIsLoading(false);
                setError(null);
                console.log(`sccessfully fetched ${JSON.stringify(response.data.response.candidates[0].content.parts[0].text)} response`);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchResponse();
    }, [userInput])

    return { response, error, isLoading };
};


export default useChatBotFetcher;