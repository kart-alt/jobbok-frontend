import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import SaveIcon from '@mui/icons-material/Save';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Avatar from '@mui/material/Avatar';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { notificationManager } from '../utils/notificationUtils';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({});
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);
    setForm(userData);
    setProfileImage(userData?.profileImage || null);
  }, []);

  const updateProfile = (data) => {
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('user', JSON.stringify(updated));
  };

  const handle = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    updateProfile(form);
    notificationManager.success('Profile updated successfully');
  };

  if (!user) return null;

  const onProfileImage = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfileImage(reader.result);
      updateProfile({ profileImage: reader.result });
      notificationManager.success('Profile picture updated');
    };
    reader.readAsDataURL(f);
  };

  const onResumeFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateProfile({ resume: { name: f.name, data: reader.result, uploadedAt: new Date().toISOString() } });
      notificationManager.success('Resume uploaded successfully');
    };
    reader.readAsDataURL(f);
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
        My Profile
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Picture and Basic Info */}
        <Grid item xs={12} md={4}>
          <Card sx={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              {/* Profile Image */}
              <Box position="relative" display="inline-block" mb={2}>
                <Avatar
                  src={profileImage}
                  sx={{
                    width: 140,
                    height: 140,
                    bgcolor: '#667eea',
                    fontSize: '50px',
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                >
                  {!profileImage && getInitials(form.name || 'User')}
                </Avatar>
                <Box
                  component="label"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: '#667eea',
                    color: 'white',
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: '#764ba2' }
                  }}
                >
                  <PhotoCameraIcon />
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={onProfileImage}
                  />
                </Box>
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                {form.name || 'Your Name'}
              </Typography>
              <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
                {form.email || 'your.email@example.com'}
              </Typography>
              <Chip label={form.status || 'Actively looking'} color="primary" variant="outlined" sx={{ mb: 2 }} />

              <Divider sx={{ my: 2 }} />

              <Stack spacing={1} sx={{ textAlign: 'left' }}>
                <Box display="flex" alignItems="center" gap={1}>
                  <EmailIcon sx={{ fontSize: 18, color: '#667eea' }} />
                  <Typography variant="body2">{form.email}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <PhoneIcon sx={{ fontSize: 18, color: '#667eea' }} />
                  <Typography variant="body2">{form.phone || 'Not added'}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Form Fields */}
        <Grid item xs={12} md={8}>
          <Card sx={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                Personal Information
              </Typography>

              <form onSubmit={submit}>
                <Stack spacing={2.5}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <BadgeIcon sx={{ fontSize: 18 }} /> Full Name
                    </Typography>
                    <TextField
                      fullWidth
                      value={form.name || ''}
                      onChange={handle('name')}
                      placeholder="John Doe"
                      variant="outlined"
                    />
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <EmailIcon sx={{ fontSize: 18 }} /> Email
                    </Typography>
                    <TextField
                      fullWidth
                      type="email"
                      value={form.email || ''}
                      onChange={handle('email')}
                      placeholder="john@example.com"
                      variant="outlined"
                    />
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <PhoneIcon sx={{ fontSize: 18 }} /> Phone
                    </Typography>
                    <TextField
                      fullWidth
                      value={form.phone || ''}
                      onChange={handle('phone')}
                      placeholder="+91-XXXX-XXXX-XX"
                      variant="outlined"
                    />
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Current Status
                    </Typography>
                    <TextField
                      select
                      fullWidth
                      value={form.status || 'Actively looking'}
                      onChange={handle('status')}
                      SelectProps={{ native: true }}
                      variant="outlined"
                    >
                      <option>Actively looking</option>
                      <option>Open to opportunities</option>
                      <option>Not looking</option>
                    </TextField>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Skills (comma-separated)
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      minRows={2}
                      placeholder="JavaScript, React, Node.js..."
                      value={(form.skills || []).join(', ')}
                      onChange={(e) => setForm({ ...form, skills: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
                    />
                  </Box>

                  <Stack direction="row" spacing={2} pt={2}>
                    <Button
                      variant="contained"
                      type="submit"
                      startIcon={<SaveIcon />}
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        textTransform: 'none'
                      }}
                    >
                      Save Changes
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </CardContent>
          </Card>

          {/* Resume Section */}
          <Card sx={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)', mt: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Resume
              </Typography>

              {user?.resume ? (
                <Box mb={2}>
                  <Paper sx={{ p: 2, backgroundColor: '#f0f4ff', border: '1px solid #667eea', borderRadius: 1, mb: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      📄 {user.resume.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Uploaded: {new Date(user.resume.uploadedAt).toLocaleDateString()}
                    </Typography>
                  </Paper>
                  <Button
                    href={user.resume.data}
                    download={user.resume.name}
                    variant="outlined"
                    startIcon={<FileDownloadIcon />}
                    size="small"
                  >
                    Download Resume
                  </Button>
                </Box>
              ) : (
                <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
                  No resume uploaded yet
                </Typography>
              )}

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
                Upload or Replace Resume
              </Typography>
              <Box
                component="label"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px dashed #667eea',
                  borderRadius: 1,
                  p: 2.5,
                  cursor: 'pointer',
                  backgroundColor: '#f0f4ff',
                  transition: 'all 0.3s',
                  '&:hover': {
                    backgroundColor: '#e8ecff',
                    borderColor: '#764ba2'
                  }
                }}
              >
                <input
                  hidden
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={onResumeFile}
                />
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                  📁 Click to upload or drag & drop<br />
                  <Typography variant="caption" color="text.secondary">
                    PDF, DOC, DOCX (Max 5MB)
                  </Typography>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Skills Section */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Your Skills
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {(form.skills || []).length > 0 ? (
                  form.skills.map(skill => (
                    <Chip
                      key={skill}
                      label={skill}
                      color="primary"
                      variant="outlined"
                      sx={{ mb: 1 }}
                    />
                  ))
                ) : (
                  <Typography color="text.secondary" variant="body2">
                    Add skills to your profile
                  </Typography>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
