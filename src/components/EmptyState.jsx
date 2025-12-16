import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

export default function EmptyState({ 
  icon: Icon,
  title, 
  description, 
  buttonText, 
  onButtonClick,
  imagePath 
}) {
  return (
    <Paper 
      sx={{ 
        p: 4, 
        textAlign: 'center', 
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)', 
        borderRadius: 2, 
        border: '2px dashed rgba(102, 126, 234, 0.3)',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Image */}
      {imagePath && (
        <Box 
          component="img"
          src={imagePath}
          alt={title}
          sx={{
            maxWidth: '100%',
            height: 'auto',
            maxHeight: '200px',
            mb: 3,
            opacity: 0.9
          }}
        />
      )}

      {/* Icon */}
      {Icon && !imagePath && (
        <Icon sx={{ fontSize: 80, color: 'text.disabled', mb: 2, opacity: 0.5 }} />
      )}

      {/* Title */}
      <Typography 
        variant="h5" 
        sx={{ fontWeight: 'bold', mb: 1, color: 'text.primary' }}
      >
        {title}
      </Typography>

      {/* Description */}
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ mb: 3, maxWidth: '400px', lineHeight: 1.6 }}
      >
        {description}
      </Typography>

      {/* Button */}
      {onButtonClick && buttonText && (
        <Button 
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onButtonClick}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            textTransform: 'none',
            fontWeight: 600
          }}
        >
          {buttonText}
        </Button>
      )}
    </Paper>
  );
}
