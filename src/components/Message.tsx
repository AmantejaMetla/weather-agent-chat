'use client';

import React from 'react';
import classNames from 'classnames';
import { IoCheckmark } from 'react-icons/io5';

export interface MessageProps {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
  quickReplies?: Array<{ id: string; text: string; value?: string }>;
  onQuickReply?: (reply: { id: string; text: string; value?: string }) => void;
  isError?: boolean;
  searchQuery?: string;
  deliveryStatus?: 'sent' | 'delivered';
}

const Message: React.FC<MessageProps> = React.memo(({ 
  role,
  content, 
  timestamp, 
  quickReplies = [],
  onQuickReply,
  isError = false,
  searchQuery = '',
  deliveryStatus
}) => {
  const isUser = role === 'user';

  // Highlight search query in content
  const highlightSearchQuery = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="search-highlight">
          {part}
        </span>
      ) : part
    );
  };
  
  return (
    <div
      className={classNames(
        'flex mb-4',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div className="max-w-[80%]">
                    <div
                      className={classNames(
                        'px-4 py-3 rounded-2xl shadow-sm message-bubble',
                        'transform transition-all duration-200 ease-in-out',
                        'hover:shadow-md',
                        'max-w-full break-words',
                        isUser ? 'rounded-br-sm' : isError ? 'rounded-bl-sm border' : 'rounded-bl-sm'
                      )}
                      style={{
                        backgroundColor: isUser 
                          ? 'var(--primary)' 
                          : isError 
                            ? 'var(--message-agent-bg)' 
                            : 'var(--message-agent-bg)',
                        color: isUser 
                          ? 'var(--message-user-text)' 
                          : isError 
                            ? 'var(--message-text)' 
                            : 'var(--message-text)',
                        borderColor: isError ? 'var(--border-color)' : 'transparent',
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word'
                      }}
                    >
          <p 
            className="text-sm leading-relaxed whitespace-pre-wrap message-content"
            style={{
              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
              lineHeight: '1.6'
            }}
          >
            {highlightSearchQuery(content, searchQuery)}
          </p>
          <div className="flex items-center justify-between mt-2">
            <p
              className={classNames(
                'text-xs opacity-70',
                isUser 
                  ? 'text-blue-100' 
                  : isError 
                    ? 'text-red-600 dark:text-red-400' 
                    : 'text-gray-500 dark:text-gray-400'
              )}
            >
              {timestamp.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
            {isUser && deliveryStatus && (
              <div className="flex items-center space-x-1">
                <IoCheckmark 
                  className={classNames(
                    'w-3 h-3',
                    deliveryStatus === 'delivered' 
                      ? 'text-blue-200' 
                      : 'text-blue-300'
                  )} 
                />
                {deliveryStatus === 'delivered' && (
                  <IoCheckmark className="w-3 h-3 text-blue-200 -ml-1" />
                )}
              </div>
            )}
          </div>
        </div>
        
                    {/* Quick Replies for agent messages */}
                    {!isUser && quickReplies.length > 0 && onQuickReply && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {quickReplies.map((reply) => (
                          <button
                            key={reply.id}
                            onClick={() => onQuickReply(reply)}
                            className="px-4 py-2 text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                            style={{
                              background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}
                          >
                            {reply.text}
                          </button>
                        ))}
                      </div>
                    )}
      </div>
    </div>
  );
});

Message.displayName = 'Message';

export default Message;
