
export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: number;
    isTyping?: boolean;
}

export interface ChatSession {
    id: string;
    name: string;
    messages: Message[];
    createdAt: number;
}
