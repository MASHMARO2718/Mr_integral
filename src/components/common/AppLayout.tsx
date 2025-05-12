import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default" sx={{ bgcolor: '#222', color: '#ffd600' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: 1 }}>
            The integral guy
          </Typography>
          <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250, p: 2 }} role="presentation" onClick={toggleDrawer(false)}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Menu
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ mb: 2, color: '#ffd600', borderColor: '#ffd600' }}
            onClick={() => navigate('/')}
          >
            ホームに戻る
          </Button>
          {/* ここにメニュー項目を追加可能 */}
        </Box>
      </Drawer>
      <Box sx={{ p: { xs: 1, sm: 3 } }}>{children}</Box>
    </Box>
  );
}; 