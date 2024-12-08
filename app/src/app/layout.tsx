'use client';

import { ReactNode, useState } from 'react';
import StyledJsxRegistry from './registry';
import { Inter } from 'next/font/google';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  ThemeProvider,
  Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import defaultTheme from './theme';
import { Authenticator } from '@aws-amplify/ui-react';

const drawerWidth = 240;

interface LayoutProps {
  children: ReactNode;
}

const font = Inter({
  weight: '400',
  subsets: ['latin-ext'],
  display: 'swap',
});

const Layout = ({ children }: LayoutProps) => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  function Header() {
    return (
      <AppBar position="fixed" sx={{ width: '100vw' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap />
        </Toolbar>
      </AppBar>
    );
  }

  function DrawerBox() {
    return (
      <Box
        component="nav"
        textAlign="center"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="folders"
        display="contents"
      >
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            '& .MuiDrawer-paper': {
              backgroundColor: theme.palette.primary.main,
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          ModalProps={{ keepMounted: true }}
        >
          <Box
            sx={{
              width: drawerWidth,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            }}
            className={font.className}
          >
            <Box sx={theme.mixins.toolbar} />
            <Divider />
            <List>
              {['Info'].map((text) => (
                <ListItemButton
                  key={text}
                  sx={{
                    width: drawerWidth,
                    backgroundColor: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.light,
                    },
                  }}
                >
                  <ListItemIcon>
                    <DashboardIcon
                      sx={{ color: theme.palette.primary.contrastText }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <html lang="en">
      <body>
        <StyledJsxRegistry>
          <Authenticator.Provider>
            <ThemeProvider theme={defaultTheme}>
              <CssBaseline />
              <Box
                sx={{
                  color: theme.palette.primary.contrastText,
                  display: 'flex',
                  flexDirection: 'column',
                  maxHeight: '100vh',
                }}
              >
                <Box sx={{ height: '4rem' }}>
                  <Header />
                  <DrawerBox />
                </Box>
                <Box sx={{ flexGrow: 1 }}>{children}</Box>
              </Box>
            </ThemeProvider>
          </Authenticator.Provider>
        </StyledJsxRegistry>
      </body>
    </html>
  );
};

export default Layout;
