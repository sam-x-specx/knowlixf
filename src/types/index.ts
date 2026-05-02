export type Difficulty = "basic" | "intermediate" | "advanced";
export type QuestionType = "MCQ" | "MSQ";

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  difficulty: Difficulty;
  question: string;
  options: Option[];
  correctAnswers: string[];
  explanation: string;
  points: number;
}

export interface QuizSession {
  sourceUrl: string;
  sourceTitle: string;
  difficulty: Difficulty;
  questions: Question[];
  totalPoints: number;
}

export interface UserAnswer {
  questionId: string;
  selectedOptions: string[];
  isCorrect: boolean;
  pointsEarned: number;
}

export interface QuizResult {
  session: QuizSession;
  answers: UserAnswer[];
  totalScore: number;
  maxScore: number;
  percentage: number;
  timeTaken: number;
}

export interface UserTokenData {
  userId: string;
  tokens: number;
  usedTokens: number;
  lastReset?: Date;
}
