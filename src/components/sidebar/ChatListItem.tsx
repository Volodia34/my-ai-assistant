"use client";

import React from 'react';
import { ChatSession } from '@/types/chat';

interface ChatListItemProps {
    session: ChatSession;
    isActive: boolean;
    onClick: () => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ session, isActive, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`
        chat-list-item p-3 rounded-lg cursor-pointer transition-colors duration-150 ease-in-out
        truncate text-sm
        ${isActive ? 'bg-[#31314a] text-white' : 'text-gray-300 hover:bg-[#2c2c44] hover:text-gray-100'}
      `}
            title={session.name}
        >
            {session.name}
        </div>
    );
};

export default ChatListItem;
