"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ChatSession, Message } from '@/types/chat';

interface ChatContextType {
    chatSessions: ChatSession[];
    activeChatId: string | null;
    isLoadingAiResponse: boolean;
    setActiveChatId: (id: string | null) => void;
    addChatSession: (name?: string) => ChatSession;
    addMessageToSession: (sessionId: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
    sendMessageToAI: (sessionId: string, userMessageText: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
    children: ReactNode;
}

const generateId = () => Date.now().toString() + Math.random().toString(36).substring(2, 9);

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
    const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const [isLoadingAiResponse, setIsLoadingAiResponse] = useState<boolean>(false);

    useEffect(() => {
        const storedSessions = localStorage.getItem('chatSessions');
        const storedActiveId = localStorage.getItem('activeChatId');
        if (storedSessions) {
            try {
                const parsedSessions = JSON.parse(storedSessions) as ChatSession[];
                setChatSessions(parsedSessions);
                if (storedActiveId && parsedSessions.find(s => s.id === storedActiveId)) {
                    setActiveChatId(storedActiveId);
                } else if (parsedSessions.length > 0) {
                    setActiveChatId(parsedSessions[0].id);
                }
            } catch (error) {
                console.error("Failed to parse chat sessions from localStorage", error);
                localStorage.removeItem('chatSessions');
                localStorage.removeItem('activeChatId');
            }
        }
    }, []);

    useEffect(() => {
        if (chatSessions.length > 0) {
            localStorage.setItem('chatSessions', JSON.stringify(chatSessions));
        }
        if (activeChatId) {
            localStorage.setItem('activeChatId', activeChatId);
        } else {
            localStorage.removeItem('activeChatId');
        }
    }, [chatSessions, activeChatId]);


    const addChatSession = (name?: string): ChatSession => {
        const newSessionName = name || `Chat ${chatSessions.length + 1}`;
        const newSession: ChatSession = {
            id: generateId(),
            name: newSessionName,
            messages: [
                {
                    id: generateId(),
                    text: `Hello! This is ${newSessionName}. How can I help you today?`,
                    sender: 'ai',
                    timestamp: Date.now(),
                }
            ],
            createdAt: Date.now(),
        };
        setChatSessions(prevSessions => [...prevSessions, newSession]);
        setActiveChatId(newSession.id);
        return newSession;
    };

    const addMessageToSession = (sessionId: string, messageData: Omit<Message, 'id' | 'timestamp'>) => {
        const newMessage: Message = {
            ...messageData,
            id: generateId(),
            timestamp: Date.now(),
        };
        setChatSessions(prevSessions =>
            prevSessions.map(session =>
                session.id === sessionId
                    ? { ...session, messages: [...session.messages, newMessage] }
                    : session
            )
        );
    };

    const sendMessageToAI = async (sessionId: string, userMessageText: string) => {
        if (!sessionId) return;

        addMessageToSession(sessionId, { text: userMessageText, sender: 'user' });

        const typingIndicatorId = generateId();
        addMessageToSession(sessionId, {
            id: typingIndicatorId,
            text: '',
            sender: 'ai',
            isTyping: true,
            timestamp: Date.now()
        });
        setIsLoadingAiResponse(true);

        try {
            const response = await fetch('/api/gemini-proxy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessageText }),
            });

            setIsLoadingAiResponse(false);

            setChatSessions(prevSessions =>
                prevSessions.map(session =>
                    session.id === sessionId
                        ? { ...session, messages: session.messages.filter(msg => !(msg.isTyping && msg.id === typingIndicatorId)) }
                        : session
                )
            );


            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: "Unknown API error" }));
                throw new Error(errorData.error || `API request failed with status ${response.status}`);
            }

            const data = await response.json();
            const aiResponseText = data.reply || "Sorry, I couldn't get a response.";

            addMessageToSession(sessionId, { text: aiResponseText, sender: 'ai' });

        } catch (error) {
            setIsLoadingAiResponse(false);
            setChatSessions(prevSessions =>
                prevSessions.map(session =>
                    session.id === sessionId
                        ? { ...session, messages: session.messages.filter(msg => !(msg.isTyping && msg.id === typingIndicatorId)) }
                        : session
                )
            );
            console.error("Failed to send message to AI:", error);
            addMessageToSession(sessionId, {
                text: `Error: ${error instanceof Error ? error.message : "Could not connect to AI."}`,
                sender: 'ai',
            });
        }
    };


    const contextValue: ChatContextType = {
        chatSessions,
        activeChatId,
        isLoadingAiResponse,
        setActiveChatId,
        addChatSession,
        addMessageToSession,
        sendMessageToAI,
    };

    return <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>;
};

export const useChat = (): ChatContextType => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};
