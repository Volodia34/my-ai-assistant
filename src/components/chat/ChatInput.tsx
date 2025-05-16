"use client";

import React, { useState }
    from 'react';
import { useChat } from '@/context/ChatContext';

const ChatInput = () => {
    const [inputValue, setInputValue] = useState('');
    const { activeChatId, sendMessageToAI, isLoadingAiResponse } = useChat();

    const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
        if (e) e.preventDefault();
        const trimmedInput = inputValue.trim();
        if (!trimmedInput || !activeChatId || isLoadingAiResponse) return;

        setInputValue('');
        await sendMessageToAI(activeChatId, trimmedInput);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-gray-700 bg-[#252538] flex-shrink-0"
        >
            <div className="flex items-center space-x-2 input-glow bg-[#1e1e2d] rounded-lg p-1">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isLoadingAiResponse ? "AI is thinking..." : "Type your message..."}
                    className="flex-1 p-3 bg-transparent border-none rounded-lg focus:ring-0 text-white placeholder-gray-400"
                    disabled={isLoadingAiResponse || !activeChatId}
                />
                <button
                    type="submit"
                    className={`px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-150
            ${(isLoadingAiResponse || !activeChatId) ? 'opacity-50 cursor-not-allowed' : ''}
          `}
                    disabled={isLoadingAiResponse || !activeChatId || !inputValue.trim()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path d="M3.105 3.105a1.5 1.5 0 012.122-.001L19.43 14.496a1.515 1.515 0 01.301 1.9l-.002.002a1.05 1.05 0 01-1.606.208L4.836 5.216a1.05 1.05 0 01.209-1.605l.002-.002a1.5 1.5 0 01-.001-2.122zM3.105 3.105a1.5 1.5 0 012.122-.001L19.43 14.496a1.515 1.515 0 01.301 1.9l-.002.002a1.05 1.05 0 01-1.606.208L4.836 5.216a1.05 1.05 0 01.209-1.605l.002-.002a1.5 1.5 0 01-.001-2.122z" clipRule="evenodd" />
                        <path d="M4.43 2.044a1.5 1.5 0 00-1.323.001L.579 4.167a1.05 1.05 0 00-.21 1.605l.002.002 10.28 10.281a1.05 1.05 0 001.607-.209l.001-.002 2.123-2.528a1.515 1.515 0 00-.3-1.9L4.43 2.044z" />
                    </svg>
                </button>
            </div>
        </form>
    );
};

export default ChatInput;
