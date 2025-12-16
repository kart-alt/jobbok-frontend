import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
  Grid,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Avatar,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BusinessIcon from '@mui/icons-material/Business';
import LinkIcon from '@mui/icons-material/Link';
import { searchJobs } from '../services/jobSearchService';
import { useJobs } from '../context/JobContext';

const JobSearchPage = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { addJob } = useJobs();
  const [addingJob, setAddingJob] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const results = await searchJobs(query, location, salary);
      setJobs(results);
      if (results.length === 0) {
        setError('No jobs found. Try different search criteria.');
      }
    } catch (err) {
      setError('Failed to search jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setOpenDialog(true);
  };

  const handleAddToTracker = async () => {
    setAddingJob(true);
    try {
      await addJob({
        title: selectedJob.title,
        company: selectedJob.company,
        location: selectedJob.location,
        salary: selectedJob.salary,
        jobLink: selectedJob.link,
        status: 'Applied',
        appliedDate: new Date().toISOString().split('T')[0],
        notes: `Source: ${selectedJob.source}\n${selectedJob.description}`
      });
      setOpenDialog(false);
      alert('Job added to your tracker!');
    } catch (err) {
      alert('Failed to add job: ' + err.message);
    } finally {
      setAddingJob(false);
    }
  };

  const getDaysAgo = (date) => {
    const days = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days}d ago`;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar sx={{ width: 50, height: 50, background: 'linear-gradient(135deg, #1a3a52 0%, #2c5282 100%)' }}>
            <SearchIcon sx={{ fontSize: 28, color: '#c9a961' }} />
          </Avatar>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1a3a52' }}>
              🔍 Discover Jobs
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Search and explore job opportunities from top companies
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Stats Bar */}
      <Paper sx={{ p: 3, mb: 4, background: 'linear-gradient(135deg, rgba(26, 58, 82, 0.05) 0%, rgba(201, 169, 97, 0.05) 100%)', border: '1px solid #c9a961', borderRadius: 2 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          💡 Search for jobs by title, location, or salary range
        </Typography>
      </Paper>

      {/* Search Form */}
      <Card sx={{ boxShadow: '0 2px 12px rgba(26, 58, 82, 0.08)', border: '1px solid #c9a961', mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <form onSubmit={handleSearch}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  placeholder="Job title, role, company..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ mr: 1.5, color: '#c9a961' }} />
                  }}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': { borderColor: '#c9a961' },
                      '& fieldset': { borderColor: '#c9a961' }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  InputProps={{
                    startAdornment: <LocationOnIcon sx={{ mr: 1.5, color: '#c9a961' }} />
                  }}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': { borderColor: '#c9a961' },
                      '& fieldset': { borderColor: '#c9a961' }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  placeholder="Min salary (e.g., 100000)"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  InputProps={{
                    startAdornment: <MonetizationOnIcon sx={{ mr: 1.5, color: '#c9a961' }} />
                  }}
                  variant="outlined"
                  type="number"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': { borderColor: '#c9a961' },
                      '& fieldset': { borderColor: '#c9a961' }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  disabled={loading}
                  sx={{
                    background: 'linear-gradient(135deg, #1a3a52 0%, #2c5282 100%)',
                    py: 1.8,
                    fontSize: '16px',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    borderRadius: 1.5,
                    color: '#c9a961',
                    boxShadow: '0 4px 15px rgba(26, 58, 82, 0.2)'
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Search Jobs'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Error Message */}
      {error && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Job Results */}
      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid item xs={12} key={job.id}>
            <Card
              sx={{
                boxShadow: '0 2px 12px rgba(26, 58, 82, 0.08)',
                border: '1px solid #c9a961',
                transition: 'all 0.3s',
                '&:hover': {
                  boxShadow: '0 8px 28px rgba(201, 169, 97, 0.15)',
                  transform: 'translateY(-4px)'
                },
                cursor: 'pointer'
              }}
              onClick={() => handleViewDetails(job)}
            >
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={8}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#1a3a52' }}>
                      {job.title}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                      <Chip
                        icon={<BusinessIcon />}
                        label={job.company}
                        variant="outlined"
                        size="small"
                        sx={{ borderColor: '#c9a961', color: '#1a3a52' }}
                      />
                      <Chip
                        icon={<LocationOnIcon />}
                        label={job.location}
                        variant="outlined"
                        size="small"
                        sx={{ borderColor: '#c9a961', color: '#1a3a52' }}
                      />
                      <Chip
                        label={getDaysAgo(job.posted)}
                        size="small"
                        variant="outlined"
                        sx={{ borderColor: '#c9a961', color: '#1a3a52' }}
                      />
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {job.description}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Chip
                        label={`$${(parseInt(job.salary.split('-')[0]) / 1000).toFixed(0)}k - $${(parseInt(job.salary.split('-')[1]) / 1000).toFixed(0)}k`}
                        icon={<MonetizationOnIcon />}
                        sx={{ backgroundColor: '#f0ebe3', color: '#1a3a52', borderColor: '#c9a961' }}
                        size="small"
                      />
                      <Chip
                        label={job.type}
                        size="small"
                        sx={{ backgroundColor: '#f0ebe3', color: '#1a3a52', borderColor: '#c9a961' }}
                      />
                      <Chip
                        label={`📍 ${job.source}`}
                        size="small"
                        variant="outlined"
                        sx={{ borderColor: '#c9a961', color: '#1a3a52' }}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <Button
                      variant="contained"
                      sx={{ background: 'linear-gradient(135deg, #1a3a52 0%, #2c5282 100%)', color: '#c9a961' }}
                      startIcon={<LinkIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(job.link, '_blank');
                      }}
                    >
                      View Job
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{ borderColor: '#c9a961', color: '#1a3a52' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(job);
                      }}
                    >
                      Add to Tracker
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {jobs.length === 0 && !loading && !error && (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h6" sx={{ color: '#5a6c7d' }}>
            Start searching to explore job opportunities
          </Typography>
        </Box>
      )}

      {/* Job Details Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        {selectedJob && (
          <>
            <DialogTitle sx={{ color: '#1a3a52', fontWeight: 'bold' }}>{selectedJob.title}</DialogTitle>
            <DialogContent>
              <Stack spacing={2} sx={{ mt: 2 }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Company</Typography>
                  <Typography variant="body1">{selectedJob.company}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Location</Typography>
                  <Typography variant="body1">{selectedJob.location}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Salary Range</Typography>
                  <Typography variant="body1">${selectedJob.salary}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Description</Typography>
                  <Typography variant="body2">{selectedJob.description}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Source</Typography>
                  <Typography variant="body1">{selectedJob.source}</Typography>
                </Box>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button
                onClick={handleAddToTracker}
                variant="contained"
                disabled={addingJob}
                sx={{ background: 'linear-gradient(135deg, #1a3a52 0%, #2c5282 100%)', color: '#c9a961' }}
              >
                {addingJob ? 'Adding...' : 'Add to Tracker'}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default JobSearchPage;
