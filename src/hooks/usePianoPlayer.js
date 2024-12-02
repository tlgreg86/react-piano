import { useState, useCallback, useEffect, useRef } from 'react';
import { PIANO_KEYS, KEY_TO_NOTE } from '../constants/pianoKeys';
import { useAudioContext } from './useAudioContext';

export const usePianoPlayer = () => {
  const [keys, setKeys] = useState(PIANO_KEYS);
  const [keysLogged, setKeysLogged] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { playNote } = useAudioContext();
  const pressedKeys = useRef(new Set());

  const handleClick = useCallback((keyName) => {
    setKeysLogged(prev => [...prev, keyName]);
    playNote(keyName);
  }, [playNote]);

  const changeKeyState = useCallback((keyLabel) => {
    setKeys(prevKeys => 
      prevKeys.map(key => 
        key.keyLabel === keyLabel 
          ? { ...key, isActive: true }
          : key
      )
    );

    setTimeout(() => {
      setKeys(prevKeys => 
        prevKeys.map(key => 
          key.keyLabel === keyLabel 
            ? { ...key, isActive: false }
            : key
        )
      );
    }, 200);
  }, []);

  const playPiano = useCallback((sequence) => {
    let counter = 0;
    const timer = setInterval(() => {
      if (counter >= sequence.length) {
        clearInterval(timer);
        return;
      }
      
      const currentKey = sequence[counter];
      const keyToPlay = keys.find(key => key.keyLabel === currentKey);
      if (keyToPlay) {
        changeKeyState(currentKey);
        handleClick(currentKey);
      }
      counter++;
    }, 500);

    return () => clearInterval(timer);
  }, [keys, changeKeyState, handleClick]);

  const handleKeyDown = useCallback((event) => {
    if (isInputFocused || event.repeat || pressedKeys.current.has(event.key.toLowerCase())) return;
    
    const note = KEY_TO_NOTE[event.key.toLowerCase()];
    if (note) {
      event.preventDefault();
      pressedKeys.current.add(event.key.toLowerCase());
      changeKeyState(note);
      handleClick(note);
    }
  }, [isInputFocused, changeKeyState, handleClick]);

  const handleKeyUp = useCallback((event) => {
    pressedKeys.current.delete(event.key.toLowerCase());
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return {
    keys,
    keysLogged,
    handleClick,
    playPiano,
    setIsInputFocused
  };
};
