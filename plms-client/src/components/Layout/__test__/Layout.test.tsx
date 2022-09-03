import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from '../Layout';

describe('Layout', () => {
  it('should render', () => {
    render(<Layout username="mustafa" />);
    const layoutElement = screen.getByTestId('layout');
    expect(layoutElement).toBeInTheDocument();
  });
});
