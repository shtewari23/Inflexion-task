import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import SearchTags from './components/SearchFilters';
import Feed from './components/PodcastFeed';
import ContentDetail from './components/ContentDetail'; // new page you created
import { store } from './redux/store';
import { Container, Box, Typography } from '@mui/material';
import Footer from './components/Footer';
import SummaryPage from './components/SummaryPage';
function MainApp() {

  return (
    <Box sx={{ width: '100%' }}>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          backgroundColor: 'white',
          borderRadius: '28px',
          width: '100%',
          minHeight: '100vh',
          px: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            py: 6,
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Helvetica Now Display, sans-serif',
              fontWeight: 950,
              fontSize: { xs: '32px', sm: '56px' },
              lineHeight: { xs: '44px', sm: '64px' },
              letterSpacing: '0.1px',
              textTransform: 'uppercase',
              textAlign: 'center',
              verticalAlign: 'middle',
            }}
          >
            Every word spoken. <br /> By top AI execs
          </Typography>

          <SearchTags />
          <Feed />
        </Box>
      </Container>
    </Box>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
                      <Header />

        <Routes>

          <Route path="/" element={<MainApp />} />
          <Route path="/content/:contentId" element={<ContentDetail />} />
                  <Route path="/summary/:id" element={<SummaryPage />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}
