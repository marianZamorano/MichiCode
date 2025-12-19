import React from 'react';
import { Container } from '@mui/material';
import Home from './pages/Home';

function App() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Home />
    </Container>
  );
}

export default App;