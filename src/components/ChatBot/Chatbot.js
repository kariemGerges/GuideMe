import React, { useState, useCallback } from 'react';
import useChatBotFetcher from 'src/Hooks/useChatBotFetcher';
import Loading from '../Loading/Loading';

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [userPrompt, setUserPrompt] = useState("");
    const [query, setQuery] = useState("");

    const { response, error, isLoading } = useChatBotFetcher(query);

    const handleSend = useCallback(() => {
        if (!userPrompt) {
            return;
        }
        setQuery(userPrompt);
        setUserPrompt("");
    }, [userPrompt]);

    const toggleMenu = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const formatResponseFromAiToHtml = useCallback((response) => {
        const lines = response.split('\n');
        let formattedText = '';
        let inList = false;

        lines.forEach(line => {
            if (line.startsWith('##')) {
                formattedText += `<h2>${line.substring(3)}</h2>`;
            } else if (line.startsWith('**')) {
                if (inList) {
                    formattedText += '</ul>';
                    inList = false;
                }
                formattedText += `<h3>${line.replace(/\*\*/g, '')}</h3>`;
            } else if (line.startsWith('*')) {
                if (!inList) {
                    formattedText += '<ul>';
                    inList = true;
                }
                formattedText += `<li>${line.replace(/\*\*/g, '')}</li>`;
            } else if (line.trim() === '') {
                if (inList) {
                    formattedText += '</ul>';
                    inList = false;
                }
                formattedText += '<br />';
            } else {
                formattedText += `<p>${line}</p>`;
            }
        });

        if (inList) {
            formattedText += '</ul>';
        }

        return formattedText;
    }, []);

    return (
        <div className="fixed bottom-4 right-4">
            <button
                onClick={toggleMenu}
                className="bg-black text-white font-bold py-2 px-3 rounded-full shadow-lg focus:outline-none focus:shadow-outline"
            >
                {isOpen ? 'x' : 'chat with ai'}
            </button>

            {isOpen && (
                <div className="fixed bottom-16 right-4 m-4 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <div className="p-4 h-96 overflow-y-auto">
                        { 
                            isLoading 
                            ? 
                            `Loading... ${<Loading />}`
                            : 
                            response && (<div className='my-2 p-2 rounded-lg bg-gray-200 self-end' dangerouslySetInnerHTML={{ __html: formatResponseFromAiToHtml(response) }}/>)
                        }

                    </div>
                    <div className="flex p-2 border-t border-gray-300 bg-gray-100">
                        <input
                            className="flex-1 p-2 border rounded-l-lg focus:outline-none"
                            type="text"
                            value={userPrompt}
                            onChange={(e) => setUserPrompt(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button
                            className="bg-black text-white p-2 rounded-r-lg"
                            onClick={handleSend}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
