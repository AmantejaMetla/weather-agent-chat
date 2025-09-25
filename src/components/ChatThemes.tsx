'use client';

import React from 'react';

export interface ChatTheme {
  id: string;
  name: string;
  description: string;
  background: string;
  particles: boolean;
  animation: string;
}

const themes: ChatTheme[] = [
  {
    id: 'pokeball',
    name: 'Pokéball Dots',
    description: 'Animated pokéball dots floating around',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    particles: true,
    animation: 'pokeball'
  },
  {
    id: 'matrix',
    name: 'Matrix Rain',
    description: 'Falling green code like Matrix',
    background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%)',
    particles: true,
    animation: 'matrix'
  },
  {
    id: 'sakura',
    name: 'Sakura Petals',
    description: 'Falling cherry blossom petals',
    background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    particles: true,
    animation: 'sakura'
  },
  {
    id: 'stars',
    name: 'Starry Night',
    description: 'Twinkling stars in the night sky',
    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    particles: true,
    animation: 'stars'
  },
  {
    id: 'fire',
    name: 'Fire Embers',
    description: 'Floating fire embers and sparks',
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
    particles: true,
    animation: 'fire'
  },
  {
    id: 'ocean',
    name: 'Ocean Waves',
    description: 'Gentle ocean waves and bubbles',
    background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
    particles: true,
    animation: 'ocean'
  }
];

interface ChatThemesProps {
  currentTheme: string;
  onThemeChange: (themeId: string) => void;
}

const ChatThemes: React.FC<ChatThemesProps> = ({ currentTheme, onThemeChange }) => {

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Chat Themes</h3>
      <div className="grid grid-cols-2 gap-3">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onThemeChange(theme.id)}
            className={`p-3 rounded-lg border-2 transition-all duration-200 ${
              currentTheme === theme.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
            }`}
            style={{
              background: currentTheme === theme.id ? theme.background : undefined
            }}
          >
            <div className="text-left">
              <div className="font-medium text-sm text-gray-900 dark:text-white">
                {theme.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {theme.description}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatThemes;
