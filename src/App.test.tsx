import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Board Title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Bit Board B/i);
  expect(linkElement).toBeInTheDocument();
});
