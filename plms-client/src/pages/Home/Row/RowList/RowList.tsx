import { Book } from '@interfaces/Book';
import { ReactElement, PropsWithChildren } from 'react';
import RowListItem from './RowListItem';
import Grid from '@mui/material/Grid';

/**
 * The props type for [[`Row`]].
 */
interface RowListProps {
  data: Book[];
  showPercentage?: boolean;
}

const RowList = ({
  data,
  showPercentage,
}: PropsWithChildren<RowListProps>): ReactElement => {
  return (
    <Grid container sx={{ flexDirection: 'row', p: 2, display: 'flex' }}>
      {data.map((book) => (
        <RowListItem item={book} showPercentage={showPercentage} />
      ))}
    </Grid>
  );
};

export default RowList;
