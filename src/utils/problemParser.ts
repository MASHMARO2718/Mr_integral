import { Problem, ProblemSet } from '../types/problem';

export function parseMarkdownToProblems(markdown: string): ProblemSet {
  const problems: Problem[] = [];
  const lines = markdown.split('\n');
  
  let currentProblem: Partial<Problem> = {};
  let isCollectingQuestion = false;
  let questionLines: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // 問題の開始を検出
    if (line.startsWith('## 〖高校数学〗今週の積分 #')) {
      if (currentProblem.id) {
        // 前の問題を保存
        if (questionLines.length > 0) {
          currentProblem.question = questionLines.join('\n');
          problems.push(currentProblem as Problem);
        }
        questionLines = [];
      }
      
      // 新しい問題の開始
      const id = parseInt(line.match(/#(\d+)/)?.[1] || '0');
      const starMatch = line.match(/〖([★]+)〗/);
      const difficulty = starMatch ? starMatch[1].length : 1;
      currentProblem = {
        id,
        title: line,
        difficulty: difficulty as 1 | 2 | 3 | 4 | 5,
        timeLimit: calculateTimeLimit(difficulty)
      };
      isCollectingQuestion = true;
      continue;
    }
    
    // 問題文の収集
    if (isCollectingQuestion && line.startsWith('\\[')) {
      questionLines.push(line);
      while (i + 1 < lines.length && !lines[i + 1].trim().startsWith('##')) {
        i++;
        questionLines.push(lines[i].trim());
      }
      isCollectingQuestion = false;
    }
  }
  
  // 最後の問題を保存
  if (currentProblem.id && questionLines.length > 0) {
    currentProblem.question = questionLines.join('\n');
    problems.push(currentProblem as Problem);
  }
  
  return { problems };
}

function calculateTimeLimit(difficulty: number): number {
  if (difficulty > 5) {
    return 2400; // 40分
  }
  return difficulty * 360; // ★1つあたり6分
} 