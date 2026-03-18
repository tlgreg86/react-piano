import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PlayerInput from './PlayerInput';

describe('PlayerInput', () => {
  const handleSubmit = jest.fn();
  const setIsInputFocused = jest.fn();

  const mockProps = {
    handleSubmit,
    setIsInputFocused,
  };

  beforeEach(() => {
    handleSubmit.mockClear();
    setIsInputFocused.mockClear();
  });

  it('should render without crashing', () => {
    const { container } = render(<PlayerInput {...mockProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render wrapper div with correct className', () => {
    const { container } = render(<PlayerInput {...mockProps} />);
    expect(container.firstChild).toHaveClass('player-input-wrapper');
  });

  it('should show invalid indicator and disabled button in initial state', () => {
    render(<PlayerInput {...mockProps} />);
    expect(document.querySelector('.invalid-input')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should render the player-input form with textarea and submit button', () => {
    render(<PlayerInput {...mockProps} />);
    expect(document.querySelector('.player-input')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('submit-playlist');
  });

  it('should show valid indicator and enable button when valid input is typed', () => {
    render(<PlayerInput {...mockProps} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'A' } });
    expect(document.querySelector('.valid-input')).toBeInTheDocument();
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('should show invalid indicator when input is invalid', () => {
    render(<PlayerInput {...mockProps} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'x' } });
    expect(document.querySelector('.invalid-input')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should call handleSubmit when the submit button is clicked', () => {
    render(<PlayerInput {...mockProps} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'A' } });
    fireEvent.click(screen.getByRole('button'));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('should call setIsInputFocused(true) on textarea focus and false on blur', () => {
    render(<PlayerInput {...mockProps} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.focus(textarea);
    expect(setIsInputFocused).toHaveBeenCalledWith(true);
    fireEvent.blur(textarea);
    expect(setIsInputFocused).toHaveBeenCalledWith(false);
  });
});
