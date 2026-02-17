// src/app/App.jsx
import { useState } from 'react';
import { Sidebar } from '../ui/layout/Sidebar';
import { AppProviders } from './providers';
import { MainDisplay } from '../ui/layout/MainDisplay';
import ButtonAppBar from "../ui/layout/ButtonAppBar";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(prev => !prev);
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  return (
    <AppProviders>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <ButtonAppBar onMenuClick={handleDrawerToggle} />

        <Sidebar
          mobileOpen={mobileOpen}
          onMobileClose={handleMobileClose}
        />

        <MainDisplay />
      </Box>
    </AppProviders>
  );
}
