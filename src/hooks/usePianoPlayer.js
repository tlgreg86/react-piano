import { useState, useCallback } from 'react';
import { PIANO_KEYS } from '../constants/pianoKeys';

export const usePianoPlayer = () => {
  const [keys, setKeys] = useState(PIANO_KEYS);
  const [keysLogged, setKeysLogged] = useState([]);

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

    // Cleanup function to clear interval if component unmounts
    return () => clearInterval(timer);
  }, [keys, changeKeyState, handleClick]);

  return {
    keys,
    keysLogged,
    handleClick,
    playPiano
  };
};
