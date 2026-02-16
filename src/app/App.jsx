import { Sidebar } from '../ui/layout/Sidebar';
import { AppProviders } from './providers';
import { MainDisplay } from '../ui/layout/MainDisplay';
import ButtonAppBar from "../ui/layout/ButtonAppBar"
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';


export default function ClippedDrawer() {
  return (
    <AppProviders>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <ButtonAppBar />
        <Sidebar />
        <MainDisplay />
      </Box>
    </AppProviders>
  );
}