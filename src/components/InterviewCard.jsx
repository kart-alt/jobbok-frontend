import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useJobs } from '../context/JobContext';
import { notificationManager } from '../utils/notificationUtils';

export default function InterviewCard({ iv }) {
  const { deleteInterview } = useJobs();
  const dateTime = new Date(iv.dateTime);
  const isUpcoming = dateTime > new Date();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this interview?')) {
      try {
        await deleteInterview(iv.id || iv._id);
        notificationManager.success('Interview deleted successfully');
      } catch (error) {
        notificationManager.error('Failed to delete interview');
      }
    }
  };

  const handleCopyLink = () => {
    if (iv.meetingLink) {
      navigator.clipboard.writeText(iv.meetingLink);
      notificationManager.success('Meeting link copied to clipboard');
    }
  };

  return (
    <Card sx={{ mb: 2, borderLeft: isUpcoming ? '4px solid #667eea' : '4px solid #999', transition: 'all 0.3s', '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.15)' } }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap={2}>
          <Box flex={1}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              {iv.roundName}
            </Typography>

            <Stack spacing={1} sx={{ mb: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <EventIcon sx={{ fontSize: 18, color: '#667eea' }} />
                <Typography sx={{ fontSize: '14px' }}>
                  {dateTime.toLocaleDateString()} at {dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <PersonIcon sx={{ fontSize: 18, color: '#667eea' }} />
                <Typography sx={{ fontSize: '14px' }}>
                  {iv.interviewerDetails}
                </Typography>
              </Stack>

              {iv.notes && (
                <Typography sx={{ fontSize: '13px', color: 'text.secondary', fontStyle: 'italic', mt: 1 }}>
                  {iv.notes}
                </Typography>
              )}
            </Stack>

            <Chip label={isUpcoming ? 'Upcoming' : 'Past'} color={isUpcoming ? 'primary' : 'default'} size="small" />
          </Box>

          <Stack direction="column" spacing={1} alignItems="flex-end">
            {iv.meetingLink && (
              <Button
                variant="contained"
                endIcon={<VideoCallIcon />}
                href={iv.meetingLink}
                target="_blank"
                size="small"
                sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}
              >
                Join
              </Button>
            )}
            <Stack direction="row" spacing={0.5}>
              {iv.meetingLink && (
                <IconButton
                  size="small"
                  onClick={handleCopyLink}
                  sx={{ color: '#667eea' }}
                  title="Copy meeting link"
                >
                  📋
                </IconButton>
              )}
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
