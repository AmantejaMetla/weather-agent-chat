'use client';

import { useState, useEffect } from 'react';

const CHAT_THEME_STORAGE_KEY = 'weather-agent-chat-theme';

export const useChatTheme = () => {
  const [currentTheme, setCurrentTheme] = useState('default');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(CHAT_THEME_STORAGE_KEY);
      if (stored) {
        setCurrentTheme(stored);
      }
    }
  }, []);

  const changeTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    if (typeof window !== 'undefined') {
      localStorage.setItem(CHAT_THEME_STORAGE_KEY, themeId);
    }
  };

  return {
    currentTheme,
    changeTheme
  };
};
