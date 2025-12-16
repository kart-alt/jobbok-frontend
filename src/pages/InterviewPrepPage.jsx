import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Stack,
  Avatar,
  Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import ChecklistIcon from '@mui/icons-material/Checklist';
import SchoolIcon from '@mui/icons-material/School';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import StarsIcon from '@mui/icons-material/Stars';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const InterviewPrepPage = () => {
  const interviewTips = [
    {
      type: 'Phone Screen',
      tips: [
        'Have your resume ready in front of you',
        'Use a quiet environment with good phone signal',
        'Speak clearly and at a moderate pace',
        'Have a notepad to jot down important points',
        'Ask about the next steps before hanging up'
      ]
    },
    {
      type: 'Technical Interview',
      tips: [
        'Review data structures and algorithms',
        'Practice on LeetCode, HackerRank, or CodinGame',
        'Explain your thinking process out loud',
        'Ask clarifying questions about the problem',
        'Test your solution with sample inputs'
      ]
    },
    {
      type: 'Behavioral Interview',
      tips: [
        'Use the STAR method (Situation, Task, Action, Result)',
        'Prepare stories from your past experiences',
        'Discuss specific metrics or achievements',
        'Focus on your role and contributions',
        'Show enthusiasm about the role and company'
      ]
    },
    {
      type: 'System Design Interview',
      tips: [
        'Ask clarifying questions about requirements',
        'Draw diagrams and explain your approach',
        'Discuss trade-offs between options',
        'Consider scalability and performance',
        'Talk through your solution step by step'
      ]
    }
  ];

  const prepChecklist = [
    { task: 'Research the company', importance: 'High' },
    { task: 'Understand the job description', importance: 'High' },
    { task: 'Prepare your elevator pitch', importance: 'High' },
    { task: 'Review your past projects', importance: 'Medium' },
    { task: 'Practice common interview questions', importance: 'High' },
    { task: 'Prepare questions to ask', importance: 'Medium' },
    { task: 'Test your technology setup', importance: 'High' },
    { task: 'Get good sleep night before', importance: 'High' },
    { task: 'Plan your outfit', importance: 'Medium' },
    { task: 'Know the interview details (time, location, etc)', importance: 'High' }
  ];

  const resources = [
    { name: 'LeetCode', description: 'Algorithm and data structure practice', url: 'https://leetcode.com' },
    { name: 'Glassdoor', description: 'Company reviews and interview questions', url: 'https://glassdoor.com' },
    { name: 'Blind', description: 'Anonymous tech community and interview prep', url: 'https://blind.com' },
    { name: 'YouTube', description: 'Interview preparation channels and walkthroughs', url: 'https://youtube.com' },
    { name: 'System Design Primer', description: 'Learn system design concepts', url: 'https://github.com/donnemartin/system-design-primer' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar sx={{ width: 50, height: 50, background: 'linear-gradient(135deg, #1a3a52 0%, #2c5282 100%)' }}>
            <SchoolIcon sx={{ fontSize: 28, color: '#c9a961' }} />
          </Avatar>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1a3a52' }}>
              📚 Interview Preparation Guide
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Master your interviews with practical tips, checklists, and resources
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Stats Bar */}
      <Paper sx={{ p: 3, mb: 4, background: 'linear-gradient(135deg, rgba(26, 58, 82, 0.05) 0%, rgba(201, 169, 97, 0.05) 100%)', border: '1px solid #c9a961', borderRadius: 2 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          💡 Prepare for your interviews with our comprehensive guide and resources
        </Typography>
      </Paper>

      {/* Tips Sections */}
      <Grid container spacing={3} mb={4}>
        {interviewTips.map((category, idx) => (
          <Grid item xs={12} md={6} key={idx}>
            <Card sx={{ height: '100%', boxShadow: '0 2px 12px rgba(26, 58, 82, 0.08)', border: '1px solid #c9a961' }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <LightbulbIcon sx={{ color: '#c9a961', fontSize: 28 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a3a52' }}>
                    {category.type}
                  </Typography>
                </Box>
                <List dense>
                  {category.tips.map((tip, tipIdx) => (
                    <ListItem key={tipIdx}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Typography sx={{ color: '#c9a961', fontWeight: 'bold' }}>
                          {tipIdx + 1}
                        </Typography>
                      </ListItemIcon>
                      <ListItemText primary={tip} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pre-Interview Checklist */}
      <Card sx={{ mb: 4, boxShadow: '0 2px 12px rgba(26, 58, 82, 0.08)', border: '1px solid #c9a961' }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <ChecklistIcon sx={{ color: '#c9a961', fontSize: 28 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a3a52' }}>
              Pre-Interview Checklist
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {prepChecklist.map((item, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                <Box display="flex" alignItems="center" gap={2}>
                  <input type="checkbox" style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#1a3a52' }}>
                      {item.task}
                    </Typography>
                    <Chip
                      label={item.importance}
                      size="small"
                      variant="outlined"
                      sx={{
                        mt: 0.5,
                        borderColor: item.importance === 'High' ? '#e91e63' : '#c9a961',
                        color: item.importance === 'High' ? '#e91e63' : '#1a3a52'
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Useful Resources */}
      <Card sx={{ mb: 4, boxShadow: '0 2px 12px rgba(26, 58, 82, 0.08)', border: '1px solid #c9a961' }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <EmojiObjectsIcon sx={{ color: '#c9a961', fontSize: 28 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a3a52' }}>
              Helpful Resources
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {resources.map((resource, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card variant="outlined" sx={{ height: '100%', p: 2, textAlign: 'center', borderColor: '#c9a961' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: '#1a3a52' }}>
                    {resource.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                    {resource.description}
                  </Typography>
                  <Box
                    component="a"
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: '#1a3a52',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      '&:hover': { textDecoration: 'underline', color: '#c9a961' }
                    }}
                  >
                    Visit →
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Common Questions */}
      <Card sx={{ boxShadow: '0 2px 12px rgba(26, 58, 82, 0.08)', border: '1px solid #c9a961', mb: 4 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <StarsIcon sx={{ color: '#c9a961', fontSize: 28 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a3a52' }}>
              Common Interview Questions
            </Typography>
          </Box>
          <Stack spacing={1}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ color: '#1a3a52' }}>Tell me about yourself</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Keep it concise and relevant to the role. Include your background, relevant skills, and why you're interested in this position.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ color: '#1a3a52' }}>What are your strengths?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Choose 2-3 strengths relevant to the job. Provide specific examples from your experience that demonstrate these strengths.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ color: '#1a3a52' }}>What are your weaknesses?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Be honest but strategic. Choose a real weakness, explain what you've learned, and how you're working to improve it.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ color: '#1a3a52' }}>Why do you want to work here?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Research the company thoroughly. Focus on specific aspects of the company, role, or culture that appeal to you.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ color: '#1a3a52' }}>What are your salary expectations?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Research the market rate for the role and location. Be prepared with a range but let them make the first offer if possible.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </CardContent>
      </Card>

      {/* Final Tips */}
      <Box sx={{ p: 3, backgroundColor: '#f0ebe3', borderRadius: 2, border: '1px solid #c9a961', color: '#1a3a52' }}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <EmojiEventsIcon sx={{ fontSize: 28, color: '#c9a961' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a3a52' }}>
            Final Tips for Success
          </Typography>
        </Box>
        <List sx={{ color: '#1a3a52' }}>
          <ListItem>
            <ListItemText primary="✓ Be confident but humble - let your experience speak for itself" />
          </ListItem>
          <ListItem>
            <ListItemText primary="✓ Ask thoughtful questions about the role, team, and company culture" />
          </ListItem>
          <ListItem>
            <ListItemText primary="✓ Follow up with a thank you email within 24 hours" />
          </ListItem>
          <ListItem>
            <ListItemText primary="✓ Remember that interviews are two-way - you're evaluating them too" />
          </ListItem>
          <ListItem>
            <ListItemText primary="✓ Don't be discouraged by rejection - every interview is a learning opportunity" />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default InterviewPrepPage;
