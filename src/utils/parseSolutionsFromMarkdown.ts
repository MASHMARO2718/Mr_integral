export function parseSolutionsFromMarkdown(markdown: string): Record<number, string> {
  const solutionMap: Record<number, string> = {};
  const lines = markdown.split('\n');
  let currentId: number | null = null;
  let collecting = false;
  let solutionLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const idMatch = line.match(/#(\d+)/);
    if (idMatch) {
      // 直前のsolutionを保存
      if (currentId && solutionLines.length > 0) {
        solutionMap[currentId] = solutionLines.join('\n');
      }
      currentId = parseInt(idMatch[1], 10);
      solutionLines = [];
      collecting = false;
      continue;
    }
    // solutionの数式部分を収集
    if (line.startsWith('\\[')) {
      collecting = true;
      solutionLines.push(line);
      while (i + 1 < lines.length && !lines[i + 1].trim().startsWith('##')) {
        i++;
        solutionLines.push(lines[i].trim());
      }
      collecting = false;
    }
  }
  // 最後のsolutionを保存
  if (currentId && solutionLines.length > 0) {
    solutionMap[currentId] = solutionLines.join('\n');
  }
  return solutionMap;
} 