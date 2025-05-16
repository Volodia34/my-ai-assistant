"use client";

import React, { useEffect } from 'react';
import { useChat } from '@/context/ChatContext';
import ChatListItem from '@/components/sidebar/ChatListItem';
import NewChatButton from '@/components/sidebar/NewChatButton';

const Sidebar = () => {
    const { chatSessions, activeChatId, setActiveChatId, addChatSession } = useChat();

    useEffect(() => {
        if (chatSessions.length > 0 && (!activeChatId || !chatSessions.find(s => s.id === activeChatId))) {
            setActiveChatId(chatSessions[0].id);
        } else if (chatSessions.length === 0 && activeChatId) {
            setActiveChatId(null);
        }
    }, [chatSessions, activeChatId, setActiveChatId]);

    const handleCreateNewChat = () => {
        const newSession = addChatSession();
        console.log("New chat created:", newSession.id);
    };

    return (
        <aside className="sidebar w-full md:w-1/4 lg:w-1/5 p-4 flex flex-col space-y-3 overflow-y-auto bg-[#1e1e2d] border-r border-[#31314a] h-screen">
            <h2 className="text-lg font-semibold text-white text-center md:text-left mb-3 flex-shrink-0">My Chats</h2>
            <div className="space-y-1.5 flex-grow overflow-y-auto pr-1">
                {chatSessions.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center mt-4">No chats yet. Start a new one!</p>
                ) : (
                    chatSessions.map((session) => (
                        <ChatListItem
                            key={session.id}
                            session={session}
                            isActive={session.id === activeChatId}
                            onClick={() => setActiveChatId(session.id)}
                        />
                    ))
                )}
            </div>
            <div className="mt-auto flex-shrink-0 pt-3">
                <NewChatButton onClick={handleCreateNewChat} />
            </div>
        </aside>
    );
};

export default Sidebar;
