import React, { useState, useEffect } from 'react';
import { Snackbar, Alert, Box } from '@mui/material';
import { notificationManager } from '../utils/notificationUtils';

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const unsubscribe = notificationManager.subscribe((notification) => {
      setNotifications(prev => [...prev, notification]);
      
      if (notification.duration > 0) {
        setTimeout(() => {
          setNotifications(prev => prev.filter(n => n.id !== notification.id));
        }, notification.duration);
      }
    });

    return unsubscribe;
  }, []);

  const handleClose = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <Box sx={{ position: 'fixed', top: 80, right: 20, zIndex: 9999, maxWidth: 400 }}>
      {notifications.map((notification) => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={notification.duration}
          onClose={() => handleClose(notification.id)}
          sx={{ mb: 1 }}
        >
          <Alert
            onClose={() => handleClose(notification.id)}
            severity={notification.type}
            sx={{
              width: '100%',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              borderRadius: 2,
              fontWeight: 500
            }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </Box>
  );
}
