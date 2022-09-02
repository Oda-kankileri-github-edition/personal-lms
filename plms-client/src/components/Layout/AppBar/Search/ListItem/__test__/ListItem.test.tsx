import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListItem from '../ListItem';
import { SearchListItem as ISearchItemList } from '@interfaces/SearchList';

describe('ListItem', () => {
  it('should render', () => {
    const item:ISearchItemList ={id: "1", title: "test", authors: "test"};
    render(<ListItem item={item} />);
    const itemElement = screen.getByTestId('listItem');
    expect(itemElement).toBeInTheDocument();
  });
});
