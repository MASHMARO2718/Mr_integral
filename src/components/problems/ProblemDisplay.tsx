import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import InlineMath from '@matejmazur/react-katex';
import BlockMath from '@matejmazur/react-katex';
import { Problem } from '../../types/problem';
import 'katex/dist/katex.min.css';

interface ProblemDisplayProps {
  problem: Problem;
}

// TeXの囲みや空白・改行を除去する関数
function stripTexDelimiters(tex: string) {
  return tex
    .replace(/^\s*\\\[|\\\]\s*$/g, '') // 先頭・末尾の \[ \] と空白
    .replace(/^\s*\\\(|\\\)\s*$/g, '') // 先頭・末尾の \( \) と空白
    .replace(/^\s*\$\$|\$\$\s*$/g, '') // 先頭・末尾の $$ と空白
    .replace(/^\s*\$|\$\s*$/g, '')       // 先頭・末尾の $ と空白
    .trim();
}

export const ProblemDisplay: React.FC<ProblemDisplayProps> = ({ problem }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        {problem.title}
      </Typography>
      <Box sx={{ my: 2 }}>
        <Typography variant="body1" component="div">
          <BlockMath>{stripTexDelimiters(problem.question)}</BlockMath>
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        難易度: {'★'.repeat(problem.difficulty)}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        制限時間: {problem.timeLimit}秒
      </Typography>
    </Paper>
  );
}; 