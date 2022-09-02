import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Copyright from '../Copyright';

describe('Copyright', () => {
  it('should render', () => {
    render(<Copyright />);
    const textElement = screen.getByText('Oda kankileri Github Edition');
    expect(textElement).toBeInTheDocument();
  });

  it('should have this year', () => {
    render(<Copyright />);
    const textElement = screen.getByTestId('copyright');
    expect(textElement).toHaveTextContent(new Date().getFullYear().toString());
  });
});
