"use client";

import React from 'react';

const TypingIndicator = () => {
    return (
        <div className="typing-indicator flex items-center space-x-1"> {/* Reduced space for tighter dots */}
            <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce-custom delay-300"></span> {/* Reversed delays for typical order */}
            <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce-custom delay-150"></span>
            <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce-custom delay-0"></span>
        </div>
    );
};

export default TypingIndicator;
