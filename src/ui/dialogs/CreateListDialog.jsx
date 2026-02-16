// controlled component: controller is ButtonAppBar.jsx
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useMemo, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';

import { ICONS, DEFAULT_ICON_KEY, getIconByKey } from '../icons/iconRegistry';

export default function CreateListDialog({ open, onClose, onSubmit }) {
  const [query, setQuery] = useState('');
  const [selectedIconKey, setSelectedIconKey] = useState(DEFAULT_ICON_KEY);

  const filteredIcons = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ICONS;
    return ICONS.filter(i => i.label.toLowerCase().includes(q) || i.key.toLowerCase().includes(q));
  }, [query]);

  const SelectedIcon = getIconByKey(selectedIconKey).Icon;

  const handleSubmit = event => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const { name } = Object.fromEntries(formData.entries());

    onSubmit(name, selectedIconKey);
    onClose();
  };


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New List</DialogTitle>

      <DialogContent>
        <form id="create-list-form" onSubmit={handleSubmit}>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="List name"
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            label="Search icon"
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            variant="standard"
          />

          <List dense sx={{ maxHeight: 220, overflow: 'auto', mt: 1 }}>
            {filteredIcons.map(({ key, label, Icon }) => (
              <ListItem key={key} disablePadding>
                <ListItemButton
                  selected={key === selectedIconKey}
                  onClick={() => setSelectedIconKey(key)}
                >
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 1 }} />

          <ListItem disablePadding>
            <ListItemIcon>
              <SelectedIcon />
            </ListItemIcon>
            <ListItemText primary={`Selected: ${getIconByKey(selectedIconKey).label}`} />
          </ListItem>
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" form="create-list-form">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
