export interface CodeAnalysis {
  code: string;
  language: string;
}

export interface CodeContext {
  filePath?: string;
  codeSnippet?: string;
}
