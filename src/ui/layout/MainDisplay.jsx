// src/ui/layout/MainDisplay.jsx
import { useState } from 'react';
import { useTodoLists } from '../../hooks/useTodoLists';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Checkbox from '@mui/material/Checkbox';
import ListItemButton from '@mui/material/ListItemButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import EditListDialog from '../dialogs/EditListDialog';
import { getIconByKey } from '../icons/iconRegistry';


export function MainDisplay() {
  const { activeList, items, createItem, toggleItem, removeItem, updateItemText, updateActiveList } = useTodoLists();

  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState('');
  const [editOpen, setEditOpen] = useState(false);

  if (!activeList) {
    return (
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography>No list selected</Typography>
      </Box>
    );
  }

  const handleAdd = () => {
    if (!text.trim()) return;
    createItem(text);
    setText('');
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />

      <Box sx={{ py: 3 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ border: '1px solid rgba(0,0,0,0.54)', bgcolor: "white"}}>
            {(() => {
              const Icon = getIconByKey(activeList.iconKey).Icon;
              return <Icon sx={{ color: 'rgba(0,0,0,0.54)' }}/>;
            })()}
          </Avatar>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {activeList.name}
          </Typography>

          <IconButton aria-label="edit list" onClick={() => setEditOpen(true)}>
            <EditIcon />
          </IconButton>
        </Stack>
      </Box>

      <Divider />

      <List>
        {items.map(item => (
          <ListItem
            key={item.id}
            disablePadding
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeItem(item.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemButton dense>
              <Checkbox
                edge="start"
                checked={item.completed}
                onChange={() => toggleItem(item)}
                tabIndex={-1}
                disableRipple
              />

              {editingId === item.id ? (
                <TextField
                  variant="standard"
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  autoFocus
                  fullWidth
                  onBlur={() => {
                    updateItemText(item, draft);
                    setEditingId(null);
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      updateItemText(item, draft);
                      setEditingId(null);
                    }
                    if (e.key === 'Escape') {
                      setEditingId(null);
                    }
                  }}
                  sx={{ ml: 1 }}
                />
              ) : (
                <ListItemText
                  primary={item.text}
                  onClick={() => {
                    setEditingId(item.id);
                    setDraft(item.text);
                  }}
                  sx={{
                    textDecoration: item.completed ? 'line-through' : 'none',
                    opacity: item.completed ? 0.6 : 1,
                    ml: 1,
                    cursor: 'text',
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>


      <Box sx={{ mt: 2 }}>
        <TextField
          label="New item"
          variant="filled"
          fullWidth
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleAdd();
            }
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleAdd}
                    edge="end"
                    disabled={!text.trim()}
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <EditListDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        initialName={activeList.name}
        initialIconKey={activeList.iconKey}
        onSubmit={updateActiveList}
      />
    </Box>
  );
}
