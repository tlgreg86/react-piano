import React from 'react';
import { render, screen } from '@testing-library/react';
import Logger from './Logger';

describe('Logger', () => {
  const mockProps = {
    keysLogged: ['A', 'B', 'C'],
  };

  it('should render without crashing', () => {
    const { container } = render(<Logger {...mockProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render a container div with class logger', () => {
    const { container } = render(<Logger {...mockProps} />);
    expect(container.firstChild).toHaveClass('logger');
  });

  it('should render the correct number of children based on keysLogged', () => {
    const { container } = render(<Logger {...mockProps} />);
    expect(container.firstChild.children).toHaveLength(3);
  });

  it('should render children with correct text values', () => {
    render(<Logger {...mockProps} />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });
});
