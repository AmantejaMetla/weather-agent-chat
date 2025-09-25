'use client';

import { useCallback } from 'react';

export interface UseNotificationSoundReturn {
  playNotification: () => void;
  isEnabled: boolean;
  toggleSound: () => void;
}

const SOUND_ENABLED_KEY = 'weather-agent-sound-enabled';

export const useNotificationSound = (): UseNotificationSoundReturn => {
  const isEnabled = typeof window !== 'undefined' 
    ? localStorage.getItem(SOUND_ENABLED_KEY) !== 'false'
    : true;

  const playNotification = useCallback(() => {
    if (!isEnabled) return;

    try {
      // Try HTML5 audio first
      const audio = new Audio('/sounds/notification.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {
        // Fallback to Web Audio API if HTML5 audio fails
        if (typeof window !== 'undefined' && window.AudioContext) {
          const audioContext = new (window.AudioContext || (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
          
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.3);
        }
      });
    } catch (error) {
      console.warn('Could not play notification sound:', error);
    }
  }, [isEnabled]);

  const toggleSound = useCallback(() => {
    const newEnabled = !isEnabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem(SOUND_ENABLED_KEY, newEnabled.toString());
    }
    // Force re-render by updating a state or using a custom event
    window.dispatchEvent(new CustomEvent('soundToggle', { detail: newEnabled }));
  }, [isEnabled]);

  return {
    playNotification,
    isEnabled,
    toggleSound
  };
};
