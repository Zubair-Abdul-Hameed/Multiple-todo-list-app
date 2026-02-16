import { useEffect, useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';

import { ICONS, DEFAULT_ICON_KEY, getIconByKey } from '../icons/iconRegistry';

export default function EditListDialog({ open, onClose, initialName, initialIconKey, onSubmit }) {
  const [name, setName] = useState(initialName || '');
  const [query, setQuery] = useState('');
  const [selectedIconKey, setSelectedIconKey] = useState(initialIconKey || DEFAULT_ICON_KEY);

  useEffect(() => {
    if (!open) return;
    setName(initialName || '');
    setSelectedIconKey(initialIconKey || DEFAULT_ICON_KEY);
    setQuery('');
  }, [open, initialName, initialIconKey]);

  const filteredIcons = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ICONS;
    return ICONS.filter(i => i.label.toLowerCase().includes(q) || i.key.toLowerCase().includes(q));
  }, [query]);

  const SelectedIcon = getIconByKey(selectedIconKey).Icon;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onSubmit({ name: trimmed, iconKey: selectedIconKey });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit List</DialogTitle>

      <DialogContent>
        <form id="edit-list-form" onSubmit={handleSubmit}>
          <TextField
            autoFocus
            required
            margin="dense"
            label="List name"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <Button type="submit" form="edit-list-form">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
