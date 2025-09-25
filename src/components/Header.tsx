'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  IoSettingsOutline, 
  IoChevronDownOutline, 
  IoTrashOutline, 
  IoSunnyOutline, 
  IoMoonOutline,
  IoDownloadOutline,
  IoSearchOutline,
  IoVolumeHighOutline,
  IoVolumeMuteOutline
} from 'react-icons/io5';
import { WiDaySunny } from 'react-icons/wi';
import { useTheme } from '../hooks/useTheme';
import { useNotificationSound } from '../hooks/useNotificationSound';

export interface HeaderProps {
  isOnline?: boolean;
  onSettingsClick?: () => void;
  onMinimizeClick?: () => void;
  onClearChatClick?: () => void;
  onExportChat?: () => void;
  onSearchChange?: (query: string) => void;
  threadId?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  isOnline = true, 
  onSettingsClick,
  onMinimizeClick,
  onClearChatClick,
  onExportChat,
  onSearchChange,
  threadId
}) => {
  const { toggleTheme, isDark } = useTheme();
  const { isEnabled: soundEnabled, toggleSound } = useNotificationSound();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange?.(query);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSearch(false);
      setSearchQuery('');
      onSearchChange?.('');
    }
  };
  return (
    <div 
      className="flex items-center justify-between px-3 sm:px-4 py-3 rounded-t-none sm:rounded-t-lg transition-colors duration-300"
      style={{ 
        background: 'linear-gradient(to right, var(--primary), var(--primary-hover))',
        color: 'var(--header-text)'
      }}
    >
      {/* Left side - Avatar and Info */}
      <div className="flex items-center space-x-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <WiDaySunny className="w-6 h-6 text-yellow-300" />
                    </div>
        
        {/* Title and Status */}
        <div className="flex flex-col">
          <h1 className="text-base sm:text-lg font-semibold">Weather Agent</h1>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-gray-400'}`}></div>
            <span 
              className="text-xs sm:text-sm"
              style={{ color: 'var(--header-subtext)' }}
            >
              {isOnline ? 'Online' : 'Offline'}
            </span>
            {threadId && threadId.length > 0 && (
              <span 
                className="text-xs ml-1 sm:ml-2 hidden sm:inline"
                style={{ color: 'var(--header-subtext)' }}
              >
                ID: {threadId.slice(-8)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Center - Search Bar (when active) */}
      {showSearch && (
        <div className="flex-1 max-w-xs mx-4">
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search messages..."
              className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 bg-white/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
            />
            <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          </div>
        </div>
      )}

      {/* Right side - Action Buttons */}
      <div className="flex items-center space-x-0.5 sm:space-x-1">
        {/* Search Button */}
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="p-1.5 sm:p-2 rounded-full hover:bg-white/20 transition-all duration-200 transform hover:scale-110 active:scale-95"
          aria-label="Search messages"
          title="Search messages"
        >
          <IoSearchOutline className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-1.5 sm:p-2 rounded-full hover:bg-white/20 transition-all duration-200 transform hover:scale-110 active:scale-95"
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          {isDark ? <IoSunnyOutline className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <IoMoonOutline className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
        </button>

        {/* Sound Toggle Button */}
        <button
          onClick={toggleSound}
          className="p-1.5 sm:p-2 rounded-full hover:bg-white/20 transition-all duration-200 transform hover:scale-110 active:scale-95"
          aria-label={`${soundEnabled ? 'Disable' : 'Enable'} notification sound`}
          title={`${soundEnabled ? 'Disable' : 'Enable'} notification sound`}
        >
          {soundEnabled ? <IoVolumeHighOutline className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <IoVolumeMuteOutline className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
        </button>

        {/* Export Chat Button */}
        <button
          onClick={onExportChat}
          className="p-1.5 sm:p-2 rounded-full hover:bg-white/20 transition-all duration-200 transform hover:scale-110 active:scale-95"
          aria-label="Export chat history"
          title="Export chat history"
        >
          <IoDownloadOutline className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        {/* Clear Chat Button */}
        <button
          onClick={onClearChatClick}
          className="p-1.5 sm:p-2 rounded-full bg-gray-500/20 hover:bg-red-500/30 transition-all duration-200 transform hover:scale-110 active:scale-95"
          aria-label="Clear chat"
          title="Clear chat"
        >
          <IoTrashOutline className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-200 hover:text-red-100" />
        </button>
        
        {/* Settings Button */}
        <button
          onClick={onSettingsClick}
          className="p-1.5 sm:p-2 rounded-full hover:bg-white/20 transition-all duration-200 transform hover:scale-110 active:scale-95"
          aria-label="Settings"
          title="Settings"
        >
          <IoSettingsOutline className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        
        {/* Minimize Button */}
        <button
          onClick={onMinimizeClick}
          className="p-1.5 sm:p-2 rounded-full hover:bg-white/20 transition-all duration-200 transform hover:scale-110 active:scale-95"
          aria-label="Minimize chat"
          title="Minimize chat"
        >
          <IoChevronDownOutline className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

export default Header;
