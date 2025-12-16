import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useJobs } from '../context/JobContext';
import { notificationManager } from '../utils/notificationUtils';

const statusColors = {
  'Applied': '#c9a961',
  'Assessment': '#60a5fa',
  'HR Round': '#f59e0b',
  'Technical Interview': '#8b5cf6',
  'Final Decision': '#10b981',
  'Rejected': '#ef4444'
};

const statusTextColors = {
  'Applied': '#1a3a52',
  'Assessment': '#ffffff',
  'HR Round': '#ffffff',
  'Technical Interview': '#ffffff',
  'Final Decision': '#ffffff',
  'Rejected': '#ffffff'
};

export default function JobCard({ job }) {
  const { deleteJob } = useJobs();

  const getStatusStyles = (status) => ({
    backgroundColor: statusColors[status] || '#c9a961',
    color: statusTextColors[status] || '#1a3a52'
  });

  const daysAgo = Math.floor((Date.now() - new Date(job.appliedDate || job.dateApplied).getTime()) / (1000 * 60 * 60 * 24));

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this job application?')) {
      try {
        await deleteJob(job.id || job._id);
        notificationManager.success('Job application deleted successfully');
      } catch (error) {
        notificationManager.error('Failed to delete job application');
      }
    }
  };

  return (
    <Card 
      sx={{ 
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '1.5px solid #c9a961',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 12px rgba(26, 58, 82, 0.08)',
        '&:hover': { 
          boxShadow: '0 8px 28px rgba(201, 169, 97, 0.15)',
          transform: 'translateY(-4px)',
          borderColor: '#1a3a52'
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #1a3a52 0%, #c9a961 100%)',
          opacity: 0,
          transition: 'opacity 0.4s',
        },
        '&:hover::before': {
          opacity: 1,
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={2}>
          <Box flex={1}>
            {/* Job Title and Company */}
            <Box mb={2}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5, fontSize: '18px', color: '#1a3a52' }}>
                {job.jobRole || job.title}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 1.5, alignItems: 'center' }}>
                <BusinessIcon sx={{ fontSize: 18, color: '#c9a961' }} />
                <Typography color="text.secondary" sx={{ fontSize: '15px', fontWeight: 500 }}>
                  {job.companyName || job.company}
                </Typography>
              </Stack>
            </Box>

            {/* Job Details */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2 }} sx={{ alignItems: 'flex-start', mb: 2 }}>
              {job.location && (
                <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                  <LocationOnIcon sx={{ fontSize: 16, color: '#c9a961', flexShrink: 0 }} />
                  <Typography color="text.secondary" sx={{ fontSize: '13px' }}>
                    {job.location}
                  </Typography>
                </Stack>
              )}
              {job.package && (
                <>
                  <Typography sx={{ fontSize: '13px', color: 'text.secondary' }}>•</Typography>
                  <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#10b981' }}>
                    {job.package}
                  </Typography>
                </>
              )}
            </Stack>

            {/* Applied Date */}
            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
              <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
              <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>
                Applied {daysAgo} day{daysAgo !== 1 ? 's' : ''} ago
              </Typography>
            </Stack>
          </Box>

          {/* Status and Actions */}
          <Stack direction="column" spacing={1.5} alignItems="flex-end" sx={{ minWidth: 'fit-content' }}>
            <Box sx={{ ...getStatusStyles(job.currentStatus || job.status), px: 2, py: 1, borderRadius: 1, fontWeight: 600, fontSize: '13px' }}>
              {job.currentStatus || job.status}
            </Box>
            <Stack direction="row" spacing={0.5}>
              <Button
                size="small"
                variant="contained"
                component={RouterLink}
                to={`/jobs/${job.id || job._id}`}
                endIcon={<ArrowRightIcon sx={{ fontSize: 16 }} />}
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '12px',
                  background: 'linear-gradient(135deg, #1a3a52 0%, #2c5282 100%)',
                  color: '#c9a961',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(26, 58, 82, 0.4)'
                  }
                }}
              >
                View
              </Button>
              <IconButton
                size="small"
                component={RouterLink}
                to={`/jobs/${job.id || job._id}/edit`}
                sx={{ color: '#c9a961' }}
              >
                <EditIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton
                size="small"
                onClick={handleDelete}
                sx={{ color: '#ef4444' }}
              >
                <DeleteIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Stack>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
