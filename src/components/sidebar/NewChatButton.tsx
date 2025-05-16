"use client";

import React from 'react';

interface NewChatButtonProps {
    onClick: () => void;
}

const NewChatButton: React.FC<NewChatButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="w-full mt-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-4 rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
            + New Chat
        </button>
    );
};

export default NewChatButton;
