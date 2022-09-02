import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import { SearchListItem as ISearchItemList } from '@interfaces/SearchList';

/**
 * The props type for [[`SearchListItem`]].
 */
interface SearchListItemProps {
  item: ISearchItemList;
}

export default function SearchListItem({
  item,
}: React.PropsWithChildren<SearchListItemProps>): React.ReactElement {
  return (
    <ListItem disablePadding key={item.id} data-testid="listItem">
      <ListItemButton component="a" href={`/books/${item.id}`}>
        <ListItemAvatar>
          {item.coverURL ? (
            <Avatar alt="Item" src={item.coverURL} data-testid="avatar" />
          ) : (
            <Avatar>
              <ImageIcon />
            </Avatar>
          )}
        </ListItemAvatar>
        <ListItemText
          primary={item.title}
          secondary={
            Array.isArray(item.authors) ? item.authors.join(', ') : item.authors
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
