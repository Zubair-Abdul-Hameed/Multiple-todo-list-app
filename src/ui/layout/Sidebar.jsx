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
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const drawerWidth = 240;

export function Sidebar({ mobileOpen, onMobileClose }) {
  const { lists, activeListId, setActiveList, removeList } = useTodoLists();

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // md+ = permanent
  

  const drawerContent = (
    <>
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
                    e.stopPropagation();
                    removeList(list.id);
                    // If you're on mobile, optional: close drawer after delete
                    if (!isDesktop) onMobileClose?.();
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemButton
                selected={list.id === activeListId}
                onClick={() => {
                  setActiveList(list.id);
                  // ✅ mobile UX: close drawer after selecting a list
                  if (!isDesktop) onMobileClose?.();
                }}
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
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      aria-label="todo lists"
    >
      {/* Mobile: temporary drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }} // better mobile performance
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop: permanent drawer */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
