import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';

interface TimerProps {
  initialTime: number;
  onTimeUp: () => void;
  isActive: boolean;
}

export const Timer: React.FC<TimerProps> = ({ initialTime, onTimeUp, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isActive, timeLeft, onTimeUp]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Box sx={{ textAlign: 'center', my: 2 }}>
      <Typography
        variant="h4"
        color={timeLeft <= 10 ? 'error' : 'text.primary'}
        sx={{ fontFamily: 'monospace' }}
      >
        {formatTime(timeLeft)}
      </Typography>
    </Box>
  );
}; 