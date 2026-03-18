import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Key from './Key';

describe('Key', () => {
  const handleClick = jest.fn();

  const mockProps = {
    keyLabel: 'C',
    classNames: 'key C major',
    handleClick,
  };

  beforeEach(() => {
    handleClick.mockClear();
  });

  it('should render without crashing', () => {
    const { container } = render(<Key {...mockProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render with correct className on the outer div', () => {
    const { container } = render(<Key {...mockProps} />);
    expect(container.firstChild).toHaveClass('key', 'C', 'major');
  });

  it('should render a <p> with class key-label and correct text', () => {
    render(<Key {...mockProps} />);
    const label = screen.getByText('C');
    expect(label).toHaveClass('key-label');
  });

  it('should call handleClick with the keyLabel when clicked', () => {
    const { container } = render(<Key {...mockProps} />);
    fireEvent.click(container.firstChild);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith('C');
  });
});
