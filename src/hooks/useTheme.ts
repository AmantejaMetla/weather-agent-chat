'use client';

import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';
export type ColorPalette = 'blue' | 'green' | 'purple' | 'red' | 'orange' | 'pink' | 'indigo' | 'teal';

export interface UseThemeReturn {
  theme: Theme;
  colorPalette: ColorPalette;
  toggleTheme: () => void;
  setColorPalette: (palette: ColorPalette) => void;
  isDark: boolean;
}

const THEME_STORAGE_KEY = 'weather-agent-theme';
const COLOR_PALETTE_STORAGE_KEY = 'weather-agent-color-palette';

const colorPalettes = {
  blue: {
    light: {
      primary: '#3b82f6',
      primaryHover: '#2563eb',
      background: '#ffffff',
      foreground: '#1f2937',
      chatBg: '#f9fafb',
      messageUserBg: '#3b82f6',
      messageAgentBg: '#f3f4f6',
      messageText: '#1f2937',
      messageUserText: '#ffffff',
      inputBg: '#ffffff',
      borderColor: '#e5e7eb',
      headerBg: '#2563eb',
      headerText: '#ffffff',
      headerSubtext: '#dbeafe',
      statusOnline: '#10b981',
      statusOffline: '#6b7280',
      searchHighlight: '#fef3c7'
    },
    dark: {
      primary: '#3b82f6',
      primaryHover: '#1d4ed8',
      background: '#0f172a',
      foreground: '#f1f5f9',
      chatBg: '#1e293b',
      messageUserBg: '#3b82f6',
      messageAgentBg: '#334155',
      messageText: '#e2e8f0',
      messageUserText: '#ffffff',
      inputBg: '#ffffff',
      borderColor: '#475569',
      headerBg: '#1e40af',
      headerText: '#ffffff',
      headerSubtext: '#dbeafe',
      statusOnline: '#10b981',
      statusOffline: '#6b7280',
      searchHighlight: '#fbbf24'
    }
  },
  green: {
    light: {
      primary: '#10b981',
      primaryHover: '#059669',
      background: '#ffffff',
      foreground: '#171717',
      chatBg: '#f0fdf4',
      messageUserBg: '#10b981',
      messageAgentBg: '#f0fdf4',
      messageText: '#1f2937',
      messageUserText: '#ffffff',
      inputBg: '#ffffff',
      borderColor: '#d1fae5',
      headerBg: '#059669',
      headerText: '#ffffff',
      headerSubtext: '#a7f3d0',
      statusOnline: '#10b981',
      statusOffline: '#6b7280',
      searchHighlight: '#fef3c7'
    },
    dark: {
      primary: '#10b981',
      primaryHover: '#047857',
      background: '#0f172a',
      foreground: '#f1f5f9',
      chatBg: '#1e293b',
      messageUserBg: '#10b981',
      messageAgentBg: '#334155',
      messageText: '#e2e8f0',
      messageUserText: '#ffffff',
      inputBg: '#334155',
      borderColor: '#475569',
      headerBg: '#047857',
      headerText: '#ffffff',
      headerSubtext: '#a7f3d0',
      statusOnline: '#10b981',
      statusOffline: '#6b7280',
      searchHighlight: '#fbbf24'
    }
  },
  purple: {
    light: {
      primary: '#8b5cf6',
      primaryHover: '#7c3aed',
      background: '#ffffff',
      foreground: '#171717',
      chatBg: '#faf5ff',
      messageUserBg: '#8b5cf6',
      messageAgentBg: '#f3e8ff',
      messageText: '#1f2937',
      messageUserText: '#ffffff',
      inputBg: '#ffffff',
      borderColor: '#e9d5ff',
      headerBg: '#7c3aed',
      headerText: '#ffffff',
      headerSubtext: '#ddd6fe',
      statusOnline: '#10b981',
      statusOffline: '#6b7280',
      searchHighlight: '#fef3c7'
    },
    dark: {
      primary: '#8b5cf6',
      primaryHover: '#6d28d9',
      background: '#0f172a',
      foreground: '#f1f5f9',
      chatBg: '#1e293b',
      messageUserBg: '#8b5cf6',
      messageAgentBg: '#334155',
      messageText: '#e2e8f0',
      messageUserText: '#ffffff',
      inputBg: '#334155',
      borderColor: '#475569',
      headerBg: '#6d28d9',
      headerText: '#ffffff',
      headerSubtext: '#ddd6fe',
      statusOnline: '#10b981',
      statusOffline: '#6b7280',
      searchHighlight: '#fbbf24'
    }
  },
  red: {
    light: {
      primary: '#ef4444',
      primaryHover: '#dc2626',
      background: '#ffffff',
      foreground: '#171717',
      chatBg: '#fef2f2',
      messageUserBg: '#ef4444',
      messageAgentBg: '#fef2f2',
      messageText: '#1f2937',
      messageUserText: '#ffffff',
      inputBg: '#ffffff',
      borderColor: '#fecaca',
      headerBg: '#dc2626',
      headerText: '#ffffff',
      headerSubtext: '#fecaca',
      statusOnline: '#10b981',
      statusOffline: '#6b7280',
      searchHighlight: '#fef3c7'
    },
    dark: {
      primary: '#ef4444',
      primaryHover: '#b91c1c',
      background: '#0f172a',
      foreground: '#f1f5f9',
      chatBg: '#1e293b',
      messageUserBg: '#ef4444',
      messageAgentBg: '#334155',
      messageText: '#e2e8f0',
      messageUserText: '#ffffff',
      inputBg: '#334155',
      borderColor: '#475569',
      headerBg: '#b91c1c',
      headerText: '#ffffff',
      headerSubtext: '#fecaca',
      statusOnline: '#10b981',
      statusOffline: '#6b7280',
      searchHighlight: '#fbbf24'
    }
  },
  orange: {
    light: {
      primary: '#f97316',
      primaryHover: '#ea580c',
      background: '#ffffff',
      foreground: '#171717',
      chatBg: '#fff7ed',
      messageUserBg: '#f97316',
      messageAgentBg: '#fff7ed',
      messageText: '#1f2937',
      messageUserText: '#ffffff',
      inputBg: '#ffffff',
      borderColor: '#fed7aa',
      headerBg: '#ea580c',
      headerText: '#ffffff',
      headerSubtext: '#fed7aa',
      statusOnline: '#10b981',
      statusOffline: '#6b7280',
      searchHighlight: '#fef3c7'
    },
    dark: {
      primary: '#f97316',
      primaryHover: '#c2410c',
      background: '#0f172a',
      foreground: '#f1f5f9',
      chatBg: '#1e293b',
      messageUserBg: '#f97316',
      messageAgentBg: '#334155',
      messageText: '#e2e8f0',
      messageUserText: '#ffffff',
      inputBg: '#334155',
      borderColor: '#475569',
      headerBg: '#c2410c',
      headerText: '#ffffff',
      headerSubtext: '#fed7aa',
      statusOnline: '#10b981',
      statusOffline: '#6b7280',
      searchHighlight: '#fbbf24'
    }
  },
  pink: {
    light: {
      primary: '#ec4899',
      primaryHover: '#db2777',
      background: '#ffffff',
      foreground: '#171717',
      chatBg: '#fdf2f8',
      messageUserBg: '#ec4899',
      messageAgentBg: '#fdf2f8',
      messageText: '#1f2937',
      messageUserText: '#ffffff',
      inputBg: '#ffffff',
      borderColor: '#fce7f3',
      headerBg: '#db2777',
      headerText: '#ffffff',
      headerSubtext: '#fce7f3',
      statusOnline: '#10b981',
      statusOffline: '#6b7280',
      searchHighlight: '#fef3c7'
    },
    dark: {
      primary: '#ec4899',
      primaryHover: '#be185d',
      background: '#0f172a',
      foreground: '#f1f5f9',
      chatBg: '#1e293b',
      messageUserBg: '#ec4899',
      messageAgentBg: '#334155',
      messageText: '#e2e8f0',
      messageUserText: '#ffffff',
      inputBg: '#334155',
      borderColor: '#475569',
      headerBg: '#be185d',
      headerText: '#ffffff',
      headerSubtext: '#fce7f3',
      statusOnline: '#10b981',
      statusOffline: '#6b7280',
      searchHighlight: '#fbbf24'
    }
  },
  indigo: {
    light: {
      primary: '#6366f1',
      primaryHover: '#4f46e5',
      background: '#ffffff',
      foreground: '#171717',
      chatBg: '#eef2ff',
      messageUserBg: '#6366f1',
      messageAgentBg: '#eef2ff',
      messageText: '#1f2937',
      messageUserText: '#ffffff',
      inputBg: '#ffffff',
      borderColor: '#c7d2fe',
      headerBg: '#4f46e5',
      headerText: '#ffffff',
      headerSubtext: '#c7d2fe',
      statusOnline: '#10b981',
      statusOffline: '#6b7280',
      searchHighlight: '#fef3c7'
    },
    dark: {
      primary: '#6366f1',
      primaryHover: '#4338ca',
      background: '#0f172a',
      foreground: '#f1f5f9',
      chatBg: '#1e293b',
      messageUserBg: '#6366f1',
      messageAgentBg: '#334155',
      messageText: '#e2e8f0',
      messageUserText: '#ffffff',
      inputBg: '#334155',
      borderColor: '#475569',
      headerBg: '#4338ca',
      headerText: '#ffffff',
      headerSubtext: '#c7d2fe',
      statusOnline: '#10b981',
      statusOffline: '#6b7280',
      searchHighlight: '#fbbf24'
    }
  },
  teal: {
    light: {
      primary: '#14b8a6',
      primaryHover: '#0d9488',
      background: '#ffffff',
      foreground: '#171717',
      chatBg: '#f0fdfa',
      messageUserBg: '#14b8a6',
      messageAgentBg: '#f0fdfa',
      messageText: '#1f2937',
      messageUserText: '#ffffff',
      inputBg: '#ffffff',
      borderColor: '#ccfbf1',
      headerBg: '#0d9488',
      headerText: '#ffffff',
      headerSubtext: '#ccfbf1',
      statusOnline: '#10b981',
      statusOffline: '#6b7280',
      searchHighlight: '#fef3c7'
    },
    dark: {
      primary: '#14b8a6',
      primaryHover: '#0f766e',
      background: '#0f172a',
      foreground: '#f1f5f9',
      chatBg: '#1e293b',
      messageUserBg: '#14b8a6',
      messageAgentBg: '#334155',
      messageText: '#e2e8f0',
      messageUserText: '#ffffff',
      inputBg: '#334155',
      borderColor: '#475569',
      headerBg: '#0f766e',
      headerText: '#ffffff',
      headerSubtext: '#ccfbf1',
      statusOnline: '#10b981',
      statusOffline: '#6b7280',
      searchHighlight: '#fbbf24'
    }
  }
};

