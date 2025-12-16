import React from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import StatusStepper from '../components/StatusStepper';
import InterviewCard from '../components/InterviewCard';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { notificationManager } from '../utils/notificationUtils';

export default function JobDetailsPage() {
  const { id } = useParams();
  const { jobs, interviews, deleteJob } = useJobs();
  const nav = useNavigate();
  const job = jobs.find(j => j.id === id || j._id === id);

  if (!job) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          Job not found
        </Typography>
        <Button component={RouterLink} to="/jobs" startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>
          Back to Jobs
        </Button>
      </Container>
    );
  }

  const related = interviews.filter(iv => iv.jobId === job.id || iv.jobId === job._id);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this job application?')) {
      deleteJob(job.id || job._id);
      notificationManager.success('Job deleted successfully');
      nav('/jobs');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBackIcon />} component={RouterLink} to="/jobs" sx={{ mb: 2 }}>
        Back to Jobs
      </Button>

      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
        <div>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
            {job.jobRole || job.title}
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="h6" color="text.secondary">
              {job.companyName || job.company}
            </Typography>
            <Chip label={job.currentStatus || job.status} color="primary" />
          </Stack>
        </div>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" component={RouterLink} to={`/jobs/${job.id || job._id}/edit`} startIcon={<EditIcon />}>
            Edit
          </Button>
          <Button color="error" variant="outlined" onClick={handleDelete} startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Job Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography color="text.secondary" sx={{ fontSize: '12px' }}>
                    LOCATION
                  </Typography>
                  <Typography variant="body1">{job.location || 'Not specified'}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography color="text.secondary" sx={{ fontSize: '12px' }}>
                    SALARY
                  </Typography>
                  <Typography variant="body1">{job.salary || 'Not specified'}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography color="text.secondary" sx={{ fontSize: '12px' }}>
                    PACKAGE
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#667eea' }}>
                    {job.package || 'Not specified'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography color="text.secondary" sx={{ fontSize: '12px' }}>
                    APPLIED DATE
                  </Typography>
                  <Typography variant="body1">{job.appliedDate || job.dateApplied || 'Not specified'}</Typography>
                </Grid>
                {job.notes && (
                  <Grid item xs={12}>
                    <Typography color="text.secondary" sx={{ fontSize: '12px' }}>
                      NOTES
                    </Typography>
                    <Typography variant="body2">{job.notes}</Typography>
                  </Grid>
                )}
                {job.jobLink && (
                  <Grid item xs={12}>
                    <Button
                      href={job.jobLink}
                      target="_blank"
                      variant="outlined"
                      endIcon={<OpenInNewIcon />}
                      size="small"
                    >
                      View Job Posting
                    </Button>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Status
              </Typography>
              <Chip
                label={job.currentStatus || job.status}
                color="primary"
                sx={{ mb: 2 }}
                variant="outlined"
              />
              <Typography color="text.secondary" sx={{ fontSize: '12px', display: 'block', mb: 2 }}>
                Click on a step below to update status
              </Typography>
              <StatusStepper job={job} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {related.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Scheduled Interviews
            </Typography>
            {related.map(iv => <InterviewCard key={iv.id || iv._id} iv={iv} />)}
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
