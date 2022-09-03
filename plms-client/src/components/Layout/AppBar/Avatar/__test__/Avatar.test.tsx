import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Avatar from '../Avatar';

describe('Avatar', () => {
  it('should render', () => {
    render(<Avatar username="mustafa" />);
    const avatarElement = screen.getByTestId('avatar');
    expect(avatarElement).toBeInTheDocument();
  });

  it('should have first letter of username', () => {
    render(<Avatar username="mustafa" />);
    const avatarElement = screen.getByTestId('avatar');
    expect(avatarElement).toHaveTextContent('M');
  });

  it('should not have first letter of username', () => {
    render(<Avatar username="mustafa" imageURL="https://i.pravatar.cc/300" />);
    const avatarElement = screen.getByTestId('avatar');
    expect(avatarElement).not.toHaveTextContent('M');
  });

  it('should show menu items', () => {
    render(<Avatar username="mustafa" />);
    const avatarElement = screen.getByTestId('avatar');
    fireEvent.click(avatarElement);
    const menuElement = screen.getByTestId('avatar-menu');
    expect(menuElement).toHaveTextContent('Profile');
    expect(menuElement).toHaveTextContent('Logout');
  });

  //TODO: click profile test
  //TODO: click logout test
});
