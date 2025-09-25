'use client';

import React from 'react';

export interface QuickReply {
  id: string;
  text: string;
  value?: string;
}

export interface QuickRepliesProps {
  replies: QuickReply[];
  onReplyClick: (reply: QuickReply) => void;
  disabled?: boolean;
}

const QuickReplies: React.FC<QuickRepliesProps> = ({ 
  replies, 
  onReplyClick, 
  disabled = false 
}) => {
  if (replies.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-2 mb-4 animate-fade-in">
      {replies.map((reply) => (
        <button
          key={reply.id}
          onClick={() => !disabled && onReplyClick(reply)}
          disabled={disabled}
          className={`
            px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200
            transform hover:scale-105 active:scale-95
            ${disabled 
              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
              : 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600 hover:border-blue-600 shadow-sm hover:shadow-md'
            }
          `}
        >
          {reply.text}
        </button>
      ))}
    </div>
  );
};

export default QuickReplies;
