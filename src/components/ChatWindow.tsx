'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import Header from './Header';
import TypingIndicator from './TypingIndicator';
import SettingsModal from './SettingsModal';
import { useWeatherChat } from '../hooks/useWeatherChat';
import { useNotificationSound } from '../hooks/useNotificationSound';

const ChatWindow: React.FC = () => {
  const { 
    messages, 
    isLoading, 
    error, 
    threadId, 
    clearMessages, 
    sendMessage, 
    retryLastMessage,
    exportChatHistory
  } = useWeatherChat();
  
  const { playNotification } = useNotificationSound();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'end'
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Play notification sound when new agent message arrives
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === 'agent' && !isLoading) {
      playNotification();
    }
  }, [messages, isLoading, playNotification]);

  // Filter messages based on search query
  const filteredMessages = useMemo(() => {
    if (!searchQuery.trim()) return messages;
    
    return messages.filter(msg => 
      msg.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [messages, searchQuery]);

  const handleSendMessage = async (content: string) => {
    await sendMessage(content);
  };

  const handleQuickReply = (reply: { id: string; text: string; value?: string }) => {
    handleSendMessage(reply.text);
  };

  const handleEmojiClick = () => {
    console.log('Emoji clicked - would open emoji picker');
  };

  const handleAttachmentClick = () => {
    console.log('Attachment clicked - would open file picker');
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  const handleMinimizeClick = () => {
    console.log('Minimize clicked');
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat? This action cannot be undone.')) {
      clearMessages();
    }
  };

  const handleExportChat = () => {
    exportChatHistory();
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div 
      className="flex flex-col h-screen sm:h-auto sm:max-h-[600px] w-full shadow-2xl rounded-none sm:rounded-3xl overflow-hidden transition-all duration-300 ease-out"
      style={{ 
        backgroundColor: 'var(--background)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05), 0 0 100px rgba(59, 130, 246, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Header */}
      <Header
        isOnline={true}
        onSettingsClick={handleSettingsClick}
        onMinimizeClick={handleMinimizeClick}
        onClearChatClick={handleClearChat}
        onExportChat={handleExportChat}
        onSearchChange={handleSearchChange}
        threadId={threadId}
      />

      {/* Messages Area */}
      <div 
        className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 sm:py-4 space-y-1 transition-colors duration-300"
        style={{ backgroundColor: 'var(--chat-bg)' }}
      >
        {filteredMessages.map((message) => (
          <Message
            key={message.id}
            id={message.id}
            role={message.role}
            content={message.content}
            timestamp={message.timestamp}
            quickReplies={message.quickReplies}
            onQuickReply={handleQuickReply}
            isError={message.content.includes('⚠️')}
            searchQuery={searchQuery}
            deliveryStatus={message.deliveryStatus}
          />
        ))}
        
        {/* Typing indicator */}
        {isLoading && <TypingIndicator />}
        
        {/* Error retry button */}
        {error && !isLoading && (
          <div className="flex justify-center mb-4">
            <button
              onClick={retryLastMessage}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm"
            >
              Retry Last Message
            </button>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-3 sm:px-4 py-3 sm:py-4" style={{ backgroundColor: 'var(--input-bg)' }}>
        <MessageInput
          onSendMessage={handleSendMessage}
          disabled={isLoading}
          isLoading={isLoading}
          placeholder="🌤️ Ask about the weather..."
          onEmojiClick={handleEmojiClick}
          onAttachmentClick={handleAttachmentClick}
        />
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onClearChat={handleClearChat}
      />
    </div>
  );
};

export default ChatWindow;
