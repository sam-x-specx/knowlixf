// import { NextRequest, NextResponse } from "next/server";
// import { Difficulty, Question, QuizSession } from "@/types";
// import Groq from "groq-sdk";

// const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

// async function fetchURLContent(url: string): Promise<{ title: string; content: string }> {
//   const urlLower = url.toLowerCase();

//   if (urlLower.includes("wikipedia.org")) {
//     const titleMatch = url.match(/\/wiki\/([^#?]+)/);
//     if (titleMatch) {
//       const pageTitle = decodeURIComponent(titleMatch[1]);
//       const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle)}`;
//       const res = await fetch(apiUrl);
//       const data = await res.json();
//       const fullUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(pageTitle)}&prop=extracts&exintro=false&explaintext=true&format=json`;
//       const fullRes = await fetch(fullUrl);
//       const fullData = await fullRes.json();
//       const pages = fullData.query?.pages;
//       const pageId = Object.keys(pages)[0];
//       const fullText = pages[pageId]?.extract || data.extract || "";
//       return { title: data.title || pageTitle, content: fullText.slice(0, 12000) };
//     }
//   }

//   if (urlLower.includes("youtube.com") || urlLower.includes("youtu.be")) {
//     const videoIdMatch = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
//     if (videoIdMatch) {
//       const videoId = videoIdMatch[1];
//       const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
//       const res = await fetch(oembedUrl);
//       const data = await res.json();
//       return {
//         title: data.title || "YouTube Video",
//         content: `This is a YouTube video titled "${data.title}" by ${data.author_name}. Generate educational questions based on what a viewer would typically learn from a video with this title and topic.`,
//       };
//     }
//   }

//   try {
//     const res = await fetch(url, {
//       headers: { "User-Agent": "Mozilla/5.0 (compatible; QuizBot/1.0)" },
//     });
//     const html = await res.text();
//     const text = html
//       .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
//       .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
//       .replace(/<[^>]+>/g, " ")
//       .replace(/\s+/g, " ")
//       .trim()
//       .slice(0, 12000);
//     const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
//     const title = titleMatch ? titleMatch[1].trim() : url;
//     return { title, content: text };
//   } catch {
//     throw new Error("Unable to fetch content from this URL.");
//   }
// }

// async function generateQuiz(title: string, content: string, difficulty: Difficulty) {
//   const pointMap: Record<Difficulty, { points: number; count: number }> = {
//     basic: { points: 5, count: 4 },
//     intermediate: { points: 10, count: 4 },
//     advanced: { points: 15, count: 4 },
//   };
//   const cfg = pointMap[difficulty];

//   const response = await client.chat.completions.create({
//     model: "llama-3.3-70b-versatile",
//     max_tokens: 4000,
//     messages: [
//       {
//         role: "system",
//         content:
//           "You are an expert educational quiz generator. Return ONLY valid JSON, no markdown, no explanation, no code blocks.",
//       },
//       {
//         role: "user",
//         content: `Analyze this content and generate exactly ${cfg.count} quiz questions at the "${difficulty}" difficulty level.

// CONTENT TITLE: ${title}
// CONTENT:
// ${content}

// RULES:
// - basic: factual recall, definitions
// - intermediate: comprehension, application, cause-and-effect
// - advanced: analysis, synthesis, critical thinking
// - Mix MCQ (single correct) and MSQ (multiple correct) roughly 50/50
// - Each question must have exactly 4 options: A, B, C, D
// - MSQ questions must have 2-3 correct answers
// - MCQ questions must have exactly 1 correct answer
// - Each question is worth ${cfg.points} points
// - Provide a clear explanation for the correct answer(s)

// Return this exact JSON:
// {
//   "title": "string",
//   "questions": [
//     {
//       "id": "q1",
//       "type": "MCQ",
//       "difficulty": "${difficulty}",
//       "question": "question text",
//       "options": [
//         { "id": "A", "text": "option text" },
//         { "id": "B", "text": "option text" },
//         { "id": "C", "text": "option text" },
//         { "id": "D", "text": "option text" }
//       ],
//       "correctAnswers": ["A"],
//       "explanation": "Why this answer is correct",
//       "points": ${cfg.points}
//     }
//   ]
// }`,
//       },
//     ],
//   });

