import { ReactElement, PropsWithChildren } from 'react';
import { Container, CssBaseline, Box, Toolbar } from '@mui/material';
import AppBar from './AppBar';
import Copyright from './Copyright';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const mdTheme = createTheme({
  palette: {},
});

/**
 * The props type for [[`Layout`]].
 */
interface LayoutProps {
  children?: ReactElement[] | ReactElement;
  username?: string;
  imageURL?: string | undefined;
}

/**
 * Main layout of pages.
 * @category Component
 */
export default function Layout({
  children,
  username,
  imageURL,
}: PropsWithChildren<LayoutProps>): ReactElement {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }} data-testid="layout">
        <CssBaseline />
        <AppBar username={username ?? 'User'} imageURL={imageURL} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container sx={{ mt: 4, mb: 4 }}>
            {children}
            <Copyright />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
