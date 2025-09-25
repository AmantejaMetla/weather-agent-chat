'use client';

import React, { useState, useRef } from 'react';
import { IoSend, IoHappyOutline, IoAttachOutline } from 'react-icons/io5';
import EmojiPicker from './EmojiPicker';
import FileUpload from './FileUpload';

export interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  onEmojiClick?: () => void;
  onAttachmentClick?: () => void;
  isLoading?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  disabled = false,
  placeholder = "Enter your message...",
  onEmojiClick,
  onAttachmentClick,
  isLoading = false
}) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleFileSelect = (file: File) => {
    // For now, just add the filename to the message
    // In a real app, you'd upload the file and get a URL
    setMessage(prev => prev + `📎 ${file.name}`);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  };

  return (
    <div 
      className="p-4 border-t rounded-b-lg transition-colors duration-300"
      style={{ 
        backgroundColor: 'var(--background)',
        borderColor: 'var(--border-color)'
      }}
    >
      <form onSubmit={handleSubmit} className="flex items-end gap-2 sm:gap-3">
        {/* Left side buttons */}
        <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowEmojiPicker(true)}
                        disabled={disabled || isLoading}
                        className={classNames(
                          'p-2 sm:p-2.5 rounded-full transition-all duration-200',
                          'transform hover:scale-110 active:scale-95',
                          (disabled || isLoading)
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                        )}
                        aria-label="Add emoji"
                        title="Add emoji"
                      >
                        <IoHappyOutline className="w-5 h-5" />
                      </button>
          
          <button
            type="button"
            onClick={() => setShowFileUpload(true)}
            disabled={disabled || isLoading}
            className={classNames(
              'p-2 sm:p-2.5 rounded-full transition-all duration-200',
              'transform hover:scale-110 active:scale-95',
              (disabled || isLoading)
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
            )}
            aria-label="Attach file"
            title="Attach file"
          >
            <IoAttachOutline className="w-5 h-5" />
          </button>
        </div>

        {/* Text input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || isLoading}
                        className={classNames(
                          'w-full px-4 py-3 pr-12 border rounded-2xl resize-none',
                          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                          'transition-all duration-200 ease-in-out',
                          'min-h-[48px] max-h-[120px]',
                          'text-black',
                          (disabled || isLoading) ? 'cursor-not-allowed' : ''
                        )}
                        style={{
                          backgroundColor: (disabled || isLoading) 
                            ? 'var(--input-bg)' 
                            : 'var(--input-bg)',
                          color: '#000000 !important',
                          borderColor: 'var(--border-color)',
                          '--tw-text-opacity': '1'
                        } as React.CSSProperties}
            rows={1}
          />
        </div>

        {/* Send button */}
        <button
          type="submit"
          disabled={disabled || !message.trim() || isLoading}
                      className={classNames(
                        'flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full',
                        'transition-all duration-200 ease-in-out',
                        'transform hover:scale-105 active:scale-95',
                        (disabled || !message.trim() || isLoading)
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'text-white shadow-lg hover:shadow-xl'
                      )}
                      style={{
                        backgroundColor: (disabled || !message.trim() || isLoading) 
                          ? '#d1d5db' 
                          : 'var(--primary)'
                      } as React.CSSProperties}
          aria-label={isLoading ? "Sending message..." : "Send message"}
          title={isLoading ? "Sending..." : "Send message"}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <IoSend className="w-5 h-5" />
          )}
        </button>
      </form>

      {/* Emoji Picker Modal */}
      <EmojiPicker
        isOpen={showEmojiPicker}
        onClose={() => setShowEmojiPicker(false)}
        onEmojiSelect={handleEmojiSelect}
      />

      {/* File Upload Modal */}
      <FileUpload
        isOpen={showFileUpload}
        onClose={() => setShowFileUpload(false)}
        onFileSelect={handleFileSelect}
      />
    </div>
  );
};

// Helper function for classNames (since we're not importing it globally)
function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export default MessageInput;
