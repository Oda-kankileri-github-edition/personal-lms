import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loading from '../Loading';

describe('Loading', () => {
  it('should render', () => {
    render(<Loading  />);
    const loadingElement = screen.getByTestId('loading');
    expect(loadingElement).toBeInTheDocument();
  });
});
