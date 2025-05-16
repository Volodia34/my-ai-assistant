"use client";

import React, { useState } from 'react';

interface CodeBlockProps {
    code: string;
    language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
    const [copyText, setCopyText] = useState('Copy code');

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopyText('Copied!');
            setTimeout(() => setCopyText('Copy code'), 2000);
        } catch (err) {
            console.error('Failed to copy code: ', err);
            setCopyText('Error');
            setTimeout(() => setCopyText('Copy code'), 2000);
        }
    };

    return (
        <div className="code-block-container bg-[#1e1e2d] border border-[#31314a] rounded-lg my-2 overflow-hidden">
            <div className="code-block-header flex justify-between items-center bg-[#252538] py-1.5 px-3 border-b border-[#31314a]">
        <span className="code-block-lang text-xs text-gray-400 uppercase">
          {language || 'code'}
        </span>
                <button
                    onClick={handleCopy}
                    className="copy-code-button bg-[#4a4a6a] hover:bg-[#5a5a7a] text-white text-xs py-1 px-2 rounded transition-colors"
                >
                    {copyText}
                </button>
            </div>
            <pre className="p-3 m-0 overflow-x-auto text-sm">
        <code className={`language-${language} font-mono`}>{code}</code>
      </pre>
        </div>
    );
};

export default CodeBlock;
