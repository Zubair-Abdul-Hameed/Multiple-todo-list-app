// src/ui/layout/ButtonAppBar.jsx
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';

import CreateListDialog from '../dialogs/CreateListDialog';
import { useTodoLists } from '../../hooks/useTodoLists';

export default function ButtonAppBar({ onMenuClick }) {
  const [open, setOpen] = useState(false);
  const { createList } = useTodoLists();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateList = (name, iconKey) => {
     createList(name, iconKey);
   };

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {/* Mobile-only menu button */}
          <IconButton
            color="inherit"
            edge="start"
            aria-label="open drawer"
            onClick={onMenuClick}
            sx={{ mr: 1, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Lists
          </Typography>

          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="add list"
            onClick={handleClickOpen}
          >
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <CreateListDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleCreateList}
      />
    </>
  );
}
