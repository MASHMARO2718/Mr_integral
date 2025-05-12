import React, { useState } from 'react';
import { Box, Button, Tabs, Tab } from '@mui/material';

const TABS = [
  { label: '123', key: 'num' },
  { label: 'f(x)', key: 'fx' },
  { label: 'ABC', key: 'abc' },
  { label: '#&¬', key: 'sym' },
];

const NUM_KEYS = [
  ['x', 'y', 'π', 'e', '7', '8', '9', '×', '÷'],
  ['x²', '^', '√', '| |', '4', '5', '6', '+', '-'],
  ['<', '>', '| |', '', '1', '2', '3', '=', 'C'],
  ['ans', ',', '(', ')', '0', '.', '<', '>', '←'],
];

const FX_KEYS = [
  ['sin', 'cos', 'tan', '%', '!', '$', '°'],
  ['sin⁻¹', 'cos⁻¹', 'tan⁻¹', '{', '}', '≤', '≥'],
  ['ln', 'log₁₀', 'logₐ', 'd/dx', '∫', 'i', 'eˣ'],
  ['10ˣ', '√x', '', '', '<', '>', '↵'],
];

const ABC_KEYS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['⇧', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫'],
  ['αβγ', ',', '(', ')', '<', '>', '↵'],
];

const SYM_KEYS = [
  ['∞', '≠', '^', '∨', '¬', '⊗', '[', ']'],
  ['//', '⊥', '∈', '⊂', '∠', '→', '⟦', '⟧'],
  ['(:)', '(:', '(::)', '\\', '&', '@', '#', '$'],
  [';', '\'', '"', '<', '>', '↵'],
];

interface OnScreenKeyboardProps {
  onKeyPress: (key: string) => void;
}

export const OnScreenKeyboard: React.FC<OnScreenKeyboardProps> = ({ onKeyPress }) => {
  const [tab, setTab] = useState(0);

  const renderKeys = () => {
    if (tab === 1) {
      return (
        <Box sx={{ mt: 1 }}>
          {FX_KEYS.map((row, rowIdx) => (
            <Box
              key={rowIdx}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 0.5,
                mb: 1,
              }}
            >
              {row.filter(Boolean).map((key, idx) => (
                <Button
                  key={idx}
                  variant="outlined"
                  sx={{ minWidth: 40, minHeight: 40, fontSize: 18, color: '#ffd600', borderColor: '#ffd600' }}
                  onClick={() => onKeyPress(key)}
                >
                  {key}
                </Button>
              ))}
            </Box>
          ))}
        </Box>
      );
    }
    if (tab === 2) {
      return (
        <Box sx={{ mt: 1 }}>
          {ABC_KEYS.map((row, rowIdx) => (
            <Box
              key={rowIdx}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 0.5,
                mb: 1,
              }}
            >
              {row.filter(Boolean).map((key, idx) => (
                <Button
                  key={idx}
                  variant="outlined"
                  sx={{ minWidth: 40, minHeight: 40, fontSize: 18, color: '#ffd600', borderColor: '#ffd600' }}
                  onClick={() => onKeyPress(key)}
                >
                  {key}
                </Button>
              ))}
            </Box>
          ))}
        </Box>
      );
    }
    if (tab === 3) {
      return (
        <Box sx={{ mt: 1 }}>
          {SYM_KEYS.map((row, rowIdx) => (
            <Box
              key={rowIdx}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 0.5,
                mb: 1,
              }}
            >
              {row.filter(Boolean).map((key, idx) => (
                <Button
                  key={idx}
                  variant="outlined"
                  sx={{ minWidth: 40, minHeight: 40, fontSize: 18, color: '#ffd600', borderColor: '#ffd600' }}
                  onClick={() => onKeyPress(key)}
                >
                  {key}
                </Button>
              ))}
            </Box>
          ))}
        </Box>
      );
    }
    const keys = NUM_KEYS;
    return (
      <Box sx={{ mt: 1 }}>
        {keys.map((row, rowIdx) => (
          <Box
            key={rowIdx}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 0.5,
              mb: 1,
            }}
          >
            {row.filter(Boolean).map((key, idx) => (
              <Button
                key={idx}
                variant="outlined"
                sx={{ minWidth: 40, minHeight: 40, fontSize: 18, color: '#ffd600', borderColor: '#ffd600' }}
                onClick={() => onKeyPress(key)}
              >
                {key}
              </Button>
            ))}
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, width: '100%', bgcolor: 'background.paper', p: 2, boxShadow: 3, zIndex: 1300 }}>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
        {TABS.map((t, i) => (
          <Tab key={t.key} label={t.label} />
        ))}
      </Tabs>
      {renderKeys()}
    </Box>
  );
}; 