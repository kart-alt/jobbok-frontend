import React, { useMemo, useState } from 'react';
import { useJobs } from '../context/JobContext';
import InterviewCard from '../components/InterviewCard';
import EmptyState from '../components/EmptyState';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import EventNoteIcon from '@mui/icons-material/EventNote';

export default function InterviewSchedulePage() {
  const { interviews } = useJobs();
  const [filter, setFilter] = useState('upcoming');

  const now = new Date().getTime();
  const list = useMemo(() => {
    return interviews
      .filter(iv => filter === 'upcoming' ? new Date(iv.dateTime).getTime() >= now : new Date(iv.dateTime).getTime() < now)
      .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
  }, [interviews, filter, now]);

  const upcomingCount = interviews.filter(iv => new Date(iv.dateTime).getTime() >= now).length;
  const pastCount = interviews.filter(iv => new Date(iv.dateTime).getTime() < now).length;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar sx={{ width: 50, height: 50, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <EventNoteIcon sx={{ fontSize: 28 }} />
          </Avatar>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 'bold', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Interview Schedule
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage and prepare for your upcoming interviews
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box mb={3}>
        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={(e, val) => val && setFilter(val)}
            size="small"
          >
            <ToggleButton value="upcoming">
              Upcoming ({upcomingCount})
            </ToggleButton>
            <ToggleButton value="past">
              Past ({pastCount})
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Box>

      {list.length === 0 ? (
        <EmptyState
          imagePath="/images/interviews.svg"
          title={filter === 'upcoming' ? 'No upcoming interviews' : 'No past interviews'}
          description={filter === 'upcoming' ? 'You don\'t have any scheduled interviews yet. Keep applying to jobs!' : 'You haven\'t had any interviews yet.'}
        />
      ) : (
        <Box>
          {list.map(iv => <InterviewCard key={iv.id} iv={iv} />)}
        </Box>
      )}
    </Container>
  );
}
