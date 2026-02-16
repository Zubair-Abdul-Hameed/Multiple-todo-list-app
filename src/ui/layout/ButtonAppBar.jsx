import { useState } from 'react';
// position="static"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import CreateListDialog from '../dialogs/CreateListDialog';
import { useTodoLists } from '../../hooks/useTodoLists';

export default function ButtonAppBar() {
  const [open, setOpen] = useState(false);
  const { createList } = useTodoLists();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateList = (name, iconKey) => {
    createList(name, iconKey);
  };


  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Lists
          </Typography>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="add list"
            sx={{ mr: 2 }}
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
