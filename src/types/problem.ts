export type Difficulty = 1 | 2 | 3 | 4 | 5;

export interface Problem {
  id: number;
  title: string;
  difficulty: Difficulty;
  question: string;
  answer: string;
  solution: string;
  timeLimit: number; // 制限時間（秒）
}

export interface ProblemSet {
  problems: Problem[];
} 