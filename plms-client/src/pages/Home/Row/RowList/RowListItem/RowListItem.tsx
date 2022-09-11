import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import ImageIcon from '@mui/icons-material/Image';
import { Book } from '@interfaces/Book';
import ProgressBar from './ProgressBar/ProgressBar';

/**
 * The props type for [[`RowListItem`]].
 */
interface RowListItemProps {
  item: Book;
  showPercentage?: boolean;
}

export default function RowListItem({
  item,
  showPercentage,
}: React.PropsWithChildren<RowListItemProps>): React.ReactElement {
  const [percentage, setPercentage] = React.useState<number>(0);
  React.useEffect(() => {
    if (item.pageCount && item.readPage) {
      setPercentage(Math.floor((item.readPage / item.pageCount) * 100));
    } else {
      setPercentage(0);
    }
  }, [item, showPercentage]);

  return (
    <Paper elevation={5} sx={{ ml: 3, width: 230, height:100}}>
      <ListItem disablePadding key={item.id} data-testid="listItem">
        <ListItemButton component="a" href={`/books/${item.id}`}>
          <ListItemAvatar>
            {item.coverImage ? (
              <Avatar alt="Item" src={item.coverImage} data-testid="avatar" />
            ) : (
              <Avatar>
                <ImageIcon />
              </Avatar>
            )}
          </ListItemAvatar>
          <ListItemText
            primary={item.title}
            secondary={
              Array.isArray(item.authors)
                ? item.authors[0] + ', et.al.'
                : item.authors
            }
          />
        </ListItemButton>
      </ListItem>
      {showPercentage && <ProgressBar percentage={percentage} />}
    </Paper>
  );
}