//   const rawText = response.choices[0]?.message?.content || "";
//   const jsonText = rawText.replace(/```json|```/g, "").trim();
//   return JSON.parse(jsonText);
// }

// export async function POST(req: NextRequest) {
//   try {
//     const contentType = req.headers.get("content-type") || "";
//     let title = "";
//     let content = "";
//     let difficulty: Difficulty = "intermediate";

//     // --- PDF upload ---
//     if (contentType.includes("multipart/form-data")) {
//       const formData = await req.formData();
//       difficulty = (formData.get("difficulty") as Difficulty) || "intermediate";
//       const file = formData.get("pdf") as File | null;

//       if (!file) {
//         return NextResponse.json({ error: "No PDF file received." }, { status: 400 });
//       }

//       const { extractText, getDocumentProxy } = await import("unpdf");

//       const arrayBuffer = await file.arrayBuffer();
//       const pdf = await getDocumentProxy(new Uint8Array(arrayBuffer));
//       const { text } = await extractText(pdf, { mergePages: true });

//       title = file.name.replace(".pdf", "").replace(/[-_]/g, " ");
//       content = text.replace(/\s+/g, " ").trim().slice(0, 12000);

//       if (content.length < 100) {
//         return NextResponse.json(
//           { error: "PDF has too little readable text." },
//           { status: 400 }
//         );
//       }

//     // --- URL ---
//     } else {
//       const body = (await req.json()) as { url: string; difficulty: Difficulty };
//       difficulty = body.difficulty;

//       if (!body.url) {
//         return NextResponse.json({ error: "URL is required" }, { status: 400 });
//       }

//       const fetched = await fetchURLContent(body.url);
//       title = fetched.title;
//       content = fetched.content;

//       if (content.length < 100) {
//         return NextResponse.json(
//           { error: "Could not extract enough content from this URL." },
//           { status: 400 }
//         );
//       }
//     }

//     const parsed = await generateQuiz(title, content, difficulty);

//     const session: QuizSession = {
//       sourceUrl: "",
//       sourceTitle: parsed.title || title,
//       difficulty,
//       questions: parsed.questions as Question[],
//       totalPoints: parsed.questions.reduce(
//         (sum: number, q: Question) => sum + q.points,
//         0
//       ),
//     };

//     return NextResponse.json({ session });
//   } catch (err: unknown) {
//     const message = err instanceof Error ? err.message : "Failed to generate quiz";
//     console.error("Quiz generation error:", err);
//     return NextResponse.json({ error: message }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { Difficulty, Question, QuizSession } from "@/types";
import Groq from "groq-sdk";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function fetchURLContent(url: string): Promise<{ title: string; content: string }> {
  const urlLower = url.toLowerCase();

  if (urlLower.includes("wikipedia.org")) {
    const titleMatch = url.match(/\/wiki\/([^#?]+)/);
    if (titleMatch) {
      const pageTitle = decodeURIComponent(titleMatch[1]);
      const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle)}`;
      const res = await fetch(apiUrl);
      const data = await res.json();
      const fullUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(pageTitle)}&prop=extracts&exintro=false&explaintext=true&format=json`;
      const fullRes = await fetch(fullUrl);
      const fullData = await fullRes.json();
      const pages = fullData.query?.pages;
      const pageId = Object.keys(pages)[0];
      const fullText = pages[pageId]?.extract || data.extract || "";
      return { title: data.title || pageTitle, content: fullText.slice(0, 12000) };
    }
  }

  if (urlLower.includes("youtube.com") || urlLower.includes("youtu.be")) {
    const videoIdMatch = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (videoIdMatch) {
      const videoId = videoIdMatch[1];
      const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
      const res = await fetch(oembedUrl);
      const data = await res.json();
      return {
        title: data.title || "YouTube Video",
        content: `This is a YouTube video titled "${data.title}" by ${data.author_name}. Generate educational questions based on what a viewer would typically learn from a video with this title and topic.`,
      };
    }
  }

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; QuizBot/1.0)" },
    });
    const html = await res.text();
    const text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 12000);
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : url;
    return { title, content: text };
  } catch {
    throw new Error("Unable to fetch content from this URL.");
  }
}