export const useTheme = (): UseThemeReturn => {
  const [theme, setTheme] = useState<Theme>('light');
  const [colorPalette, setColorPalette] = useState<ColorPalette>('blue');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !isInitialized) {
      // Use a timeout to ensure this runs after hydration
      const timer = setTimeout(() => {
        // Get theme from localStorage or default to light
        const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme;
        const storedColorPalette = localStorage.getItem(COLOR_PALETTE_STORAGE_KEY) as ColorPalette;
        
        let initialTheme: Theme = 'light';
        let initialColorPalette: ColorPalette = 'blue';
        
        if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
          initialTheme = storedTheme;
        } else {
          // Check system preference
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          initialTheme = prefersDark ? 'dark' : 'light';
        }
        
        if (storedColorPalette && Object.keys(colorPalettes).includes(storedColorPalette)) {
          initialColorPalette = storedColorPalette;
        }
        
        setTheme(initialTheme);
        setColorPalette(initialColorPalette);
        setIsInitialized(true);
        
        // Apply theme immediately to prevent flash
        applyTheme(initialTheme, initialColorPalette);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      applyTheme(theme, colorPalette);
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      localStorage.setItem(COLOR_PALETTE_STORAGE_KEY, colorPalette);
    }
  }, [theme, colorPalette, isInitialized]);

  const applyTheme = (currentTheme: Theme, currentPalette: ColorPalette) => {
    if (typeof window === 'undefined') return;
    
    const colors = colorPalettes[currentPalette][currentTheme];
    const root = document.documentElement;
    
    // Apply CSS variables with proper naming
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
    
    // Apply dark class
    if (currentTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Force a re-render by updating a data attribute
    root.setAttribute('data-theme', currentTheme);
    root.setAttribute('data-palette', currentPalette);
    
    // Also update the body class for additional specificity
    document.body.className = `${currentTheme} ${currentPalette}`;
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setColorPaletteHandler = (palette: ColorPalette) => {
    setColorPalette(palette);
  };

  return {
    theme,
    colorPalette,
    toggleTheme,
    setColorPalette: setColorPaletteHandler,
    isDark: theme === 'dark'
  };
};