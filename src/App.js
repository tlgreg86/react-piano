import React, { useCallback } from 'react';
import Piano from './components/Piano/Piano';
import Logger from './components/Logger/Logger';
import PlayerInput from './components/PlayerInput/PlayerInput';
import { usePianoPlayer } from './hooks/usePianoPlayer';

const App = () => {
  const { keys, keysLogged, handleClick, playPiano } = usePianoPlayer();

  const handleSubmit = useCallback((data) => {
    playPiano(data);
  }, [playPiano]);

  return (
    <div>
      <Piano keys={keys} handleClick={handleClick} />
      <Logger keysLogged={keysLogged} />
      <PlayerInput handleSubmit={handleSubmit} />
    </div>
  );
};

export default App;
