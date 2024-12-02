import { useState, useCallback, useEffect } from 'react';
import { PIANO_KEYS, KEY_TO_NOTE } from '../constants/pianoKeys';

export const usePianoPlayer = () => {
  const [keys, setKeys] = useState(PIANO_KEYS);
  const [keysLogged, setKeysLogged] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleClick = useCallback((keyName) => {
    setKeysLogged(prev => [...prev, keyName]);
  }, []);

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
    }, 1000);
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
    }, 1000);

    return () => clearInterval(timer);
  }, [keys, changeKeyState, handleClick]);

  const handleKeyDown = useCallback((event) => {
    if (isInputFocused) return;
    
    const note = KEY_TO_NOTE[event.key.toLowerCase()];
    if (note) {
      event.preventDefault();
      changeKeyState(note);
      handleClick(note);
    }
  }, [isInputFocused, changeKeyState, handleClick]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return {
    keys,
    keysLogged,
    handleClick,
    playPiano,
    setIsInputFocused
  };
};
