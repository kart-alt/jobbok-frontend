import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

export default function StatsCard({ title, value, icon: Icon, color = '#c9a961' }) {
  return (
    <Card 
      sx={{ 
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        minHeight: '160px',
        background: 'linear-gradient(135deg, rgba(26, 58, 82, 0.05) 0%, rgba(201, 169, 97, 0.05) 100%)',
        border: '1.5px solid #c9a961',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'default',
        boxShadow: '0 2px 12px rgba(26, 58, 82, 0.08)',
        '&:hover': { 
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 32px rgba(201, 169, 97, 0.15)',
          borderColor: '#1a3a52'
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: -100,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(201, 169, 97, 0.2), transparent)',
          transition: 'left 0.6s',
        },
        '&:hover::before': {
          left: 100,
        }
      }}
    >
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 3 }}>
        <Box>
          <Typography 
            color="text.secondary" 
            sx={{ 
              fontSize: '12px', 
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              mb: 2,
              color: '#5a6c7d'
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="h3" 
            component="div" 
            sx={{ 
              fontWeight: 800,
              background: `linear-gradient(135deg, #1a3a52 0%, #c9a961 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '48px',
              lineHeight: 1
            }}
          >
            {value}
          </Typography>
        </Box>
        {Icon && (
          <Avatar 
            sx={{ 
              width: 50, 
              height: 50, 
              bgcolor: `${color}20`,
              color: color,
              alignSelf: 'flex-end'
            }}
          >
            <Icon sx={{ fontSize: 28 }} />
          </Avatar>
        )}
      </CardContent>
    </Card>
  );
}
