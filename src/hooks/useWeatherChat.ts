'use client';

import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

export interface WeatherMessage {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
  quickReplies?: Array<{ id: string; text: string; value?: string }>;
  deliveryStatus?: 'sent' | 'delivered';
}

export interface UseWeatherChatReturn {
  messages: WeatherMessage[];
  isLoading: boolean;
  error: string | null;
  threadId: string;
  addMessage: (content: string, role: 'user' | 'agent', quickReplies?: Array<{ id: string; text: string; value?: string }>, deliveryStatus?: 'sent' | 'delivered') => void;
  clearMessages: () => void;
  sendMessage: (content: string) => Promise<void>;
  retryLastMessage: () => Promise<void>;
  exportChatHistory: () => void;
}

const API_URL = 'https://millions-screeching-vultur.mastra.cloud/api/agents/weatherAgent/stream';

const generateThreadId = (): string => {
  return `thread_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const STORAGE_KEY_MESSAGES = 'weather-agent-messages';
const STORAGE_KEY_THREAD = 'weather-agent-thread';

const loadMessages = (): WeatherMessage[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY_MESSAGES);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((msg: { id: string; role: 'user' | 'agent'; content: string; timestamp: string; quickReplies?: Array<{ id: string; text: string; value?: string }>; deliveryStatus?: 'sent' | 'delivered' }) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    }
  } catch (error) {
    console.error('Error loading messages from localStorage:', error);
  }
  return [];
};

const saveMessages = (messages: WeatherMessage[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages));
  } catch (error) {
    console.error('Error saving messages to localStorage:', error);
  }
};

const loadThreadId = (): string => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(STORAGE_KEY_THREAD) || generateThreadId();
};

const saveThreadId = (threadId: string) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_THREAD, threadId);
};

export const useWeatherChat = (): UseWeatherChatReturn => {
  const [messages, setMessages] = useState<WeatherMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [threadId, setThreadId] = useState<string>('');
  const [lastUserMessage, setLastUserMessage] = useState<string>('');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize on client side only
  useEffect(() => {
    if (typeof window !== 'undefined' && !isInitialized) {
      const savedMessages = loadMessages();
      const savedThreadId = loadThreadId();
      
      if (savedMessages.length > 0) {
        setMessages(savedMessages);
      } else {
        // Add welcome message
        const welcomeMessage: WeatherMessage = {
          id: generateThreadId(),
          role: 'agent',
          content: 'Hi there! 👋 I\'m your Weather Agent 🌤️✨ I can help you get current weather information, forecasts, and answer weather-related questions. What would you like to know? 🌈',
          timestamp: new Date(),
          quickReplies: [
            { id: '1', text: '🌡️ Current weather', value: 'current' },
            { id: '2', text: '📅 5-day forecast', value: 'forecast' },
            { id: '3', text: '⚠️ Weather alerts', value: 'alerts' }
          ]
        };
        setMessages([welcomeMessage]);
        saveMessages([welcomeMessage]);
      }
      
      setThreadId(savedThreadId);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (isInitialized && messages.length > 0) {
      saveMessages(messages);
    }
  }, [messages, isInitialized]);

  // Save threadId to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized && threadId) {
      saveThreadId(threadId);
    }
  }, [threadId, isInitialized]);

  const addMessage = useCallback((
    content: string, 
    role: 'user' | 'agent', 
    quickReplies?: Array<{ id: string; text: string; value?: string }>,
    deliveryStatus?: 'sent' | 'delivered'
  ) => {
    const newMessage: WeatherMessage = {
      id: generateThreadId(),
      role,
      content,
      timestamp: new Date(),
      quickReplies,
      deliveryStatus
    };

    setMessages(prev => [...prev, newMessage]);
  }, []);

  const clearMessages = useCallback(() => {
    const newThreadId = generateThreadId();
    setThreadId(newThreadId);
    setError(null);
    
    const welcomeMessage: WeatherMessage = {
      id: generateThreadId(),
      role: 'agent',
      content: 'Hi there! 👋 I\'m your Weather Agent 🌤️✨ I can help you get current weather information, forecasts, and answer weather-related questions. What would you like to know? 🌈',
      timestamp: new Date(),
      quickReplies: [
        { id: '1', text: '🌡️ Current weather', value: 'current' },
        { id: '2', text: '📅 5-day forecast', value: 'forecast' },
        { id: '3', text: '⚠️ Weather alerts', value: 'alerts' }
      ]
    };
    
    setMessages([welcomeMessage]);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading || !threadId) return;

    // Clear any previous errors
    setError(null);
    
    // Add user message immediately with 'sent' status
    addMessage(content, 'user', undefined, 'sent');
    setLastUserMessage(content);
    setIsLoading(true);

    try {
      const response = await axios.post(API_URL, {
        messages: [{ role: 'user', content }],
        runId: 'weatherAgent',
        maxRetries: 2,
        maxSteps: 5,
        temperature: 0.5,
        topP: 1,
        runtimeContext: {},
        threadId: "22-COMPB02-26", // Your college roll number
        resourceId: 'weatherAgent'
      }, {
        headers: {
          'x-mastra-dev-playground': 'true',
          'Content-Type': 'application/json'
        },
        timeout: 30000
      });

      // Handle streaming response
      if (response.data) {
        let agentResponse = '';
        
        // Handle different response formats
        if (typeof response.data === 'string') {
          try {
            const parsed = JSON.parse(response.data);
            if (parsed.content) {
              agentResponse = parsed.content;
            } else if (parsed.message) {
              agentResponse = parsed.message;
            } else {
              agentResponse = response.data;
            }
          } catch {
            agentResponse = response.data;
          }
        } 
        else if (response.data.content) {
          agentResponse = response.data.content;
        }
        else if (response.data.messages && response.data.messages.length > 0) {
          agentResponse = response.data.messages[response.data.messages.length - 1].content || '';
        }
        else if (response.data.message) {
          agentResponse = response.data.message;
        }
        else if (response.data.choices && response.data.choices.length > 0) {
          agentResponse = response.data.choices[0].message?.content || '';
        }
        else {
          agentResponse = JSON.stringify(response.data);
        }

                    // Clean up the response (remove any streaming artifacts)
                    let cleanResponse = agentResponse;

                    // Remove all tool call data and metadata but preserve word spacing
                    cleanResponse = cleanResponse
                      .replace(/f:\{[^}]*\}/g, ' ') // Remove f:{"messageId":"..."} patterns
                      .replace(/e:\{[^}]*\}/g, ' ') // Remove e:{"finishReason":"..."} patterns
                      .replace(/d:\{[^}]*\}/g, ' ') // Remove d:{"finishReason":"..."} patterns
                      .replace(/\d+:\{[^}]*\}/g, ' ') // Remove tool call patterns like 9:{toolCallId:...}
                      .replace(/a:\{[^}]*\}/g, ' ') // Remove a:{toolCallId:...} patterns
                      .replace(/toolCallId:[^,}]*/g, ' ') // Remove toolCallId:... patterns
                      .replace(/result:\{[^}]*\}/g, ' ') // Remove result:{...} patterns
                      .replace(/temperature:[^,}]*/g, ' ') // Remove temperature:... patterns
                      .replace(/feelsLike:[^,}]*/g, ' ') // Remove feelsLike:... patterns
                      .replace(/humidity:[^,}]*/g, ' ') // Remove humidity:... patterns
                      .replace(/windSpeed:[^,}]*/g, ' ') // Remove windSpeed:... patterns
                      .replace(/windGust:[^,}]*/g, ' ') // Remove windGust:... patterns
                      .replace(/cond[^,}]*/g, ' ') // Remove cond... patterns
                      .replace(/location:[^,}]*/g, ' ') // Remove location:... patterns
                      .replace(/[{}]/g, ' ') // Remove remaining braces
                      .replace(/,/g, ' ') // Remove commas
                      .replace(/isContinued\s*:\s*false/g, '') // Remove isContinued:false patterns
                      .replace(/isContinued:false/g, '') // Remove isContinued:false patterns
                      .replace(/\d+:"/g, ' ') // Remove all number:" patterns like 0:", 1:", etc.
                      .replace(/"\s*/g, ' ') // Remove all quotes and following spaces
                      .replace(/\\"/g, '"') // Unescape quotes
                      .replace(/\\n/g, '\n') // Convert newlines
                      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
                      .replace(/^\s+/, '') // Remove leading spaces
                      .replace(/\s+$/, '') // Remove trailing spaces
                      .trim();
        
        // If the response is too short or contains only technical data, try to extract meaningful text
        if (cleanResponse.length < 10 || cleanResponse.includes('toolCallId') || cleanResponse.includes('result:')) {
          // Look for natural language patterns in the original response
          const naturalLanguageMatch = agentResponse.match(/(?:The current weather|The weather|It's|It is|Currently|Today|Right now)[^}]*/i);
          if (naturalLanguageMatch) {
            cleanResponse = naturalLanguageMatch[0]
              .replace(/[{}]/g, ' ')
              .replace(/,/g, ' ')
              .replace(/\s+/g, ' ')
              .trim();
          } else {
            // Fallback: create a generic response
            cleanResponse = "I've retrieved the weather information for you. The current conditions are available, but I'm having trouble formatting the response properly. Please try asking again.";
          }
        }
        
        agentResponse = cleanResponse;

        // Add agent response
        if (agentResponse.trim()) {
          addMessage(agentResponse, 'agent', [
            { id: '1', text: '💬 Tell me more', value: 'more' },
            { id: '2', text: '👍 That\'s helpful', value: 'helpful' }
          ]);
          
          // Update user message delivery status to 'delivered'
          setMessages(prev => prev.map(msg => 
            msg.role === 'user' && msg.deliveryStatus === 'sent' 
              ? { ...msg, deliveryStatus: 'delivered' as const }
              : msg
          ));
        } else {
          addMessage('I received your message but couldn\'t process it properly. Please try again.', 'agent');
        }
      } else {
        addMessage('I received your message but couldn\'t process it properly. Please try again.', 'agent');
      }
    } catch (err: unknown) {
      console.error('Weather API Error:', err);
      
      let errorMessage = '⚠️ Something went wrong, try again';
      
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response?: { status?: number } };
        if (axiosError.response?.status === 429) {
          errorMessage = '⚠️ Too many requests, please wait a moment and try again';
        } else if (axiosError.response?.status && axiosError.response.status >= 500) {
          errorMessage = '⚠️ Server error, please try again later';
        }
      } else if (err && typeof err === 'object' && 'code' in err) {
        const networkError = err as { code?: string; message?: string };
        if (networkError.code === 'ECONNABORTED') {
          errorMessage = '⚠️ Request timeout, please try again';
        } else if (networkError.message?.includes('Network Error')) {
          errorMessage = '⚠️ Network error, please check your connection';
        }
      }
      
      setError(errorMessage);
      addMessage(errorMessage, 'agent');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, threadId, addMessage]);

  const retryLastMessage = useCallback(async () => {
    if (lastUserMessage && !isLoading) {
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.content.includes('⚠️'));
        return filtered;
      });
      
      await sendMessage(lastUserMessage);
    }
  }, [lastUserMessage, isLoading, sendMessage]);

  const exportChatHistory = useCallback(() => {
    const chatContent = messages.map(msg => {
      const timestamp = msg.timestamp.toLocaleString();
      const role = msg.role === 'user' ? 'User' : 'Agent';
      return `[${timestamp}] [${role}] ${msg.content}`;
    }).join('\n\n');

    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `weather-agent-chat-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [messages]);

  return {
    messages,
    isLoading,
    error,
    threadId,
    addMessage,
    clearMessages,
    sendMessage,
    retryLastMessage,
    exportChatHistory
  };
};