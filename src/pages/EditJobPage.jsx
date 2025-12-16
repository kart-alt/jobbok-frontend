import React from 'react';
import { useParams } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import JobForm from '../components/JobForm';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function EditJobPage() {
  const { id } = useParams();
  const { jobs } = useJobs();
  const job = jobs.find(j => j.id === id || j._id === id);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
        Edit Job Application
      </Typography>
      {job ? <JobForm initial={job} /> : <Typography>Job not found</Typography>}
    </Container>
  );
}
