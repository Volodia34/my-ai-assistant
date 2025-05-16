"use client";

import React from 'react';
import { Message } from '@/types/chat';
import CodeBlock from './CodeBlock';
import TypingIndicator from './TypingIndicator';

interface MessageBubbleProps {
    message: Message;
}

const applyBasicMarkdown = (textSegment: string): string => {
    let htmlContent = textSegment;
    const escapeHtml = (unsafe: string) => {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };
    htmlContent = escapeHtml(htmlContent);

    htmlContent = htmlContent.replace(/`([^`]+?)`/g, '<code class="inline-code">$1</code>'); // Inline code
    htmlContent = htmlContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Bold
    htmlContent = htmlContent.replace(/\*(.*?)\*/g, '<em>$1</em>'); // Italic
    htmlContent = htmlContent.replace(/\n/g, '<br />'); // Newlines
    return htmlContent;
};


const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
    const isUser = message.sender === 'user';

    if (message.isTyping) {
        return (
            <div className="flex justify-start w-full">
                <div className="chat-bubble ai-bubble bg-[#2c2c44] text-[#e0e0e0] self-start rounded-lg max-w-[80%]">
                    <TypingIndicator />
                </div>
            </div>
        );
    }

    const parts: (string | { code: string; lang: string })[] = [];
    const codeBlockRegex = /```(\w*)\n([\s\S]*?)\n```/g;
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(message.text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(message.text.substring(lastIndex, match.index));
        }
        parts.push({ code: match[2].trim(), lang: match[1] || 'text' });
        lastIndex = codeBlockRegex.lastIndex;
    }
    if (lastIndex < message.text.length) {
        parts.push(message.text.substring(lastIndex));
    }

    return (
        <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`chat-bubble p-3 rounded-lg max-w-[80%] break-words
          ${isUser ? 'user-bubble bg-[#4a4a6a] text-white self-end'
                    : 'ai-bubble bg-[#2c2c44] text-[#e0e0e0] self-start'}`}
            >
                {parts.map((part, index) => {
                    if (typeof part === 'string') {
                        return (
                            <span
                                key={index}
                                dangerouslySetInnerHTML={{ __html: applyBasicMarkdown(part) }}
                            />
                        );
                    } else {
                        return (
                            <CodeBlock
                                key={index}
                                code={part.code}
                                language={part.lang}
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default MessageBubble;
