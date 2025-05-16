"use client";

import React, { useEffect, useRef } from 'react';
import { useChat } from '@/context/ChatContext';
import MessageBubble from './MessageBubble';

const ChatWindow = () => {
    const { chatSessions, activeChatId } = useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null); // Ref for scrolling to bottom

    const activeSession = chatSessions.find(session => session.id === activeChatId);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [activeSession?.messages]);

    if (!activeSession) {
        return (
            <div className="flex-1 flex items-center justify-center p-4">
                <p className="text-gray-400">Select a chat to start messaging or create a new one.</p>
            </div>
        );
    }

    return (
        <div className="flex-1 p-4 space-y-3 overflow-y-auto message-container">
            {/* TypeScript infers 'msg' to be of type 'Message' here from 'activeSession.messages' */}
            {activeSession.messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
            ))}
            <div ref={messagesEndRef} /> {/* Empty div to scroll to */}
        </div>
    );
};

export default ChatWindow;
