import React, { useState, useRef } from 'react';
import { Box, TextField, Button, Slide } from '@mui/material';
import { OnScreenKeyboard } from '../common/OnScreenKeyboard';

interface AnswerInputProps {
  onSubmit: (answer: string) => void;
  disabled?: boolean;
}

export const AnswerInput: React.FC<AnswerInputProps> = ({ onSubmit, disabled }) => {
  const [answer, setAnswer] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim() !== '') {
      onSubmit(answer.trim());
      setAnswer('');
      setShowKeyboard(false);
    }
  };

  const handleFocus = () => {
    setShowKeyboard(true);
  };

  const handleKeyPress = (key: string) => {
    if (key === 'C') {
      setAnswer('');
    } else if (key === '←' || key === '⌫') {
      setAnswer((prev) => prev.slice(0, -1));
    } else if (key === '↵') {
      handleSubmit(new Event('submit') as any);
    } else if (key === '÷') {
      setAnswer((prev) => prev + '/');
    } else if (key === 'logₐ') {
      const logStr = 'log_{}';
      const input = inputRef.current;
      if (input) {
        const start = input.selectionStart ?? answer.length;
        const end = input.selectionEnd ?? answer.length;
        const newValue = answer.slice(0, start) + logStr + answer.slice(end);
        setAnswer(newValue);
        setTimeout(() => {
          input.setSelectionRange(start + 5, start + 5); // log_{ の直後
          input.focus();
        }, 0);
      } else {
        setAnswer((prev) => prev + logStr);
      }
    } else {
      setAnswer((prev) => prev + key);
    }
    inputRef.current?.focus();
  };

  const handleOverlayClick = () => {
    setShowKeyboard(false);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          inputRef={inputRef}
          label="回答を入力"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onFocus={handleFocus}
          disabled={disabled}
          fullWidth
          autoComplete="off"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, fontSize: 18, py: 1.5 }}
          disabled={disabled}
        >
          送信
        </Button>
      </form>
      {showKeyboard && !disabled && (
        <>
          {/* 透明オーバーレイ */}
          <Box
            onClick={handleOverlayClick}
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 1299,
              bgcolor: 'rgba(0,0,0,0)',
            }}
          />
          {/* スライドでキーボード表示 */}
          <Slide direction="up" in={showKeyboard} mountOnEnter unmountOnExit>
            <Box sx={{ position: 'fixed', bottom: 0, left: 0, width: '100vw', zIndex: 1300 }}>
              <OnScreenKeyboard onKeyPress={handleKeyPress} />
            </Box>
          </Slide>
        </>
      )}
    </Box>
  );
}; 