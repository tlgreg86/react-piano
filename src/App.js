import React, { useCallback } from 'react';
import Piano from './components/Piano/Piano';
import Logger from './components/Logger/Logger';
import PlayerInput from './components/PlayerInput/PlayerInput';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { usePianoPlayer } from './hooks/usePianoPlayer';

const App = () => {
  const { keys, keysLogged, handleClick, playPiano, setIsInputFocused } = usePianoPlayer();

  const handleSubmit = useCallback((data) => {
    playPiano(data);
  }, [playPiano]);

  return (
    <ErrorBoundary>
      <div>
        <ErrorBoundary>
          <Piano keys={keys} handleClick={handleClick} />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <Logger keysLogged={keysLogged} />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <PlayerInput 
            handleSubmit={handleSubmit}
            setIsInputFocused={setIsInputFocused}
          />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
};

export default App;
