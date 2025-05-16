"use client";

import React from 'react';

const Sidebar = () => {
    return (
        <aside className="sidebar w-full md:w-1/4 lg:w-1/5 p-4 flex flex-col space-y-3 overflow-y-auto bg-[#1e1e2d] border-r border-[#31314a]">
            <h2 className="text-lg font-semibold text-white text-center md:text-left">My Chats</h2>
            <div className="space-y-1 flex-grow">
                <p className="text-sm text-gray-400">Chat list (soon)</p>
            </div>
            <button className="w-full mt-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-150">
                + New Chat (soon)
            </button>
        </aside>
    );
};

export default Sidebar;
