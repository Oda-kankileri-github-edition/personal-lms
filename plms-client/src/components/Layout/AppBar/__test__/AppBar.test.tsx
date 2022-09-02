import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppBar from '../AppBar';

describe('AppBar', () => {
  it('should render', () => {
    render(<AppBar username="mustafa" />);
    const inputElement = screen.getByTestId('appbar');
    expect(inputElement).toBeInTheDocument();
  });
});
