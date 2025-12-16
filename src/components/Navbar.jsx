import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useJobs } from '../context/JobContext';

export default function Navbar({ onLogout, onToggleDarkMode, darkMode }) {
  const { user, jobs } = useJobs();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    onLogout();
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const pendingInterviews = jobs.filter(j => j.currentStatus === 'HR Round' || j.currentStatus === 'Technical Interview').length;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          background: 'linear-gradient(135deg, #1a3a52 0%, #2c5282 100%)',
          borderBottom: '2.5px solid #c9a961',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 4px 20px rgba(201, 169, 97, 0.1)'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1.5 }}>
          {/* Logo */}
          <Box display="flex" alignItems="center" gap={2} component={RouterLink} to="/" sx={{ textDecoration: 'none', color: 'white' }}>
            <Avatar sx={{ bgcolor: '#c9a961', width: 45, height: 45, boxShadow: '0 4px 15px rgba(201, 169, 97, 0.3)' }}>
              <WorkIcon sx={{ color: '#1a3a52', fontSize: 26 }} />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 1.2, m: 0, color: '#ffffff', fontSize: '18px' }}>
                JobBook
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '11px', color: '#c9a961', fontWeight: 600 }}>
                Career Tracker
              </Typography>
            </Box>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/" 
              sx={{ 
                textTransform: 'none',
                fontSize: '15px',
                fontWeight: 500,
                px: 2,
                py: 1,
                borderRadius: 1,
                color: '#ffffff',
                transition: 'all 0.3s',
                '&:hover': { 
                  backgroundColor: '#c9a961',
                  color: '#1a3a52',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Dashboard
            </Button>
            <Button 
              color="inherit"
              component={RouterLink} 
              to="/jobs" 
              sx={{ 
                textTransform: 'none',
                fontSize: '15px',
                fontWeight: 500,
                px: 2,
                py: 1,
                borderRadius: 1,
                transition: 'all 0.3s',
                '&:hover': { 
                  backgroundColor: 'rgba(201, 169, 97, 0.2)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Applications
            </Button>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/jobs/search" 
              sx={{ 
                textTransform: 'none',
                fontSize: '15px',
                fontWeight: 500,
                px: 2,
                py: 1,
                borderRadius: 1,
                transition: 'all 0.3s',
                '&:hover': { 
                  backgroundColor: 'rgba(201, 169, 97, 0.2)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              🔍 Discover
            </Button>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/interviews" 
              sx={{ 
                textTransform: 'none',
                fontSize: '15px',
                fontWeight: 500,
                px: 2,
                py: 1,
                borderRadius: 1,
                transition: 'all 0.3s',
                '&:hover': { 
                  backgroundColor: 'rgba(201, 169, 97, 0.2)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Interviews
            </Button>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/interview-prep" 
              sx={{ 
                textTransform: 'none',
                fontSize: '15px',
                fontWeight: 500,
                px: 2,
                py: 1,
                borderRadius: 1,
                transition: 'all 0.3s',
                '&:hover': { 
                  backgroundColor: 'rgba(201, 169, 97, 0.2)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              📚 Prep
            </Button>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/updates" 
              sx={{ 
                textTransform: 'none',
                fontSize: '15px',
                fontWeight: 500,
                px: 2,
                py: 1,
                borderRadius: 1,
                transition: 'all 0.3s',
                '&:hover': { 
                  backgroundColor: 'rgba(201, 169, 97, 0.2)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              📝 Updates
            </Button>
          </Box>

          {/* Right Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Dark Mode Toggle */}
            <IconButton 
              color="inherit"
              onClick={onToggleDarkMode}
              sx={{
                transition: 'all 0.3s',
                '&:hover': {
                  backgroundColor: 'rgba(201, 169, 97, 0.2)'
                }
              }}
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

            {/* Notifications */}
            <IconButton 
              color="inherit"
              sx={{
                transition: 'all 0.3s',
                '&:hover': {
                  backgroundColor: 'rgba(201, 169, 97, 0.2)'
                }
              }}
            >
              <Badge badgeContent={pendingInterviews} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* User Avatar Menu */}
            <Box
              onClick={handleMenuOpen}
              sx={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                ml: 1,
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                transition: 'all 0.3s',
                '&:hover': { backgroundColor: 'rgba(201, 169, 97, 0.2)' }
              }}
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: 'rgba(201, 169, 97, 0.3)',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  cursor: 'pointer',
                  border: '2px solid #c9a961',
                  transition: 'all 0.3s',
                  '&:hover': {
                    border: '2px solid #c9a961',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                {getInitials(user?.name || 'U')}
              </Avatar>
            </Box>

            {/* User Menu */}
            <Menu 
              anchorEl={anchorEl} 
              open={open} 
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  mt: 1,
                  boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                  borderRadius: 2,
                  minWidth: '200px',
                  borderColor: '#c9a961'
                }
              }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1a3a52' }}>
                  {user?.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user?.email}
                </Typography>
              </Box>
              <Divider />
              <MenuItem 
                component={RouterLink} 
                to="/profile" 
                onClick={handleMenuClose}
                sx={{
                  transition: 'all 0.3s',
                  '&:hover': {
                    backgroundColor: '#f0ebe3'
                  }
                }}
              >
                <PersonIcon sx={{ mr: 1.5, fontSize: 18 }} />
                My Profile
              </MenuItem>
              <Divider />
              <MenuItem 
                onClick={handleLogout}
                sx={{ 
                  color: 'error.main',
                  transition: 'all 0.3s',
                  '&:hover': {
                    backgroundColor: '#fee2e2'
                  }
                }}
              >
                <LogoutIcon sx={{ mr: 1.5, fontSize: 18 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
