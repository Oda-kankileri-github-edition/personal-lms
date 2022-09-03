import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { within } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';
import Search from '../Search';
import axios from 'axios';
import '@testing-library/jest-dom';

describe('Search', () => {
  it('should render', () => {
    render(<Search />);
    const searchElement = screen.getByTestId('search');
    expect(searchElement).toBeInTheDocument();
  });
});
