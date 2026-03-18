import React from 'react';
import { render } from '@testing-library/react';
import Piano from './Piano';

describe('Piano', () => {
  const handleClick = jest.fn();

  const mockProps = {
    keys: [
      { keyLabel: 'C', type: 'major', isActive: false },
      { keyLabel: 'c', type: 'minor', isActive: false },
      { keyLabel: 'D', type: 'major', isActive: false },
      { keyLabel: 'd', type: 'minor', isActive: false },
      { keyLabel: 'E', type: 'major', isActive: false },
      { keyLabel: 'F', type: 'major', isActive: false },
      { keyLabel: 'f', type: 'minor', isActive: false },
      { keyLabel: 'G', type: 'major', isActive: false },
      { keyLabel: 'g', type: 'minor', isActive: false },
      { keyLabel: 'A', type: 'major', isActive: false },
      { keyLabel: 'a', type: 'minor', isActive: false },
      { keyLabel: 'B', type: 'major', isActive: false },
    ],
    handleClick,
  };

  it('should render without crashing', () => {
    const { container } = render(<Piano {...mockProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render piano wrapper div with correct className', () => {
    const { container } = render(<Piano {...mockProps} />);
    expect(container.firstChild).toHaveClass('piano-wrapper');
  });

  it('should render piano container div with correct className', () => {
    const { container } = render(<Piano {...mockProps} />);
    expect(container.firstChild.firstChild).toHaveClass('piano-container');
  });

  it('should render the correct number of keys based on keys array length', () => {
    const { container } = render(<Piano {...mockProps} />);
    const keys = container.querySelectorAll('.key');
    expect(keys).toHaveLength(mockProps.keys.length);
  });
});
