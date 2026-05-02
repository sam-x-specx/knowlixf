import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { TOKEN_CONSTANTS } from "@/constants/tokens";

export function useTokens() {
  const { data: session, status } = useSession();
  const [tokens, setTokens] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTokens = async () => {
    if (!session?.user?.email) {
      setTokens(null);
      setLoading(false);
      return;
    }

    try {
      console.log("Fetching tokens for user:", session.user.email);
      
      const response = await fetch("/api/tokens", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch tokens");
      }

      const data = await response.json();
      console.log("Tokens fetched successfully:", data.tokens);
      setTokens(data.tokens);
      setError(null);
      
      // Cache in localStorage
      localStorage.setItem(`tokens_${session.user.email}`, JSON.stringify({ 
        tokens: data.tokens,
        timestamp: Date.now() 
      }));
      
    } catch (err) {
      console.error("Error fetching tokens:", err);
      setError("Failed to load tokens");
      
      // Fallback to localStorage
      const cached = localStorage.getItem(`tokens_${session.user.email}`);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          // Check if cache is less than 5 minutes old
          if (Date.now() - parsed.timestamp < 5 * 60 * 1000) {
            setTokens(parsed.tokens);
          }
        } catch (e) {
          console.error("Error parsing cached tokens:", e);
        }
      } else {
        // Set default tokens for new users
        setTokens(TOKEN_CONSTANTS.SIGNUP_TOKENS);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateTokens = async (newBalance: number, operation: "deduct" | "add") => {
    if (!session?.user?.email) return false;

    try {
      const response = await fetch("/api/tokens", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokens: newBalance, operation }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update tokens");
      }

      const data = await response.json();
      setTokens(data.tokens);
      
      // Update cache
      localStorage.setItem(`tokens_${session.user.email}`, JSON.stringify({ 
        tokens: data.tokens,
        timestamp: Date.now() 
      }));
      
      return true;
    } catch (err) {
      console.error("Error updating tokens:", err);
      setError(err instanceof Error ? err.message : "Failed to update tokens");
      return false;
    }
  };

  const deductTokens = async (amount: number) => {
    if (!session?.user?.email || tokens === null || tokens < amount) return false;
    const newBalance = tokens - amount;
    return updateTokens(newBalance, "deduct");
  };

  const addTokens = async (amount: number) => {
    if (!session?.user?.email) return false;
    const newBalance = (tokens || 0) + amount;
    return updateTokens(newBalance, "add");
  };

  const awardBonusTokens = async (
    isPerfectScore: boolean,
    allQuestionsAnswered: boolean,
    totalQuestions: number
  ) => {
    let bonusEarned = 0;
    
    if (isPerfectScore) {
      bonusEarned += TOKEN_CONSTANTS.PERFECT_BONUS;
    }
    if (allQuestionsAnswered) {
      bonusEarned += TOKEN_CONSTANTS.COMPLETE_BONUS;
    }
    
    if (bonusEarned > 0) {
      await addTokens(bonusEarned);
    }
    
    return bonusEarned;
  };

  // Fetch tokens when session changes
  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      fetchTokens();
    } else if (status === "unauthenticated") {
      setTokens(null);
      setLoading(false);
    }
  }, [session, status]);

  return {
    tokens,
    loading,
    error,
    deductTokens,
    addTokens,
    awardBonusTokens,
    refetch: fetchTokens,
  };
}