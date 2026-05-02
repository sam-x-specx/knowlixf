// constants/tokens.ts

export const TOKEN_CONSTANTS = {
  // Token amounts
  SIGNUP_TOKENS: 120,      // Free tokens awarded on user signup
  QUIZ_COST: 11,           // Tokens deducted per quiz generation
  PRO_TOKENS: 500,         // Tokens awarded on Pro plan purchase
  PERFECT_BONUS: 10,       // Bonus tokens for 100% correct answers
  COMPLETE_BONUS: 10,      // Bonus tokens for answering all selected questions
  
  // Question limits
  FREE_LIMIT: 5,           // Max questions for non-logged-in users
  MAX_QUESTIONS: 70,       // Max questions for logged-in users (with tokens)
  
  // Pricing
  PRO_PRICE: 15,           // USD per month for Pro plan
} as const;

// Type for the constants (useful for TypeScript)
export type TokenConstants = typeof TOKEN_CONSTANTS;

// Helper function to check if user has enough tokens
export const hasEnoughTokens = (tokens: number | null): boolean => {
  return (tokens ?? 0) >= TOKEN_CONSTANTS.QUIZ_COST;
};

// Helper function to get remaining tokens after quiz
export const getRemainingTokens = (tokens: number | null): number => {
  return (tokens ?? 0) - TOKEN_CONSTANTS.QUIZ_COST;
};

// Helper for calculating bonus eligibility
export const getBonusMessage = (
  isPerfectScore: boolean,
  allQuestionsAnswered: boolean
): string => {
  const bonuses: string[] = [];
  if (isPerfectScore) bonuses.push(`+${TOKEN_CONSTANTS.PERFECT_BONUS} for perfect score`);
  if (allQuestionsAnswered) bonuses.push(`+${TOKEN_CONSTANTS.COMPLETE_BONUS} for completion`);
  if (bonuses.length === 0) return "No bonus earned";
  return bonuses.join(" · ");
};

// Token cost display formatter
export const formatTokenCost = (): string => {
  return `${TOKEN_CONSTANTS.QUIZ_COST} 🪙`;
};

// Welcome message for new users
export const getWelcomeMessage = (): string => {
  return `🎉 Welcome! You've received ${TOKEN_CONSTANTS.SIGNUP_TOKENS} free tokens. Each quiz costs ${TOKEN_CONSTANTS.QUIZ_COST} tokens.`;
};
