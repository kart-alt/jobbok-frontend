import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Alert from '@mui/material/Alert';
import { notificationManager } from '../utils/notificationUtils';

export default function JobForm({ initial }) {
  const nav = useNavigate();
  const { addJob, updateJob, loading, error } = useJobs();
  const [form, setForm] = useState(initial || {
    company: '', 
    title: '', 
    status: 'Applied', 
    location: '', 
    salary: '', 
    jobLink: '', 
    appliedDate: new Date().toISOString().split('T')[0], 
    notes: '', 
    jobType: 'Full-time'
  });
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    if (initial) {
      const appliedDate = initial.appliedDate 
        ? (typeof initial.appliedDate === 'string' 
          ? initial.appliedDate.split('T')[0] 
          : new Date(initial.appliedDate).toISOString().split('T')[0])
        : new Date().toISOString().split('T')[0];
      
      setForm({
        ...initial,
        appliedDate,
        company: initial.company || initial.companyName || '',
        title: initial.title || initial.jobRole || '',
        status: initial.status || initial.currentStatus || 'Applied'
      });
    }
  }, [initial]);

  const handle = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLocalError('');
    
    if (!form.company || !form.title) {
      setLocalError('Company and Job Title are required');
      notificationManager.error('Company and Job Title are required');
      return;
    }

    try {
      const jobData = {
        company: form.company,
        title: form.title,
        status: form.status || 'Applied',
        location: form.location,
        salary: form.salary,
        jobLink: form.jobLink,
        appliedDate: form.appliedDate || new Date().toISOString().split('T')[0],
        notes: form.notes,
        jobType: form.jobType || 'Full-time'
      };

      if (initial && (initial._id || initial.id)) {
        await updateJob(initial._id || initial.id, jobData);
        notificationManager.success('Job application updated successfully');
      } else {
        await addJob(jobData);
        notificationManager.success('Job application added successfully');
      }
      nav('/jobs');
    } catch (err) {
      const errorMsg = err.message || 'Failed to save job';
      setLocalError(errorMsg);
      notificationManager.error(errorMsg);
    }
  };

  return (
    <Card>
      <CardContent>
        <Box mb={2}>
          <Button startIcon={<ArrowBackIcon />} onClick={() => nav('/jobs')}>
            Back to Jobs
          </Button>
        </Box>
        {(localError || error) && <Alert severity="error" sx={{ mb: 2 }}>{localError || error}</Alert>}
        <form onSubmit={submit}>
          <Stack spacing={2}>
            <TextField
              label="Company Name"
              required
              fullWidth
              value={form.company}
              onChange={handle('company')}
              placeholder="e.g., Google, Microsoft"
            />
            <TextField
              label="Job Title/Position"
              required
              fullWidth
              value={form.title}
              onChange={handle('title')}
              placeholder="e.g., Frontend Engineer"
            />
            <TextField
              label="Job Type"
              select
              fullWidth
              value={form.jobType || 'Full-time'}
              onChange={handle('jobType')}
            >
              <MenuItem value="Full-time">Full-time</MenuItem>
              <MenuItem value="Part-time">Part-time</MenuItem>
              <MenuItem value="Internship">Internship</MenuItem>
              <MenuItem value="Contract">Contract</MenuItem>
            </TextField>
            <TextField
              label="Status"
              select
              fullWidth
              value={form.status}
              onChange={handle('status')}
            >
              <MenuItem value="Applied">Applied</MenuItem>
              <MenuItem value="Assessment">Assessment</MenuItem>
              <MenuItem value="HR Round">HR Round</MenuItem>
              <MenuItem value="Technical Interview">Technical Interview</MenuItem>
              <MenuItem value="Final Decision">Final Decision</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </TextField>
            <TextField
              label="Location"
              fullWidth
              value={form.location}
              onChange={handle('location')}
              placeholder="e.g., Bangalore, Remote"
            />
            <TextField
              label="Salary/CTC"
              fullWidth
              value={form.salary}
              onChange={handle('salary')}
              placeholder="e.g., 12 LPA"
            />
            <TextField
              label="Job Link/URL"
              fullWidth
              value={form.jobLink}
              onChange={handle('jobLink')}
              placeholder="https://..."
              type="url"
            />
            <TextField
              label="Applied Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={form.appliedDate}
              onChange={handle('appliedDate')}
            />
            <TextField
              label="Notes/Description"
              multiline
              fullWidth
              minRows={4}
              value={form.notes}
              onChange={handle('notes')}
              placeholder="Add any notes about this application..."
            />
            <Stack direction="row" spacing={2}>
              <Button variant="contained" type="submit" startIcon={<SaveIcon />} disabled={loading}>
                {loading ? 'Saving...' : (initial ? 'Update Job' : 'Add Job')}
              </Button>
              <Button variant="outlined" onClick={() => nav('/jobs')} disabled={loading}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}
