import React from 'react';
import { Box, Button, Typography, Grid, Paper } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

const levels = [1, 2, 3, 4, 5, 'more5'] as const;

type Level = typeof levels[number];

const buttonColor = '#ffb300'; // やや暗めのゴールド
const starColor = '#ffd600'; // 明るいゴールド

export const LevelSelectPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSelect = (level: Level) => {
    navigate(`/problems/${level}`);
  };

  return (
    <Box sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Choose the level
      </Typography>
      <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
        {levels.map((level) => (
          <div key={level} style={{ display: 'inline-block', margin: 8 }}>
            <Paper
              elevation={3}
              sx={{
                background: buttonColor,
                color: '#222',
                minWidth: 120,
                minHeight: level === 'more5' ? 220 : 120,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6,
                cursor: 'pointer',
                transition: '0.2s',
                '&:hover': { boxShadow: 8, background: '#ffc107' },
              }}
              onClick={() => handleSelect(level)}
            >
              {level === 'more5' ? (
                <>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mb: 1 }}>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <StarIcon key={i} sx={{ color: starColor, fontSize: 28 }} />
                    ))}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
                    MORE5
                  </Typography>
                </>
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                  {Array.from({ length: Number(level) }).map((_, i) => (
                    <StarIcon key={i} sx={{ color: starColor, fontSize: 32 }} />
                  ))}
                </Box>
              )}
            </Paper>
          </div>
        ))}
      </Grid>
    </Box>
  );
}; 