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
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import { useJobs } from '../context/JobContext';

export default function RegisterPage({ onLogin }) {
  const navigate = useNavigate();
  const { register } = useJobs();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !phone || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    
    try {
      await register(name, email, password, phone);
      if (onLogin) onLogin();
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a3a52 0%, #2c5282 50%, #1a3a52 100%)', display: 'flex', alignItems: 'center', py: 4 }}>
      <Container maxWidth="sm">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Avatar sx={{ width: 64, height: 64, bgcolor: '#c9a961', mb: 2, fontSize: '32px', boxShadow: '0 8px 25px rgba(201, 169, 97, 0.3)' }}>
            <WorkIcon sx={{ fontSize: 40, color: '#1a3a52' }} />
          </Avatar>
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#c9a961', textAlign: 'center' }}>
            Job Book
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(232, 220, 200, 0.9)', textAlign: 'center', mt: 1 }}>
            Create your account to start tracking jobs
          </Typography>
        </Box>

        <Card sx={{ boxShadow: '0 30px 80px rgba(0,0,0,0.4)', borderRadius: 3, overflow: 'hidden', backgroundColor: '#f8f7f4', border: '1px solid #c9a961' }}>
          <CardContent sx={{ p: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleRegister}>
              <Stack spacing={2.5}>
                <TextField
                  label="Full Name"
                  required
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  variant="outlined"
                  disabled={loading}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': { borderColor: '#c9a961' },
                      '& fieldset': { borderColor: '#c9a961' }
                    },
                    '& .MuiInputBase-input::placeholder': { color: '#999', opacity: 1 }
                  }}
                />

                <TextField
                  label="Email Address"
                  required
                  fullWidth
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  variant="outlined"
                  disabled={loading}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': { borderColor: '#c9a961' },
                      '& fieldset': { borderColor: '#c9a961' }
                    },
                    '& .MuiInputBase-input::placeholder': { color: '#999', opacity: 1 }
                  }}
                />

                <TextField
                  label="Mobile Number"
                  required
                  fullWidth
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91-XXXX-XXXX-XX"
                  variant="outlined"
                  disabled={loading}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': { borderColor: '#c9a961' },
                      '& fieldset': { borderColor: '#c9a961' }
                    },
                    '& .MuiInputBase-input::placeholder': { color: '#999', opacity: 1 }
                  }}
                />

                <TextField
                  label="Password"
                  required
                  fullWidth
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  variant="outlined"
                  disabled={loading}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': { borderColor: '#c9a961' },
                      '& fieldset': { borderColor: '#c9a961' }
                    },
                    '& .MuiInputBase-input::placeholder': { color: '#999', opacity: 1 }
                  }}
                />

                <TextField
                  label="Confirm Password"
                  required
                  fullWidth
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  variant="outlined"
                  disabled={loading}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': { borderColor: '#c9a961' },
                      '& fieldset': { borderColor: '#c9a961' }
                    },
                    '& .MuiInputBase-input::placeholder': { color: '#999', opacity: 1 }
                  }}
                />

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  type="submit"
                  disabled={loading}
                  sx={{
                    background: 'linear-gradient(135deg, #1a3a52 0%, #2c5282 100%)',
                    mt: 1,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: '16px',
                    color: '#c9a961',
                    boxShadow: '0 8px 24px rgba(26, 58, 82, 0.4)',
                    '&:hover': {
                      boxShadow: '0 12px 32px rgba(201, 169, 97, 0.6)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>

                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Already have an account?{' '}
                    <RouterLink to="/login" style={{ color: '#1a3a52', fontWeight: 'bold', textDecoration: 'none' }}>
                      Sign In
                    </RouterLink>
                  </Typography>
                </Box>
              </Stack>
            </form>

            <Paper sx={{ p: 2.5, backgroundColor: '#f0ebe3', borderRadius: 1.5, border: '1px solid #c9a961', mt: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1.5, color: '#1a3a52' }}>
                💡 Quick Registration
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Create an account with your details. Your data is stored securely in MongoDB.
              </Typography>
            </Paper>
          </CardContent>
        </Card>

        <Box sx={{ mt: 3, textAlign: 'center', color: '#e8dcc8' }}>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            🔒 Your data is secure and encrypted
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
