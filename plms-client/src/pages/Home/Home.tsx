import Layout from '../../components/Layout';
import { Container, Grid } from '@mui/material';
import Row from './Row';
import books from '../../books.json';

const HomeComponent = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={2}>
        <Row title="Currently Reading" data={books} showPercentage={true} />
        <Row title="Last Added" data={books} />
      </Grid>
    </Container>
  );
};

const Home = () => {
  return (
    <Layout imageURL="https://lh3.googleusercontent.com/jE9-XRe2LGT7BQLeV8U0iZG1DCIwgVPvJAA1XIQAE-q46nCiR5XPqJRXIF6Th4_QR0fLyD3OKko8jT-2OQ=s2154-rw-no">
      <HomeComponent />
    </Layout>
  );
};
export default Home;
