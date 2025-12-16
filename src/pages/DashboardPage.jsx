import React, { useState, useEffect } from 'react';
import { useJobs } from '../context/JobContext';
import StatsCard from '../components/StatsCard';
import JobCard from '../components/JobCard';
import EmptyState from '../components/EmptyState';
import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Paper,
  LinearProgress,
  Avatar
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import StorageIcon from '@mui/icons-material/Storage';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import BarChartIcon from '@mui/icons-material/BarChart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function DashboardPage() {
  const { jobs } = useJobs();
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    setAnimateStats(true);
  }, []);

  const total = jobs.length;
  const pendingInterviews = jobs.filter(j => j.currentStatus === 'HR Round' || j.currentStatus === 'Technical Interview').length;
  const offers = jobs.filter(j => j.currentStatus === 'Final Decision').length;
  const rejections = jobs.filter(j => j.currentStatus === 'Rejected').length;
  const applied = jobs.filter(j => j.currentStatus === 'Applied').length;

  const recent = jobs.slice(0, 5);
  const successRate = total > 0 ? Math.round((offers / total) * 100) : 0;
  const progressRate = total > 0 ? Math.round(((total - rejections - applied) / total) * 100) : 0;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box mb={6}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar sx={{ width: 50, height: 50, background: 'linear-gradient(135deg, #1a3a52 0%, #2c5282 100%)' }}>
            <DashboardIcon sx={{ fontSize: 28, color: '#c9a961' }} />
          </Avatar>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1a3a52', mb: 0 }}>
              Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Track your job applications and career progress
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ opacity: animateStats ? 1 : 0, transform: animateStats ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.5s ease-out' }}>
            <StatsCard title="Total Applications" value={total} icon={StorageIcon} color="#c9a961" />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ opacity: animateStats ? 1 : 0, transform: animateStats ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.5s ease-out 0.1s' }}>
            <StatsCard title="Pending Interviews" value={pendingInterviews} icon={TrendingUpIcon} color="#c9a961" />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ opacity: animateStats ? 1 : 0, transform: animateStats ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.5s ease-out 0.2s' }}>
            <StatsCard title="Offers Received" value={offers} icon={CheckCircleIcon} color="#c9a961" />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ opacity: animateStats ? 1 : 0, transform: animateStats ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.5s ease-out 0.3s' }}>
            <StatsCard title="Rejections" value={rejections} icon={BlockIcon} color="#c9a961" />
          </Box>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, background: 'linear-gradient(135deg, rgba(26, 58, 82, 0.05) 0%, rgba(201, 169, 97, 0.05) 100%)', borderRadius: 2, border: '1px solid #c9a961', boxShadow: '0 2px 12px rgba(26, 58, 82, 0.08)' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#1a3a52' }}>📊 Application Status</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Applied', value: applied, fill: '#c9a961' },
                    { name: 'Interview', value: pendingInterviews, fill: '#1a3a52' },
                    { name: 'Offered', value: offers, fill: '#10b981' },
                    { name: 'Rejected', value: rejections, fill: '#ef4444' }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} (${value})`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#c9a961" />
                  <Cell fill="#1a3a52" />
                  <Cell fill="#10b981" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, background: 'linear-gradient(135deg, rgba(26, 58, 82, 0.05) 0%, rgba(201, 169, 97, 0.05) 100%)', borderRadius: 2, border: '1px solid #c9a961', boxShadow: '0 2px 12px rgba(26, 58, 82, 0.08)' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a3a52' }}>Success Rate</Typography>
              <BarChartIcon sx={{ color: '#c9a961', fontSize: 28 }} />
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#c9a961', mb: 1 }}>{successRate}%</Typography>
            <LinearProgress variant="determinate" value={successRate} sx={{ height: 8, borderRadius: 4, backgroundColor: '#c9a96133', '& .MuiLinearProgress-bar': { backgroundColor: '#c9a961' } }} />
            <Typography variant="caption" sx={{ mt: 1, display: 'block', color: '#5a6c7d' }}>
              {offers} out of {total} applications resulted in offers
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Quick Stats and Actions */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, background: 'linear-gradient(135deg, rgba(26, 58, 82, 0.05) 0%, rgba(201, 169, 97, 0.05) 100%)', borderRadius: 2, border: '1px solid #c9a961', boxShadow: '0 2px 12px rgba(26, 58, 82, 0.08)' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a3a52' }}>Application Progress</Typography>
              <TrendingUpIcon sx={{ color: '#c9a961', fontSize: 28 }} />
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#c9a961', mb: 1 }}>{progressRate}%</Typography>
            <LinearProgress variant="determinate" value={progressRate} sx={{ height: 8, borderRadius: 4, backgroundColor: '#c9a96133', '& .MuiLinearProgress-bar': { background: 'linear-gradient(90deg, #1a3a52 0%, #c9a961 100%)' } }} />
            <Typography variant="caption" sx={{ mt: 1, display: 'block', color: '#5a6c7d' }}>
              {total - rejections - applied} applications in progress
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, background: 'linear-gradient(135deg, rgba(26, 58, 82, 0.05) 0%, rgba(201, 169, 97, 0.05) 100%)', borderRadius: 2, border: '1px solid #c9a961', boxShadow: '0 2px 12px rgba(26, 58, 82, 0.08)' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a3a52' }}>Quick Actions</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button fullWidth variant="outlined" component={RouterLink} to="/jobs/search" sx={{ textTransform: 'none', borderColor: '#c9a961', color: '#1a3a52', fontWeight: 600, '&:hover': { backgroundColor: '#c9a96120', borderColor: '#c9a961' } }}>
                  🔍 Discover
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant="outlined" component={RouterLink} to="/jobs/add" sx={{ textTransform: 'none', borderColor: '#c9a961', color: '#1a3a52', fontWeight: 600, '&:hover': { backgroundColor: '#c9a96120', borderColor: '#c9a961' } }}>
                  ➕ Add Job
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant="outlined" component={RouterLink} to="/interviews" sx={{ textTransform: 'none', borderColor: '#c9a961', color: '#1a3a52', fontWeight: 600, '&:hover': { backgroundColor: '#c9a96120', borderColor: '#c9a961' } }}>
                  📅 Interviews
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant="outlined" component={RouterLink} to="/jobs" sx={{ textTransform: 'none', borderColor: '#c9a961', color: '#1a3a52', fontWeight: 600, '&:hover': { backgroundColor: '#c9a96120', borderColor: '#c9a961' } }}>
                  📋 All Jobs
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Applications */}
      <Box mb={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1a3a52' }}>
            Recent Applications
          </Typography>
          <Box>
            <Button component={RouterLink} to="/jobs/add" variant="contained" startIcon={<AddIcon />} sx={{ mr: 1, textTransform: 'none', fontWeight: 600, background: 'linear-gradient(135deg, #1a3a52 0%, #2c5282 100%)', color: '#c9a961' }}>
              Add Job
            </Button>
            <Button component={RouterLink} to="/jobs" variant="outlined" endIcon={<ArrowRightIcon />} sx={{ textTransform: 'none', fontWeight: 600, borderColor: '#c9a961', color: '#1a3a52' }}>
              View All
            </Button>
          </Box>
        </Box>

        {recent.length === 0 ? (
          <EmptyState
            imagePath="/images/hero.svg"
            title="No applications yet"
            description="Start tracking your job applications by adding your first one. Click the button below to get started!"
            buttonText="Add Your First Application"
            onButtonClick={() => {}}
          />
        ) : (
          <Grid container spacing={2}>
            {recent.map((j, idx) => (
              <Grid item xs={12} key={j.id} sx={{ opacity: animateStats ? 1 : 0, transform: animateStats ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.5s ease-out ${0.4 + idx * 0.05}s` }}>
                <JobCard job={j} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}
