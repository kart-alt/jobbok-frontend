import React from 'react';
import JobForm from '../components/JobForm';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function AddJobPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
        Add New Job Application
      </Typography>
      <JobForm />
    </Container>
  );
}
