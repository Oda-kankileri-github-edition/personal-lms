import { Book } from '@interfaces/Book';
import { ReactElement, PropsWithChildren } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import RowList from './RowList';

/**
 * The props type for [[`Row`]].
 */
interface RowProps {
  data: Book[];
  title: string;
  showPercentage?: boolean;
}

const Row = ({
  data,
  title,
  showPercentage,
}: PropsWithChildren<RowProps>): ReactElement => {
  return (
    <Grid item xs={12} md={12} lg={12}>
      <Paper elevation={2}>
        <Typography variant="h6" component="h6" sx={{ ml: 2 }}>
          {title}
        </Typography>
        <RowList data={data} showPercentage={showPercentage} />
      </Paper>
    </Grid>
  );
};

export default Row;
