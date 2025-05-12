import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LevelSelectPage } from './pages/LevelSelectPage';
import { ProblemPage } from './pages/ProblemPage';
import { AppLayout } from './components/common/AppLayout';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ffd600' },
    background: { default: '#111', paper: '#222' },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<LevelSelectPage />} />
            <Route path="/problems/:level" element={<ProblemPage />} />
          </Routes>
        </AppLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