async function generateQuiz(title: string, content: string, difficulty: Difficulty, questionCount: number) {
  const pointMap: Record<Difficulty, number> = {
    basic: 5,
    intermediate: 10,
    advanced: 15,
  };
  const points = pointMap[difficulty];

  // Increase max_tokens proportionally for larger question counts
  const maxTokens = Math.max(2000, questionCount * 350);

  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: maxTokens,
    messages: [
      {
        role: "system",
        content:
          "You are an expert educational quiz generator. Return ONLY valid JSON, no markdown, no explanation, no code blocks.",
      },
      {
        role: "user",
        content: `Analyze this content and generate exactly ${questionCount} quiz questions at the "${difficulty}" difficulty level.

CONTENT TITLE: ${title}
CONTENT:
${content}

RULES:
- basic: factual recall, definitions
- intermediate: comprehension, application, cause-and-effect
- advanced: analysis, synthesis, critical thinking
- Mix MCQ (single correct) and MSQ (multiple correct) roughly 50/50
- Each question must have exactly 4 options: A, B, C, D
- MSQ questions must have 2-3 correct answers
- MCQ questions must have exactly 1 correct answer
- Each question is worth ${points} points
- Provide a clear explanation for the correct answer(s)
- You MUST generate ALL ${questionCount} questions — do not stop early

Return this exact JSON:
{
  "title": "string",
  "questions": [
    {
      "id": "q1",
      "type": "MCQ",
      "difficulty": "${difficulty}",
      "question": "question text",
      "options": [
        { "id": "A", "text": "option text" },
        { "id": "B", "text": "option text" },
        { "id": "C", "text": "option text" },
        { "id": "D", "text": "option text" }
      ],
      "correctAnswers": ["A"],
      "explanation": "Why this answer is correct",
      "points": ${points}
    }
  ]
}`,
      },
    ],
  });

  const rawText = response.choices[0]?.message?.content || "";
  const jsonText = rawText.replace(/```json|```/g, "").trim();
  return JSON.parse(jsonText);
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let title = "";
    let content = "";
    let difficulty: Difficulty = "intermediate";
    let questionCount = 4;

    // --- PDF upload ---
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      difficulty = (formData.get("difficulty") as Difficulty) || "intermediate";
      questionCount = parseInt(formData.get("questionCount") as string) || 4;
      const file = formData.get("pdf") as File | null;

      if (!file) {
        return NextResponse.json({ error: "No PDF file received." }, { status: 400 });
      }

      const { extractText, getDocumentProxy } = await import("unpdf");

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await getDocumentProxy(new Uint8Array(arrayBuffer));
      const { text } = await extractText(pdf, { mergePages: true });

      title = file.name.replace(".pdf", "").replace(/[-_]/g, " ");
      content = text.replace(/\s+/g, " ").trim().slice(0, 12000);

      if (content.length < 100) {
        return NextResponse.json(
          { error: "PDF has too little readable text." },
          { status: 400 }
        );
      }

    // --- URL ---
    } else {
      const body = (await req.json()) as { url: string; difficulty: Difficulty; questionCount?: number };
      difficulty = body.difficulty;
      questionCount = body.questionCount || 4;

      if (!body.url) {
        return NextResponse.json({ error: "URL is required" }, { status: 400 });
      }

      const fetched = await fetchURLContent(body.url);
      title = fetched.title;
      content = fetched.content;

      if (content.length < 100) {
        return NextResponse.json(
          { error: "Could not extract enough content from this URL." },
          { status: 400 }
        );
      }
    }

    // Clamp questionCount to safe range
    questionCount = Math.max(1, Math.min(70, questionCount));

    const parsed = await generateQuiz(title, content, difficulty, questionCount);

    const session: QuizSession = {
      sourceUrl: "",
      sourceTitle: parsed.title || title,
      difficulty,
      questions: parsed.questions as Question[],
      totalPoints: parsed.questions.reduce(
        (sum: number, q: Question) => sum + q.points,
        0
      ),
    };

    return NextResponse.json({ session });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to generate quiz";
    console.error("Quiz generation error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

