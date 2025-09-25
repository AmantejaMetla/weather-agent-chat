'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
  quickReplies?: Array<{ id: string; text: string; value?: string }>;
}

export interface UseMessagesReturn {
  messages: Message[];
  threadId: string;
  isLoading: boolean;
  addMessage: (content: string, role: 'user' | 'agent', quickReplies?: Array<{ id: string; text: string; value?: string }>) => void;
  clearMessages: () => void;
  setLoading: (loading: boolean) => void;
}

const STORAGE_KEY = 'weather-agent-messages';
const THREAD_KEY = 'weather-agent-thread';

// Generate a new thread ID (using timestamp + random for uniqueness)
const generateThreadId = (): string => {
  return `thread_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Get initial thread ID from localStorage or generate new one
const getInitialThreadId = (): string => {
  if (typeof window === 'undefined') return generateThreadId();
  
  const stored = localStorage.getItem(THREAD_KEY);
  return stored || generateThreadId();
};

// Load messages from localStorage
const loadMessagesFromStorage = (): Message[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert timestamp strings back to Date objects
      return parsed.map((msg: { id: string; role: 'user' | 'agent'; content: string; timestamp: string; quickReplies?: Array<{ id: string; text: string; value?: string }> }) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    }
  } catch (error) {
    console.error('Error loading messages from localStorage:', error);
  }
  
  return [];
};

// Save messages to localStorage
const saveMessagesToStorage = (messages: Message[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (error) {
    console.error('Error saving messages to localStorage:', error);
  }
};

// Save thread ID to localStorage
const saveThreadIdToStorage = (threadId: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(THREAD_KEY, threadId);
  } catch (error) {
    console.error('Error saving thread ID to localStorage:', error);
  }
};

export const useMessages = (): UseMessagesReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [threadId, setThreadId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize messages and thread ID on mount
  useEffect(() => {
    const initialThreadId = getInitialThreadId();
    const initialMessages = loadMessagesFromStorage();
    
    setThreadId(initialThreadId);
    setMessages(initialMessages);
    
    // If no messages exist, add welcome message
    if (initialMessages.length === 0) {
      const welcomeMessage: Message = {
        id: generateThreadId(),
        role: 'agent',
        content: 'Hi there! I\'m your Weather Agent 🌤️ I can help you get current weather information, forecasts, and answer weather-related questions. What would you like to know?',
        timestamp: new Date(),
        quickReplies: [
          { id: '1', text: 'Current weather', value: 'current' },
          { id: '2', text: '5-day forecast', value: 'forecast' },
          { id: '3', text: 'Weather alerts', value: 'alerts' }
        ]
      };
      
      setMessages([welcomeMessage]);
      saveMessagesToStorage([welcomeMessage]);
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      saveMessagesToStorage(messages);
    }
  }, [messages]);

  const addMessage = useCallback((
    content: string, 
    role: 'user' | 'agent', 
    quickReplies?: Array<{ id: string; text: string; value?: string }>
  ) => {
    const newMessage: Message = {
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      role,
      content,
      timestamp: new Date(),
      quickReplies
    };

    setMessages(prev => [...prev, newMessage]);
  }, []);

  const clearMessages = useCallback(() => {
    // Generate new thread ID
    const newThreadId = generateThreadId();
    setThreadId(newThreadId);
    saveThreadIdToStorage(newThreadId);
    
    // Clear messages and add welcome message
    const welcomeMessage: Message = {
      id: generateThreadId(),
      role: 'agent',
      content: 'Hi there! I\'m your Weather Agent 🌤️ I can help you get current weather information, forecasts, and answer weather-related questions. What would you like to know?',
      timestamp: new Date(),
      quickReplies: [
        { id: '1', text: 'Current weather', value: 'current' },
        { id: '2', text: '5-day forecast', value: 'forecast' },
        { id: '3', text: 'Weather alerts', value: 'alerts' }
      ]
    };
    
    setMessages([welcomeMessage]);
    saveMessagesToStorage([welcomeMessage]);
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  return {
    messages,
    threadId,
    isLoading,
    addMessage,
    clearMessages,
    setLoading
  };
};
