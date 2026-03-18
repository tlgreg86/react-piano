import { renderHook, act } from '@testing-library/react';
import { usePianoPlayer } from '../usePianoPlayer';
import { useAudioContext } from '../useAudioContext';
import { PIANO_KEYS } from '../../constants/pianoKeys';

// Mock useAudioContext
jest.mock('../useAudioContext', () => ({
  useAudioContext: jest.fn()
}));

describe('usePianoPlayer', () => {
  let mockPlayNote;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Setup mock for playNote
    mockPlayNote = jest.fn();
    useAudioContext.mockReturnValue({ playNote: mockPlayNote });
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => usePianoPlayer());

    expect(result.current.keys).toEqual(PIANO_KEYS);
    expect(result.current.keysLogged).toEqual([]);
  });

  it('should handle click on piano key', () => {
    const { result } = renderHook(() => usePianoPlayer());

    act(() => {
      result.current.handleClick('C');
    });

    expect(result.current.keysLogged).toEqual(['C']);
    expect(mockPlayNote).toHaveBeenCalledWith('C');
  });

  it('should handle keyboard input', () => {
    const { result } = renderHook(() => usePianoPlayer());
    
    // Simulate pressing 'a' key (which maps to 'C' note)
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    });

    expect(mockPlayNote).toHaveBeenCalledWith('C');

    // Simulate releasing the key
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keyup', { key: 'a' }));
    });
  });

  it('should not handle keyboard input when input is focused', () => {
    const { result } = renderHook(() => usePianoPlayer());

    act(() => {
      result.current.setIsInputFocused(true);
    });

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    });

    expect(mockPlayNote).not.toHaveBeenCalled();
  });

  it('should play sequence of notes', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => usePianoPlayer());

    act(() => {
      result.current.playPiano(['C', 'D', 'E']);
    });

    // First note plays on the first interval tick (500ms)
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(mockPlayNote).toHaveBeenCalledWith('C');

    // Second note plays on the second tick
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(mockPlayNote).toHaveBeenCalledWith('D');

    // Third note plays on the third tick
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(mockPlayNote).toHaveBeenCalledWith('E');

    jest.useRealTimers();
  });

  it('should not play invalid notes in sequence', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => usePianoPlayer());

    act(() => {
      result.current.playPiano(['C', 'INVALID', 'E']);
    });

    // First note plays on the first tick
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(mockPlayNote).toHaveBeenCalledWith('C');

    // INVALID note tick — playNote should not be called again
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(mockPlayNote).toHaveBeenCalledTimes(1);

    // Third note plays on the third tick
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(mockPlayNote).toHaveBeenCalledWith('E');

    jest.useRealTimers();
  });
});
