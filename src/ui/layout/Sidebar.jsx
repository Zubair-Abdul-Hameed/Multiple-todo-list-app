// src/ui/layout/Sidebar.jsx
import { useTodoLists } from '../../hooks/useTodoLists';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemIcon from '@mui/material/ListItemIcon';
import { getIconByKey } from '../icons/iconRegistry';

const drawerWidth = 240;

export function Sidebar() {
  const { lists, activeListId, setActiveList, removeList } = useTodoLists();


  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {lists.map(list => (
            <ListItem
              key={list.id}
              disablePadding
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete list"
                  onClick={(e) => {
                    e.stopPropagation(); // ✅ prevents triggering setActiveList
                    removeList(list.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemButton
                selected={list.id === activeListId}
                onClick={() => setActiveList(list.id)}
              >
                <ListItemIcon>
                  {(() => {
                    const Icon = getIconByKey(list.iconKey).Icon;
                    return <Icon />;
                  })()}
                </ListItemIcon>

                <ListItemText primary={list.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
