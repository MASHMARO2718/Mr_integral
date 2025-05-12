import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ProblemDisplay } from '../components/problems/ProblemDisplay';
import { Timer } from '../components/common/Timer';
import { AnswerInput } from '../components/problems/AnswerInput';
import { Problem } from '../types/problem';
import { parseMarkdownToProblems } from '../utils/problemParser';
import { parseSolutionsFromMarkdown } from '../utils/parseSolutionsFromMarkdown';
import BlockMath from '@matejmazur/react-katex';

const phrases = [
  'Storm the integrals',
  'Charge into the battlefield of integrals',
  'Engage in integral combat',
  'Wage war on integrals',
  'Face off against integrals',
];

// TeXの囲みや空白・改行を除去する関数
function stripTexDelimiters(tex: string) {
  return tex
    .replace(/^\s*\\\[|\\\]\s*$/g, '') // 先頭・末尾の \[ \] と空白
    .replace(/^\s*\\\(|\\\)\s*$/g, '') // 先頭・末尾の \( \) と空白
    .replace(/^\s*\$\$|\$\$\s*$/g, '') // 先頭・末尾の $$ と空白
    .replace(/^\s*\$|\$\s*$/g, '')       // 先頭・末尾の $ と空白
    .trim();
}

// 効果音再生関数
const playTimeoutSound = () => {
  const audio = new Audio('/ロボットの足音2.mp3');
  audio.play();
};
const playCorrectSound = () => {
  const audio = new Audio('/Cyber05-5.mp3');
  audio.play();
};
const playWrongSound = () => {
  const audio = new Audio('/deathse.mp3');
  audio.play();
};

export const ProblemPage: React.FC = () => {
  const { level } = useParams<{ level: string }>();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [randomPhrase, setRandomPhrase] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    // ランダムフレーズをセット
    setRandomPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
  }, []);

  useEffect(() => {
    Promise.all([
      fetch('/integration_100_drills.md').then((res) => res.text()),
      fetch('/integration_100_drills_solutions.md').then((res) => res.text()),
    ]).then(([md, solMd]) => {
      const allProblems = parseMarkdownToProblems(md).problems;
      const solutionMap = parseSolutionsFromMarkdown(solMd);
      // idでマージ
      allProblems.forEach((p) => {
        p.solution = solutionMap[p.id] || '';
      });
      let filtered: Problem[] = allProblems;
      if (level && level !== 'more5') {
        filtered = allProblems.filter((p: Problem) => p.difficulty === Number(level));
      } else if (level === 'more5') {
        filtered = allProblems.filter((p: Problem) => p.difficulty > 5);
      }
      setProblems(filtered);
      setLoading(false);
    });
  }, [level]);

  useEffect(() => {
    if (isCorrect === true) {
      playCorrectSound();
    } else if (isCorrect === false) {
      playWrongSound();
    }
  }, [isCorrect]);

  const handleStart = () => {
    setShowIntro(false);
    setTimerActive(true);
    setShowAnswer(false);
  };

  const currentProblem = problems[currentIndex];

  const handleTimeUp = () => {
    setTimerActive(false);
    setShowAnswer(true);
    playTimeoutSound();
  };

  const handleSubmit = (answer: string) => {
    setTimerActive(false);
    setShowAnswer(true);
    // 正誤判定（空白・改行を無視して完全一致 or 分数同士の変換も許容）
    if (currentProblem && currentProblem.solution) {
      const normalize = (str: string) => str.replace(/\s+/g, '');
      // 分数の正規化: 1/2 → \\frac{1}{2}
      const toFrac = (str: string) => str.replace(/([a-zA-Z0-9]+)\/(\d+)/g, '\\frac{$1}{$2}');
      // \\frac{1}{2} → 1/2
      const fromFrac = (str: string) => str.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1/$2');
      const userNorm = normalize(answer);
      const solNorm = normalize(currentProblem.solution);
      if (
        userNorm === solNorm ||
        toFrac(userNorm) === solNorm ||
        userNorm === toFrac(solNorm) ||
        fromFrac(userNorm) === solNorm ||
        userNorm === fromFrac(solNorm)
      ) {
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }
    } else {
      setIsCorrect(null);
    }
  };

  const handleNext = () => {
    if (currentIndex < problems.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setTimerActive(true);
      setShowAnswer(false);
      setIsCorrect(null);
    }
  };

  if (loading) {
    return (
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading problems...</Typography>
      </Box>
    );
  }

  if (showIntro) {
    return (
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          {randomPhrase}
        </Typography>
        <Button variant="contained" color="primary" size="large" onClick={handleStart}>
          Start
        </Button>
      </Box>
    );
  }

  if (!currentProblem) {
    return (
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          No problems found for this level.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <ProblemDisplay problem={currentProblem} />
      
      <Timer
        key={currentIndex}
        initialTime={currentProblem.timeLimit}
        onTimeUp={handleTimeUp}
        isActive={timerActive}
      />

      {!timerActive && !showAnswer && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleStart}
          fullWidth
        >
          Start
        </Button>
      )}

      {timerActive && (
        <AnswerInput
          onSubmit={handleSubmit}
          disabled={!timerActive}
        />
      )}

      {showAnswer && (
        <Box sx={{ mt: 2 }}>
          {isCorrect !== null && (
            <Typography variant="h6" gutterBottom color={isCorrect ? 'primary' : 'error'}>
              {isCorrect ? '正解！' : '不正解'}
            </Typography>
          )}
          <Typography variant="h6" gutterBottom>
            模範解答
          </Typography>
          <BlockMath>{stripTexDelimiters(currentProblem.solution)}</BlockMath>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            fullWidth
            sx={{ mt: 2 }}
          >
            Next Problem
          </Button>
        </Box>
      )}
    </Box>
  );
}; 