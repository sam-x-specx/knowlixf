import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { TOKEN_CONSTANTS } from "@/constants/tokens";
import { UserTokenData } from "@/types";

// In-memory storage (replace with database in production)
const tokenStore = new Map<string, UserTokenData>();

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user.email;
    let userData = tokenStore.get(userEmail);

    if (!userData) {
      // New user - initialize with signup tokens
      userData = {
        tokens: TOKEN_CONSTANTS.SIGNUP_TOKENS,
        totalEarned: TOKEN_CONSTANTS.SIGNUP_TOKENS,
        totalSpent: 0,
        lastUpdated: new Date().toISOString(),
      };
      tokenStore.set(userEmail, userData);
      console.log(`New user created: ${userEmail} with ${TOKEN_CONSTANTS.SIGNUP_TOKENS} tokens`);
    }

    return NextResponse.json({ 
      tokens: userData.tokens,
      totalEarned: userData.totalEarned,
      totalSpent: userData.totalSpent 
    });
  } catch (error) {
    console.error("Error in GET /api/tokens:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { tokens, operation } = await req.json();
    const userEmail = session.user.email;
    let userData = tokenStore.get(userEmail);

    if (!userData) {
      // Create new user if doesn't exist
      userData = {
        tokens: TOKEN_CONSTANTS.SIGNUP_TOKENS,
        totalEarned: TOKEN_CONSTANTS.SIGNUP_TOKENS,
        totalSpent: 0,
        lastUpdated: new Date().toISOString(),
      };
      tokenStore.set(userEmail, userData);
    }

    if (operation === "deduct") {
      if (userData.tokens < tokens) {
        return NextResponse.json({ error: "Insufficient tokens" }, { status: 400 });
      }
      userData.tokens = tokens;
      userData.totalSpent += (userData.tokens - tokens);
    } else if (operation === "add") {
      const addedAmount = tokens - userData.tokens;
      userData.tokens = tokens;
      userData.totalEarned += addedAmount;
    }

    userData.lastUpdated = new Date().toISOString();
    tokenStore.set(userEmail, userData);

    return NextResponse.json({ tokens: userData.tokens });
  } catch (error) {
    console.error("Error in PUT /api/tokens:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
