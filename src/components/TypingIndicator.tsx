'use client';

import React, { useState, useEffect } from 'react';

const TypingIndicator: React.FC = React.memo(() => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Fade out after 3 seconds if still visible
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="flex justify-start mb-4 animate-fade-in">
      <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm max-w-xs transition-colors duration-300">
        <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full typing-dot"></div>
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full typing-dot"></div>
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full typing-dot"></div>
                    </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Agent is typing...</span>
        </div>
      </div>
    </div>
  );
});

TypingIndicator.displayName = 'TypingIndicator';

export default TypingIndicator;
