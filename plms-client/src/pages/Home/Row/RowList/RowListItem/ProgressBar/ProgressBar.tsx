import * as React from 'react';
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

/**
 * The props type for [[`RowListItem`]].
 */
interface Props {
  percentage: number;
}

export default function LinearWithValueLabel({
  percentage,
}: React.PropsWithChildren<Props>): React.ReactElement {
  return (
    <Box sx={{ width: '80%', ml: 2 }}>
      <LinearProgressWithLabel value={percentage} />
    </Box>
  );
}
