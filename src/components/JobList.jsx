import React, { useMemo, useState } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import JobCard from './JobCard';
import { useJobs } from '../context/JobContext';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link as RouterLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';

export default function JobList() {
  const { jobs, loading } = useJobs();
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('All');
  const [sort, setSort] = useState('date');
  const [jobType, setJobType] = useState('All');

  const filtered = useMemo(() => {
    let res = jobs.slice();
    if (q) res = res.filter(j => (j.company || j.companyName || '').toLowerCase().includes(q.toLowerCase()) || (j.title || j.jobRole || '').toLowerCase().includes(q.toLowerCase()));
    if (status !== 'All') res = res.filter(j => (j.status || j.currentStatus) === status);
    if (jobType !== 'All') res = res.filter(j => (j.jobType || j.type) === jobType);
    
    if (sort === 'date') res.sort((a, b) => new Date(b.appliedDate || b.dateApplied) - new Date(a.appliedDate || a.dateApplied));
    if (sort === 'company') res.sort((a, b) => (a.company || a.companyName || '').localeCompare(b.company || b.companyName || ''));
    if (sort === 'title') res.sort((a, b) => (a.title || a.jobRole || '').localeCompare(b.title || b.jobRole || ''));
    
    return res;
  }, [jobs, q, status, sort, jobType]);

  if (loading) return <CircularProgress />;

  return (
    <div>
      <Box display="flex" gap={2} mb={3} flexWrap="wrap" alignItems="flex-end">
        <TextField
          label="Search"
          placeholder="Company or Position"
          value={q}
          onChange={e => setQ(e.target.value)}
          size="small"
          sx={{ flex: 1, minWidth: 200 }}
          InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} /> }}
        />
        <FormControl size="small" sx={{ minWidth: 130 }}>
          <InputLabel>Job Type</InputLabel>
          <Select label="Job Type" value={jobType} onChange={(e) => setJobType(e.target.value)}>
            <MenuItem value="All">All Types</MenuItem>
            <MenuItem value="Full-time">Full-time</MenuItem>
            <MenuItem value="Internship">Internship</MenuItem>
            <MenuItem value="Part-time">Part-time</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Status</InputLabel>
          <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value="All">All Status</MenuItem>
            <MenuItem value="Applied">Applied</MenuItem>
            <MenuItem value="Assessment">Assessment</MenuItem>
            <MenuItem value="HR Round">HR Round</MenuItem>
            <MenuItem value="Technical Interview">Technical Interview</MenuItem>
            <MenuItem value="Final Decision">Final Decision</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Sort By</InputLabel>
          <Select label="Sort By" value={sort} onChange={(e) => setSort(e.target.value)}>
            <MenuItem value="date">📅 Date Applied</MenuItem>
            <MenuItem value="company">🏢 Company Name</MenuItem>
            <MenuItem value="title">💼 Job Title</MenuItem>
          </Select>
        </FormControl>
        <Stack direction="row" sx={{ marginLeft: 'auto' }}>
          <Button variant="contained" component={RouterLink} to="/jobs/add" startIcon={<AddIcon />}>
            Add Job
          </Button>
        </Stack>
      </Box>

      <Box>
        <Typography sx={{ mb: 2, fontSize: '14px', color: 'text.secondary' }}>
          {filtered.length} job{filtered.length !== 1 ? 's' : ''} found
        </Typography>
        {filtered.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary">No jobs found matching your filters</Typography>
          </Box>
        ) : (
          filtered.map(j => <JobCard key={j.id || j._id} job={j} />)
        )}
      </Box>
    </div>
  );
}
