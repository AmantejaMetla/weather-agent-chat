'use client';

import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

interface EmojiPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onEmojiSelect: (emoji: string) => void;
}

const emojiCategories = [
  {
    name: 'Weather',
    emojis: ['🌤️', '☀️', '⛅', '🌧️', '⛈️', '❄️', '🌪️', '🌈', '🌡️', '💨', '🌊', '🌫️']
  },
  {
    name: 'Nature',
    emojis: ['🌸', '🌺', '🌻', '🌷', '🌹', '🌿', '🍀', '🌱', '🌳', '🌲', '🌵', '🌾']
  },
  {
    name: 'Faces',
    emojis: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊']
  },
  {
    name: 'Objects',
    emojis: ['📱', '💻', '⌚', '📷', '🎵', '🎮', '📚', '✏️', '📝', '📋', '📊', '📈']
  },
  {
    name: 'Symbols',
    emojis: ['❤️', '💙', '💚', '💛', '🧡', '💜', '🖤', '🤍', '💯', '✨', '⭐', '🌟']
  }
];

const EmojiPicker: React.FC<EmojiPickerProps> = ({ isOpen, onClose, onEmojiSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  if (!isOpen) return null;

  const handleEmojiClick = (emoji: string) => {
    onEmojiSelect(emoji);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-sm w-full max-h-[60vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Choose Emoji
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <IoCloseOutline className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {emojiCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(index)}
              className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                selectedCategory === index
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Emoji Grid */}
        <div className="p-4 max-h-[40vh] overflow-y-auto">
          <div className="grid grid-cols-6 gap-2">
            {emojiCategories[selectedCategory].emojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleEmojiClick(emoji)}
                className="w-10 h-10 flex items-center justify-center text-2xl rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title={emoji}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmojiPicker;
