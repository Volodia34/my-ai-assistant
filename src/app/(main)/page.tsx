// src/app/(main)/page.tsx
"use client"; // This page now uses client components and context

import React from 'react';
import ChatWindow from '@/components/chat/ChatWindow';
import ChatInput from '@/components/chat/ChatInput';
import { useChat } from '@/context/ChatContext'; // To get active chat name

export default function ChatPage() {
    const { chatSessions, activeChatId } = useChat();
    const activeSession = chatSessions.find(session => session.id === activeChatId);

    return (
        <div className="flex-1 flex flex-col h-full bg-[#1e1e2d]">
            <header className="bg-[#252538] p-3 text-center flex-shrink-0 border-b border-gray-700">
                <h1 id="chat-header" className="text-lg font-medium text-white">
                    {activeSession ? activeSession.name : "No Active Chat"}
                </h1>
            </header>
            <ChatWindow />
            <ChatInput />
        </div>
    );
}
