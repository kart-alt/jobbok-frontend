import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import JobListPage from './pages/JobListPage';
import AddJobPage from './pages/AddJobPage';
import JobDetailsPage from './pages/JobDetailsPage';
import EditJobPage from './pages/EditJobPage';
import InterviewSchedulePage from './pages/InterviewSchedulePage';
import InterviewPrepPage from './pages/InterviewPrepPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JobSearchPage from './pages/JobSearchPage';
import UpdatesPage from './pages/UpdatesPage';
import NotificationCenter from './components/NotificationCenter';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1a3a52' },
    secondary: { main: '#c9a961' },
    background: { default: '#f8f7f4', paper: '#ffffff' },
    text: { primary: '#1a3a52', secondary: '#5a6c7d' }
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-1px', color: '#1a3a52' },
    h2: { fontWeight: 800, letterSpacing: '-0.5px', color: '#1a3a52' },
    h3: { fontWeight: 700, letterSpacing: '-0.3px', color: '#1a3a52' },
    h4: { fontWeight: 700, color: '#1a3a52' },
    h5: { fontWeight: 600, letterSpacing: '0.3px', color: '#1a3a52' },
    h6: { fontWeight: 600, letterSpacing: '0.2px', color: '#1a3a52' }
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          fontWeight: 700,
          borderRadius: 10,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        },
        contained: {
          boxShadow: '0 4px 15px rgba(26, 58, 82, 0.2)',
          '&:hover': { boxShadow: '0 12px 32px rgba(201, 169, 97, 0.3)', transform: 'translateY(-2px)' }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 2px 12px rgba(26, 58, 82, 0.08)',
          transition: 'all 0.3s ease',
          borderColor: '#c9a961'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 12px rgba(26, 58, 82, 0.08)',
          transition: 'all 0.3s ease',
          borderColor: '#c9a961',
          '&:hover': { boxShadow: '0 8px 28px rgba(201, 169, 97, 0.15)', transform: 'translateY(-4px)' }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #1a3a52 0%, #2c5282 100%)',
          boxShadow: '0 4px 12px rgba(26, 58, 82, 0.15)'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#f0ebe3',
          color: '#1a3a52',
          borderColor: '#c9a961'
        }
      }
    }
  }
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#c9a961' },
    secondary: { main: '#e8dcc8' },
    background: { default: '#1a1a1a', paper: '#242424' },
    text: { primary: '#e8dcc8', secondary: '#b8a89a' }
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-1px', color: '#c9a961' },
    h2: { fontWeight: 800, letterSpacing: '-0.5px', color: '#c9a961' },
    h3: { fontWeight: 700, letterSpacing: '-0.3px', color: '#c9a961' },
    h4: { fontWeight: 700, color: '#c9a961' },
    h5: { fontWeight: 600, letterSpacing: '0.3px', color: '#c9a961' },
    h6: { fontWeight: 600, letterSpacing: '0.2px', color: '#c9a961' }
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          fontWeight: 700,
          borderRadius: 10,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        },
        contained: {
          boxShadow: '0 4px 20px rgba(201, 169, 97, 0.25)',
          '&:hover': { boxShadow: '0 12px 40px rgba(201, 169, 97, 0.35)', transform: 'translateY(-2px)' }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
          borderColor: '#c9a961'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
          borderColor: '#c9a961',
          '&:hover': { boxShadow: '0 12px 40px rgba(201, 169, 97, 0.25)', transform: 'translateY(-4px)' }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #1a3a52 0%, #2c5282 100%)',
          boxShadow: '0 4px 12px rgba(201, 169, 97, 0.2)'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#3a3a3a',
          color: '#c9a961',
          borderColor: '#c9a961'
        }
      }
    }
  }
});

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!(token && user));
    setLoading(false);
  }, []);

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (loading) {
    return null;
  }

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationCenter />
      {!isLoggedIn ? (
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <>
          <Navbar onLogout={handleLogout} onToggleDarkMode={handleToggleDarkMode} darkMode={darkMode} />
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/jobs" element={<JobListPage />} />
            <Route path="/jobs/search" element={<JobSearchPage />} />
            <Route path="/jobs/add" element={<AddJobPage />} />
            <Route path="/jobs/:id" element={<JobDetailsPage />} />
            <Route path="/jobs/:id/edit" element={<EditJobPage />} />
            <Route path="/interviews" element={<InterviewSchedulePage />} />
            <Route path="/interview-prep" element={<InterviewPrepPage />} />
            <Route path="/updates" element={<UpdatesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<Navigate to="/" />} />
          </Routes>
        </>
      )}
    </ThemeProvider>
  );
}
