import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  Grid,
  Avatar,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UpdateIcon from '@mui/icons-material/Update';
import { useJobs } from '../context/JobContext';
import { notificationManager } from '../utils/notificationUtils';

export default function UpdatesPage() {
  const { jobs } = useJobs();
  const [updates, setUpdates] = useState(() => JSON.parse(localStorage.getItem('jobUpdates') || '[]'));
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ jobId: '', title: '', description: '', date: new Date().toISOString().split('T')[0] });

  const handleAddUpdate = () => {
    setFormData({ jobId: '', title: '', description: '', date: new Date().toISOString().split('T')[0] });
    setEditingId(null);
    setOpenDialog(true);
  };

  const handleEditUpdate = (update) => {
    setFormData(update);
    setEditingId(update.id);
    setOpenDialog(true);
  };

  const handleSaveUpdate = () => {
    if (!formData.jobId || !formData.title || !formData.description) {
      notificationManager.error('Please fill all required fields');
      return;
    }

    let newUpdates;
    if (editingId) {
      newUpdates = updates.map(u => u.id === editingId ? { ...formData, id: editingId } : u);
      notificationManager.success('Update edited successfully');
    } else {
      newUpdates = [...updates, { ...formData, id: Date.now() }];
      notificationManager.success('Update added successfully');
    }
    
    setUpdates(newUpdates);
    localStorage.setItem('jobUpdates', JSON.stringify(newUpdates));
    setOpenDialog(false);
  };

  const handleDeleteUpdate = (id) => {
    if (window.confirm('Are you sure you want to delete this update?')) {
      const newUpdates = updates.filter(u => u.id !== id);
      setUpdates(newUpdates);
      localStorage.setItem('jobUpdates', JSON.stringify(newUpdates));
      notificationManager.success('Update deleted successfully');
    }
  };

  const getJobName = (jobId) => {
    const job = jobs.find(j => j.id === jobId || j._id === jobId);
    return job ? `${job.jobRole || job.title} at ${job.companyName || job.company}` : 'Unknown Job';
  };

  const sortedUpdates = [...updates].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar sx={{ width: 50, height: 50, background: 'linear-gradient(135deg, #1a3a52 0%, #2c5282 100%)' }}>
            <UpdateIcon sx={{ fontSize: 28, color: '#c9a961' }} />
          </Avatar>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1a3a52', mb: 0 }}>
              📝 Daily Updates
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Track day-to-day progress on your job applications and internships
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Stats Bar */}
      <Paper sx={{ p: 3, mb: 4, background: 'linear-gradient(135deg, rgba(26, 58, 82, 0.05) 0%, rgba(201, 169, 97, 0.05) 100%)', border: '1px solid #c9a961', borderRadius: 2 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          💡 Add updates to track your progress, interview feedback, and important milestones
        </Typography>
      </Paper>

      {/* Add Update Button */}
      <Box mb={4}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddUpdate}
          sx={{
            background: 'linear-gradient(135deg, #1a3a52 0%, #2c5282 100%)',
            color: '#c9a961',
            fontWeight: 600,
            textTransform: 'none'
          }}
        >
          Add New Update
        </Button>
      </Box>

      {/* Updates List */}
      <Grid container spacing={3}>
        {sortedUpdates.length === 0 ? (
          <Grid item xs={12}>
            <Paper sx={{ p: 4, textAlign: 'center', backgroundColor: '#f0ebe3', border: '1px solid #c9a961' }}>
              <Typography variant="h6" sx={{ color: '#1a3a52', mb: 1 }}>
                No updates yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Start adding updates to track your job search progress
              </Typography>
            </Paper>
          </Grid>
        ) : (
          sortedUpdates.map((update) => (
            <Grid item xs={12} key={update.id}>
              <Card sx={{ boxShadow: '0 2px 12px rgba(26, 58, 82, 0.08)', border: '1px solid #c9a961' }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={2}>
                    <Box flex={1}>
                      <Typography variant="subtitle2" sx={{ color: '#c9a961', fontWeight: 600, mb: 0.5 }}>
                        {new Date(update.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a3a52', mb: 1 }}>
                        {update.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#5a6c7d', mb: 1.5 }}>
                        {update.description}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#c9a961', fontWeight: 600 }}>
                        📌 {getJobName(update.jobId)}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => handleEditUpdate(update)}
                        sx={{ borderColor: '#c9a961', color: '#1a3a52', textTransform: 'none' }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteUpdate(update.id)}
                        sx={{ borderColor: '#ef4444', color: '#ef4444', textTransform: 'none' }}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Add/Edit Update Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: '#1a3a52', fontWeight: 'bold' }}>
          {editingId ? 'Edit Update' : 'Add New Update'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2.5} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Select Job/Internship</InputLabel>
              <Select
                value={formData.jobId}
                onChange={(e) => setFormData({ ...formData, jobId: e.target.value })}
                label="Select Job/Internship"
              >
                {jobs.map((job) => (
                  <MenuItem key={job.id || job._id} value={job.id || job._id}>
                    {job.jobRole || job.title} at {job.companyName || job.company}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Update Title"
              fullWidth
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Interview Scheduled, Offer Received"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#c9a961' },
                  '& fieldset': { borderColor: '#c9a961' }
                }
              }}
            />

            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Add details about this update..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#c9a961' },
                  '& fieldset': { borderColor: '#c9a961' }
                }
              }}
            />

            <TextField
              label="Date"
              type="date"
              fullWidth
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': { borderColor: '#c9a961' },
                  '& fieldset': { borderColor: '#c9a961' }
                }
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSaveUpdate}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #1a3a52 0%, #2c5282 100%)',
              color: '#c9a961'
            }}
          >
            {editingId ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
