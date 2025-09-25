'use client';

import React, { useEffect, useRef } from 'react';
import { IoCloseOutline, IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';
import { useTheme, ColorPalette } from '../hooks/useTheme';
import { useNotificationSound } from '../hooks/useNotificationSound';
import { useChatTheme } from '../hooks/useChatTheme';
import ChatThemes from './ChatThemes';

export interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClearChat: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onClearChat }) => {
  const { colorPalette, toggleTheme, setColorPalette, isDark } = useTheme();
  const { isEnabled: soundEnabled, toggleSound } = useNotificationSound();
  const { currentTheme, changeTheme } = useChatTheme();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 focus:outline-none max-h-[80vh] overflow-y-auto"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Settings
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close settings"
          >
            <IoCloseOutline className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Settings Options */}
        <div className="space-y-6">
          {/* Theme Selection */}
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Theme
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Choose your preferred theme
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => !isDark && toggleTheme()}
                className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all ${
                  !isDark 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
                    : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <IoSunnyOutline className="w-4 h-4" />
                  <span className="text-sm font-medium">Light</span>
                </div>
              </button>
              <button
                onClick={() => isDark && toggleTheme()}
                className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all ${
                  isDark 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
                    : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <IoMoonOutline className="w-4 h-4" />
                  <span className="text-sm font-medium">Dark</span>
                </div>
              </button>
            </div>
          </div>

          {/* Color Palette Selection */}
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Color Palette
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Choose your preferred color scheme
              </p>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {(['blue', 'green', 'purple', 'red', 'orange', 'pink', 'indigo', 'teal'] as ColorPalette[]).map((palette) => (
                <button
                  key={palette}
                  onClick={() => setColorPalette(palette)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    colorPalette === palette
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <div 
                      className="w-6 h-6 rounded-full"
                      style={{ 
                        backgroundColor: palette === 'blue' ? '#3b82f6' :
                                        palette === 'green' ? '#10b981' :
                                        palette === 'purple' ? '#8b5cf6' :
                                        palette === 'red' ? '#ef4444' :
                                        palette === 'orange' ? '#f97316' :
                                        palette === 'pink' ? '#ec4899' :
                                        palette === 'indigo' ? '#6366f1' :
                                        '#14b8a6'
                      }}
                    />
                    <span className="text-xs font-medium capitalize text-gray-700 dark:text-gray-300">
                      {palette}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Sound Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Notifications
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Play sound for new messages
              </p>
            </div>
            <button
              onClick={toggleSound}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                soundEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
              }`}
              aria-label={`${soundEnabled ? 'Disable' : 'Enable'} notification sound`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  soundEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Chat Themes */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <ChatThemes 
              currentTheme={currentTheme}
              onThemeChange={changeTheme}
            />
          </div>

          {/* Clear Chat */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Clear Chat
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Delete all conversation history
                </p>
              </div>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear the chat? This action cannot be undone.')) {
                    onClearChat();
                    onClose();
                  }
                }}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
