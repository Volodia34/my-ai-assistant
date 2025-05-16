import React from 'react';

export default function ChatPage() {
  return (
      <div className="flex-1 flex flex-col h-full bg-[#1e1e2d]">
        <header className="bg-[#252538] p-3 text-center flex-shrink-0 border-b border-gray-700">
          <h1 id="chat-header" className="text-lg font-medium text-white">
            Chat (soon)
          </h1>
        </header>
        <div
            id="chat-window"
            className="flex-1 p-4 space-y-3 overflow-y-auto message-container"
        >
          <p className="text-center text-gray-400">Chat window (soon)</p>
        </div>
        <div
            id="chat-controls"
            className="p-3 border-t border-gray-700 bg-[#252538] flex-shrink-0"
        >
          <div className="flex items-center space-x-2 input-glow bg-[#1e1e2d] rounded-lg p-1">
            <input
                type="text"
                id="message-input"
                placeholder="Type your message... (soon)"
                className="flex-1 p-3 bg-transparent border-none rounded-lg focus:ring-0 text-white placeholder-gray-400"
                disabled
            />
            <button
                id="send-button"
                className="px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-150 opacity-50 cursor-not-allowed" // Styles for disabled button
                disabled
            >
              Send
            </button>
          </div>
        </div>
      </div>
  );
}
