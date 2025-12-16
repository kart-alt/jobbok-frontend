import React from 'react';
import JobList from '../components/JobList';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import WorkIcon from '@mui/icons-material/Work';
import Avatar from '@mui/material/Avatar';

export default function JobListPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar sx={{ width: 50, height: 50, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <WorkIcon sx={{ fontSize: 28 }} />
          </Avatar>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 'bold', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Job Applications
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage and track all your job applications in one place
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Stats Bar */}
      <Paper sx={{ p: 3, mb: 4, background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)', border: '1px solid rgba(102, 126, 234, 0.1)', borderRadius: 2 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          💡 Use the search and filters below to find specific applications or view by status
        </Typography>
      </Paper>

      <JobList />
    </Container>
  );
}
