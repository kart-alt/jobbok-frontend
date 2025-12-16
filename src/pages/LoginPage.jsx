import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import WorkIcon from '@mui/icons-material/Work';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Grid from '@mui/material/Grid';
import EventNoteIcon from '@mui/icons-material/EventNote';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Avatar from '@mui/material/Avatar';
import GoogleSignIn from '../components/GoogleSignIn';
import { useJobs } from '../context/JobContext';

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const { login } = useJobs();
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      await login(email, password);
      if (onLogin) onLogin();
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a3a52 0%, #2c5282 50%, #1a3a52 100%)', display: 'flex', alignItems: 'center', py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={5} alignItems="center">
          {/* Left side - Features with Visual Elements */}
          <Grid item xs={12} md={6}>
            <Box sx={{ color: '#e8dcc8', pr: { md: 4 } }}>
              {/* Logo and Title */}
              <Box display="flex" alignItems="center" mb={5}>
                <Avatar sx={{ width: 70, height: 70, bgcolor: '#c9a961', mr: 2.5, fontSize: '32px', boxShadow: '0 8px 25px rgba(201, 169, 97, 0.3)' }}>
                  <WorkIcon sx={{ fontSize: 45, color: '#1a3a52' }} />
                </Avatar>
                <Box>
                  <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1, color: '#c9a961', fontSize: '42px' }}>
                    JobBook
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9, mt: 0.5, fontSize: '15px', letterSpacing: '0.5px' }}>
                    Smart Job Tracking
                  </Typography>
                </Box>
              </Box>

              <Typography variant="h5" sx={{ mb: 5, fontWeight: 300, lineHeight: 1.9, fontSize: '18px' }}>
                Your personal job application tracker. Manage applications, schedule interviews, and track your progress all in one place.
              </Typography>

              {/* Feature Cards */}
              <Stack spacing={4}>
                <Paper sx={{ p: 3, backgroundColor: 'rgba(201, 169, 97, 0.1)', backdropFilter: 'blur(10px)', borderRadius: 2, border: '1px solid #c9a961' }}>
                  <Box display="flex" gap={2} alignItems="flex-start">
                    <Avatar sx={{ bgcolor: '#c9a961', width: 50, height: 50 }}>
                      <AssignmentIcon sx={{ color: '#1a3a52', fontSize: 28 }} />
                    </Avatar>
                    <Box flex={1}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                        Track Applications
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Monitor all your job applications in real-time with status updates and notes
                      </Typography>
                    </Box>
                  </Box>
                </Paper>

                <Paper sx={{ p: 3, backgroundColor: 'rgba(201, 169, 97, 0.1)', backdropFilter: 'blur(10px)', borderRadius: 2, border: '1px solid #c9a961' }}>
                  <Box display="flex" gap={2} alignItems="flex-start">
                    <Avatar sx={{ bgcolor: '#c9a961', width: 50, height: 50 }}>
                      <EventNoteIcon sx={{ color: '#1a3a52', fontSize: 28 }} />
                    </Avatar>
                    <Box flex={1}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                        Schedule Interviews
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Never miss an interview with calendar integration and smart reminders
                      </Typography>
                    </Box>
                  </Box>
                </Paper>

                <Paper sx={{ p: 3, backgroundColor: 'rgba(232, 220, 200, 0.1)', backdropFilter: 'blur(10px)', borderRadius: 2, border: '1px solid rgba(232, 220, 200, 0.3)' }}>
                  <Box display="flex" gap={2} alignItems="flex-start">
                    <Avatar sx={{ bgcolor: 'rgba(232, 220, 200, 0.3)', width: 50, height: 50 }}>
                      <TrendingUpIcon sx={{ color: '#e8dcc8', fontSize: 28 }} />
                    </Avatar>
                    <Box flex={1}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                        Track Progress
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        Visualize your journey from application to final decision with detailed analytics
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Stack>

              {/* Bottom Stats */}
              <Grid container spacing={2} sx={{ mt: 3 }}>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: 'rgba(201, 169, 97, 0.15)', borderRadius: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#c9a961' }}>12+</Typography>
                    <Typography variant="caption">Job Applications</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: 'rgba(201, 169, 97, 0.15)', borderRadius: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#c9a961' }}>4+</Typography>
                    <Typography variant="caption">Interviews Tracked</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Right side - Login Form */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: '0 40px 100px rgba(201, 169, 97, 0.25)', borderRadius: 4, overflow: 'hidden', backgroundColor: '#f8f7f4', border: '1px solid #c9a961' }}>
              {/* Form Header with Gradient */}
              <Box sx={{ background: 'linear-gradient(135deg, #1a3a52 0%, #2c5282 100%)', p: 4 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 0.5, color: '#c9a961', fontSize: '32px' }}>
                  Welcome Back
                </Typography>
                <Typography variant="body2" sx={{ color: '#e8dcc8', opacity: 0.95, fontSize: '15px', fontWeight: 500 }}>
                  Sign in to continue to your job tracker
                </Typography>
              </Box>

              <CardContent sx={{ p: 5 }}>
                {error && (
                  <Paper sx={{ p: 2.5, mb: 3, backgroundColor: '#fce4ec', border: '1px solid #e91e63', borderRadius: 1.5 }}>
                    <Typography color="error" variant="body2" sx={{ fontWeight: 500 }}>
                      ⚠️ {error}
                    </Typography>
                  </Paper>
                )}

                <form onSubmit={handleLogin}>
                  <Stack spacing={3}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#1a3a52' }}>
                        Email Address
                      </Typography>
                      <TextField
                        fullWidth
                        type="email"
                        placeholder="student@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        InputProps={{
                          startAdornment: <EmailIcon sx={{ mr: 1.5, color: '#c9a961' }} />
                        }}
                        variant="outlined"
                        disabled={loading}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: '#ffffff',
                            color: '#1a3a52',
                            '&:hover fieldset': { borderColor: '#c9a961' },
                            '& fieldset': { borderColor: '#c9a961' }
                          },
                          '& .MuiOutlinedInput-input::placeholder': { color: '#999', opacity: 1 }
                        }}
                      />
                    </Box>

                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#1a3a52' }}>
                        Password
                      </Typography>
                      <TextField
                        fullWidth
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                          startAdornment: <LockIcon sx={{ mr: 1.5, color: '#c9a961' }} />
                        }}
                        variant="outlined"
                        disabled={loading}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: '#ffffff',
                            color: '#1a3a52',
                            '&:hover fieldset': { borderColor: '#c9a961' },
                            '& fieldset': { borderColor: '#c9a961' }
                          },
                          '& .MuiOutlinedInput-input::placeholder': { color: '#999', opacity: 1 }
                        }}
                      />
                    </Box>

                    <Box sx={{ pt: 1 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        disabled={loading}
                        sx={{
                          background: 'linear-gradient(135deg, #1a3a52 0%, #2c5282 100%)',
                          py: 1.8,
                          fontSize: '16px',
                          fontWeight: 'bold',
                          textTransform: 'none',
                          borderRadius: 1.5,
                          color: '#c9a961',
                          boxShadow: '0 8px 24px rgba(26, 58, 82, 0.4)',
                          transition: 'all 0.3s',
                          '&:hover': {
                            boxShadow: '0 12px 32px rgba(201, 169, 97, 0.6)',
                            transform: 'translateY(-2px)'
                          },
                          '&:disabled': {
                            opacity: 0.7
                          }
                        }}
                      >
                        {loading ? '⏳ Signing in...' : '✓ Sign In'}
                      </Button>
                    </Box>

                    <Box sx={{ backgroundColor: '#f0ebe3', p: 2.5, borderRadius: 1.5, border: '1px solid #c9a961' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1.5, color: '#1a3a52' }}>
                        📧 Demo Credentials
                      </Typography>
                      <Stack spacing={0.75}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2" color="text.secondary">Email:</Typography>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600, color: '#1a3a52' }}>
                            test@example.com
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2" color="text.secondary">Password:</Typography>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600, color: '#c9a961' }}>
                            password123
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>

                    <GoogleSignIn 
                      onSuccess={(profile) => {
                        localStorage.setItem('isLoggedIn', 'true');
                        localStorage.setItem('userProfile', JSON.stringify(profile));
                        if (onLogin) onLogin();
                        navigate('/');
                      }}
                      onError={(error) => setError(error.message)}
                    />

                    <Box sx={{ textAlign: 'center', borderTop: '1px solid #d4c5b9', pt: 2.5 }}>
                      <Typography variant="body2" color="text.secondary">
                        Don't have an account?{' '}
                        <RouterLink to="/register" style={{ color: '#1a3a52', fontWeight: 'bold', textDecoration: 'none' }}>
                          Sign Up
                        </RouterLink>
                      </Typography>
                    </Box>
                  </Stack>
                </form>
              </CardContent>
            </Card>

            {/* Footer Note */}
            <Box sx={{ mt: 3, textAlign: 'center', color: '#e8dcc8' }}>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                🔒 Your data is secure and encrypted
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
