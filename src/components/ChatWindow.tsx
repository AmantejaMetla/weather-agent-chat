'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import Header from './Header';
import TypingIndicator from './TypingIndicator';
import SettingsModal from './SettingsModal';
import { useWeatherChat } from '../hooks/useWeatherChat';
import { useNotificationSound } from '../hooks/useNotificationSound';
import { useChatTheme } from '../hooks/useChatTheme';

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
  const { currentTheme } = useChatTheme();
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

  const getChatThemeBackground = () => {
    switch (currentTheme) {
      case 'pokeball':
        return {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          particles: '⚪',
          particleColor: '#ff0000'
        };
      case 'matrix':
        return {
          background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%)',
          particles: '01010101',
          particleColor: '#00ff00'
        };
      case 'sakura':
        return {
          background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
          particles: '🌸',
          particleColor: '#ff69b4'
        };
      case 'stars':
        return {
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          particles: '✨',
          particleColor: '#ffff00'
        };
      case 'fire':
        return {
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
          particles: '🔥',
          particleColor: '#ff4500'
        };
      case 'ocean':
        return {
          background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
          particles: '💧',
          particleColor: '#00bfff'
        };
      default:
        return {
          background: 'var(--chat-bg)',
          particles: '',
          particleColor: ''
        };
    }
  };

  const chatTheme = getChatThemeBackground();

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
        className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 sm:py-4 space-y-1 transition-colors duration-300 relative"
        style={{ 
          background: chatTheme.background,
          position: 'relative'
        }}
      >
        {/* Theme Particles Overlay */}
        {currentTheme !== 'default' && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: '20px',
                  color: chatTheme.particleColor,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${10 + Math.random() * 20}s`,
                  fontFamily: currentTheme === 'matrix' ? 'monospace' : 'inherit'
                }}
              >
                {currentTheme === 'matrix' ? String.fromCharCode(0x30A0 + Math.random() * 96) : chatTheme.particles}
              </div>
            ))}
          </div>
        )}
        
        {/* Messages Content */}
        <div className="relative z-10">
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
