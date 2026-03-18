import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { usePianoPlayer } from './hooks/usePianoPlayer';
import { PIANO_KEYS } from './constants/pianoKeys';

jest.mock('./hooks/usePianoPlayer', () => ({
  usePianoPlayer: jest.fn(),
}));

describe('App', () => {
  let mockHandleClick;
  let mockPlayPiano;
  let mockSetIsInputFocused;

  beforeEach(() => {
    mockHandleClick = jest.fn();
    mockPlayPiano = jest.fn();
    mockSetIsInputFocused = jest.fn();

    usePianoPlayer.mockReturnValue({
      keys: PIANO_KEYS,
      keysLogged: [],
      handleClick: mockHandleClick,
      playPiano: mockPlayPiano,
      setIsInputFocused: mockSetIsInputFocused,
    });
  });

  it('should render without crashing', () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/enter notes/i)).toBeInTheDocument();
  });

  it('should call handleClick when a piano key is clicked', () => {
    render(<App />);
    const firstKey = screen.getAllByText(PIANO_KEYS[0].keyLabel)[0];
    fireEvent.click(firstKey.closest('div'));
    expect(mockHandleClick).toHaveBeenCalledWith(PIANO_KEYS[0].keyLabel);
  });

  it('should call playPiano when a valid sequence is submitted', () => {
    render(<App />);
    const textarea = screen.getByPlaceholderText(/enter notes/i);
    fireEvent.change(textarea, { target: { value: 'A' } });
    fireEvent.click(screen.getByText('Submit'));
    expect(mockPlayPiano).toHaveBeenCalled();
  });
});
