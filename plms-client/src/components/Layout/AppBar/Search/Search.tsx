import * as React from 'react';
import ListItem from './ListItem';
import { SearchListItem } from '@interfaces/SearchList';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Paper, { PaperProps } from '@mui/material/Paper';
import { GetBooksRequest } from '@interfaces/BookService.types';
import BookService from '../../../../services/BookService';

const CustomPaper = (props: PaperProps) => {
  return (
    <Paper
      elevation={0}
      {...props}
      sx={{
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        '& .MuiAvatar-root': {
          width: 32,
          height: 32,
          ml: -0.5,
          mr: 1,
        },
        '&:before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: 0,
          right: 14,
          width: 10,
          height: 10,
          bgcolor: 'background.paper',
          transform: 'translateY(-50%) rotate(45deg)',
          zIndex: 0,
        },
      }}
    />
  );
};

export default function SearchList(): React.ReactElement {
  const [items, setItems] = React.useState<SearchListItem[] | []>([]);
  // const [inputValue, setInputValue] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  // React.useEffect(() => {
  //   const fetchBooks = async () => {
  //     setLoading(true);
  //     try {
  //       const request: GetBooksRequest = {
  //         queryParamaters: { q: inputValue },
  //       };
  //       const response = await BookService.getBooks(request);
  //       setLoading(false);

  //       const items: SearchListItem[] = [];
  //       for (let i in response.data.books) {
  //         const item: SearchListItem = {
  //           id: response.data.books[i].id,
  //           title: response.data.books[i].title,
  //           authors: response.data.books[i].authors,
  //         };

  //         items.push(item);
  //       }
  //       setLoading(false);
  //       setItems(items);
  //     } catch (error) {
  //       setLoading(false);
  //       setItems([]);
  //     }
  //   };
  //   if (inputValue.length > 0) {
  //     fetchBooks();
  //   }
  // }, [inputValue]);

  return (
    <Autocomplete
      id="searched-books"
      options={items}
      filterOptions={(x) => x}
      data-testid="search"
      selectOnFocus
      clearOnBlur
      loading={loading}
      handleHomeEndKeys
      onInputChange={async (event, newInputValue) => {
        // setInputValue(newInputValue);
        if (newInputValue.length > 0) {
          setLoading(true);
          try {
            const request: GetBooksRequest = {
              queryParamaters: { q: newInputValue },
            };
            const response = await BookService.getBooks(request);
            setLoading(false);

            const items: SearchListItem[] = [];
            for (let i in response.data.books) {
              const item: SearchListItem = {
                id: response.data.books[i].id,
                title: response.data.books[i].title,
                authors: response.data.books[i].authors,
              };

              items.push(item);
            }
            setLoading(false);
            setItems(items);
          } catch (error) {
            setLoading(false);
            setItems([]);
          }
        }
      }}
      renderOption={(props, option: SearchListItem) => (
        <ListItem item={option} />
      )}
      sx={{
        minWidth: '30ch',
        maxWidth: '50ch',
      }}
      color="white"
      renderInput={(params) => <TextField {...params} label="Search..." />}
      PaperComponent={CustomPaper}
      getOptionLabel={(option: SearchListItem) => option.title}
    />
  );
}
