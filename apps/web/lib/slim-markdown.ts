export interface MarkdownSlimResult {
  markdown: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  removedElements: {
    extraWhitespace: number;
    emptyLines: number;
    comments: number;
    redundantFormatting: number;
  };
  estimatedTokenSavings: number;
  estimatedCostSavings: number;
}

export function slimMarkdown(input: string): MarkdownSlimResult {
  const originalSize = input.length;
  let result = input;
  const removedElements = {
    extraWhitespace: 0,
    emptyLines: 0,
    comments: 0,
    redundantFormatting: 0,
  };

  // 1단계: HTML 주석 제거
  const beforeComments = result.length;
  result = result.replace(/<!--[\s\S]*?-->/g, "");
  removedElements.comments = beforeComments - result.length;

  // 2단계: 코드 블록 추출 및 보호
  const codeBlocks: Array<{ content: string; placeholder: string }> = [];
  let codeBlockIndex = 0;

  // 백틱 코드 블록 추출
  result = result.replace(/```[\s\S]*?```/g, (match) => {
    const placeholder = `___CODE_BLOCK_${codeBlockIndex}___`;
    codeBlocks.push({ content: match, placeholder });
    codeBlockIndex++;
    return placeholder;
  });

  // 인라인 코드 추출
  result = result.replace(/`[^`\n]+`/g, (match) => {
    const placeholder = `___INLINE_CODE_${codeBlockIndex}___`;
    codeBlocks.push({ content: match, placeholder });
    codeBlockIndex++;
    return placeholder;
  });

  // 3단계: 연속된 빈 줄 제거 (3개 이상의 연속 줄바꿈을 2개로)
  const beforeEmptyLines = (result.match(/\n\s*\n\s*\n+/g) || []).length;
  result = result.replace(/\n\s*\n\s*\n+/g, "\n\n");
  removedElements.emptyLines = beforeEmptyLines;

  // 4단계: 줄 끝 공백 제거
  const beforeWhitespace = result.length;
  result = result.replace(/[ \t]+$/gm, "");
  removedElements.extraWhitespace += beforeWhitespace - result.length;

  // 5단계: 헤더 주변 불필요한 공백 정리
  result = result.replace(/^(#{1,6})\s+(.+?)\s*$/gm, "$1 $2");

  // 6단계: 리스트 항목 공백 정규화
  result = result.replace(/^(\s*[-*+])\s+/gm, "$1 ");
  result = result.replace(/^(\s*\d+\.)\s+/gm, "$1 ");

  // 7단계: 연속 공백 압축 (코드 블록 외부)
  const beforeSpaces = result.length;
  result = result.replace(/[ \t]{2,}/g, " ");
  removedElements.extraWhitespace += beforeSpaces - result.length;

  // 8단계: 링크와 이미지 참조 최적화
  result = result.replace(/\[([^\]]+)\]\s*\(\s*([^)]+)\s*\)/g, "[$1]($2)");

  // 9단계: 강조 표시 최적화
  const beforeFormatting = result.length;
  result = result.replace(/\*\*\s+([^*]+)\s+\*\*/g, "**$1**");
  result = result.replace(/\*\s+([^*]+)\s+\*/g, "*$1*");
  result = result.replace(/__\s+([^_]+)\s+__/g, "__$1__");
  result = result.replace(/_\s+([^_]+)\s+_/g, "_$1_");
  removedElements.redundantFormatting += beforeFormatting - result.length;

  // 10단계: 테이블 공백 정리
  result = optimizeTableSpacing(result);

  // 11단계: 인용문 공백 정리
  result = result.replace(/^>\s+/gm, "> ");

  // 12단계: 코드 블록 복원
  codeBlocks.forEach(({ content, placeholder }) => {
    result = result.replace(placeholder, content);
  });

  // 13단계: 최종 정리
  result = result.trim();

  const compressedSize = result.length;
  const compressionRatio =
    originalSize > 0
      ? ((originalSize - compressedSize) / originalSize) * 100
      : 0;

  // 토큰 절약 추정 (대략적으로 4글자당 1토큰으로 계산)
  const estimatedTokenSavings = Math.floor((originalSize - compressedSize) / 4);

  // 비용 절약 추정 (GPT-4 기준: $0.03/1K tokens)
  const estimatedCostSavings = (estimatedTokenSavings / 1000) * 0.03;

  return {
    markdown: result,
    originalSize,
    compressedSize,
    compressionRatio,
    removedElements,
    estimatedTokenSavings,
    estimatedCostSavings,
  };
}

function optimizeTableSpacing(text: string): string {
  const lines = text.split("\n");
  const optimizedLines = lines.map((line) => {
    // 테이블 행인지 확인
    if (
      (line.includes("|") && line.trim().startsWith("|")) ||
      line.includes("|")
    ) {
      // 테이블 셀 간 공백 정규화
      let optimized = line.replace(/\s*\|\s*/g, "|");
      // 테이블 시작과 끝 정리
      optimized = optimized.replace(/^\s*\|/, "|");
      optimized = optimized.replace(/\|\s*$/, "|");
      return optimized;
    }
    return line;
  });

  return optimizedLines.join("\n");
}

// 토큰 계산을 위한 유틸리티 함수
export function estimateTokenCount(text: string): number {
  // 간단한 토큰 추정 (실제로는 더 복잡함)
  // 평균적으로 영어는 4글자당 1토큰, 한국어는 2-3글자당 1토큰
  const englishChars = (text.match(/[a-zA-Z\s]/g) || []).length;
  const koreanChars = (text.match(/[가-힣]/g) || []).length;
  const otherChars = text.length - englishChars - koreanChars;

  return Math.ceil(englishChars / 4 + koreanChars / 2.5 + otherChars / 3);
}
