import { ReactElement } from 'react';
import { Typography, Link } from '@mui/material';

/**
 * Copyright.
 * @category Component
 */
export default function Copyright(): ReactElement {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ pt: 4 }}
      data-testid="copyright"
    >
      {'Copyright © '}
      <Link
        color="inherit"
        href="https://github.com/Oda-kankileri-github-edition"
        target="_blank"
      >
        Oda kankileri Github Edition
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
