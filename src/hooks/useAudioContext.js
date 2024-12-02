import { useState, useCallback, useEffect } from 'react';

// Frequency mapping for piano notes (in Hz)
const NOTE_FREQUENCIES = {
  'C': 261.63, // Middle C
  'c': 277.18, // C#
  'D': 293.66,
  'd': 311.13, // D#
  'E': 329.63,
  'F': 349.23,
  'f': 369.99, // F#
  'G': 392.00,
  'g': 415.30, // G#
  'A': 440.00,
  'a': 466.16, // A#
  'B': 493.88,
};

export const useAudioContext = () => {
  const [audioContext, setAudioContext] = useState(null);

  useEffect(() => {
    // Initialize audio context on first user interaction
    const initAudioContext = () => {
      if (!audioContext) {
        const newContext = new (window.AudioContext || window.webkitAudioContext)();
        setAudioContext(newContext);
        // Remove event listeners after initialization
        window.removeEventListener('mousedown', initAudioContext);
        window.removeEventListener('keydown', initAudioContext);
        window.removeEventListener('touchstart', initAudioContext);
      }
    };

    window.addEventListener('mousedown', initAudioContext);
    window.addEventListener('keydown', initAudioContext);
    window.addEventListener('touchstart', initAudioContext);

    return () => {
      window.removeEventListener('mousedown', initAudioContext);
      window.removeEventListener('keydown', initAudioContext);
      window.removeEventListener('touchstart', initAudioContext);
    };
  }, [audioContext]);

  const playNote = useCallback((note) => {
    if (!audioContext) return;

    // Create oscillator and gain nodes
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // Set frequency based on note
    oscillator.frequency.setValueAtTime(NOTE_FREQUENCIES[note], audioContext.currentTime);
    oscillator.type = 'sine';

    // Configure envelope
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Start and stop the oscillator
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);

    // Cleanup
    return () => {
      oscillator.disconnect();
      gainNode.disconnect();
    };
  }, [audioContext]);

  return { playNote };
};
