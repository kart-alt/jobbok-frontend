import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useJobs } from '../context/JobContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const steps = ['Applied', 'Assessment', 'HR Round', 'Technical Interview', 'Final Decision'];

export default function StatusStepper({ job }) {
  const { updateStatus } = useJobs();

  const active = Math.max(0, steps.indexOf(job.currentStatus));

  const handleClick = (index) => {
    const next = steps[index];
    updateStatus(job.id, next);
  };

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
        Status Progression
      </Typography>
      <Stepper activeStep={active} alternativeLabel>
        {steps.map((label, idx) => (
          <Step
            key={label}
            onClick={() => handleClick(idx)}
            sx={{ cursor: 'pointer' }}
          >
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
