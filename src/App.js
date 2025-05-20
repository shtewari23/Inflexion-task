import React, { useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import Header from './components/Header';
import SearchTags from './components/SearchFilters';
import Feed from './components/PodcastFeed';
import { store } from './redux/store';
import { Container, Box, Typography } from '@mui/material';
import Footer from './components/Footer';

function MainApp() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");


  return (
    <Box sx={{ width: '100%' }}>
      <Header />
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
    fontSize: { xs: '32px', sm: '56px' },          // 32px on mobile (xs), 56px on medium and up (md)
    lineHeight: { xs: '44px', sm: '64px' },        // 44px on mobile, 64px on desktop
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
      <MainApp />
      <Footer/>
    </Provider>
  );
}
