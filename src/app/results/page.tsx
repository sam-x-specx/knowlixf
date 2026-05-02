"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QuizResult } from "@/types";

function getGrade(pct: number) {
  if (pct >= 90) return { label: "S", text: "Master", color: "from-yellow-400 to-amber-400", bg: "bg-yellow-500/10 border-yellow-500/30" };
  if (pct >= 75) return { label: "A", text: "Expert", color: "from-indigo-400 to-violet-400", bg: "bg-indigo-500/10 border-indigo-500/30" };
  if (pct >= 60) return { label: "B", text: "Proficient", color: "from-emerald-400 to-teal-400", bg: "bg-emerald-500/10 border-emerald-500/30" };
  if (pct >= 40) return { label: "C", text: "Learning", color: "from-amber-400 to-orange-400", bg: "bg-amber-500/10 border-amber-500/30" };
  return { label: "D", text: "Keep Trying", color: "from-rose-400 to-pink-400", bg: "bg-rose-500/10 border-rose-500/30" };
}

function formatTime(s: number) {
  return `${Math.floor(s / 60)}m ${s % 60}s`;
}

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("quizResults");
    if (!raw) { router.replace("/"); return; }
    setResult(JSON.parse(raw));
    setTimeout(() => setReveal(true), 100);
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-screen bg-[#080810] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  const grade = getGrade(result.percentage);
  const correctCount = result.answers.filter((a) => a.isCorrect).length;

  return (
    <main className="min-h-screen bg-[#080810] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_-10%,rgba(99,102,241,0.12),transparent)]" />

      <div className={`relative z-10 max-w-2xl mx-auto px-6 py-12 transition-all duration-700 ${reveal ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <div className="text-center mb-10">
          <p className="text-sm text-zinc-500 mb-2 uppercase tracking-widest font-medium">Quiz Complete</p>
          <h1 className="text-4xl font-black tracking-tight">{result.session.sourceTitle}</h1>
          <p className="text-zinc-500 text-sm mt-1 capitalize">{result.session.difficulty} difficulty</p>
        </div>

        <div className={`rounded-2xl border p-8 text-center mb-6 ${grade.bg}`}>
          <div className={`text-8xl font-black bg-gradient-to-b ${grade.color} bg-clip-text text-transparent mb-2`}>
            {grade.label}
          </div>
          <div className="text-xl font-bold text-white mb-1">{grade.text}</div>
          <div className="text-5xl font-black text-white my-4">
            {result.totalScore}
            <span className="text-2xl text-zinc-400 font-normal">/{result.maxScore}</span>
          </div>
          <div className="text-2xl font-bold text-zinc-300">{result.percentage}%</div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Correct", value: `${correctCount}/${result.session.questions.length}`, icon: "✅" },
            { label: "Time", value: formatTime(result.timeTaken), icon: "⏱️" },
            { label: "Points", value: `${result.totalScore}`, icon: "⭐" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center">
              <div className="text-xl mb-1">{s.icon}</div>
              <div className="text-lg font-bold text-white">{s.value}</div>
              <div className="text-xs text-zinc-500">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 mb-6">
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-5">Question Breakdown</h2>
          <div className="space-y-4">
            {result.session.questions.map((q, i) => {
              const ans = result.answers[i];
              if (!ans) return null;
              return (
                <div key={q.id} className={`flex items-start gap-4 p-4 rounded-xl border ${
                  ans.isCorrect
                    ? "border-emerald-500/20 bg-emerald-500/5"
                    : "border-rose-500/20 bg-rose-500/5"
                }`}>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    ans.isCorrect
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-rose-500/20 text-rose-400"
                  }`}>
                    {ans.isCorrect ? "✓" : "✗"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-zinc-300 leading-snug mb-1 line-clamp-2">{q.question}</p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className={`px-2 py-0.5 rounded font-medium ${
                        q.type === "MCQ"
                          ? "text-blue-400 bg-blue-500/10"
                          : "text-purple-400 bg-purple-500/10"
                      }`}>{q.type}</span>
                      <span className={ans.isCorrect ? "text-emerald-500" : "text-zinc-600"}>
                        +{ans.pointsEarned}/{q.points} pts
                      </span>
                    </div>
                    {!ans.isCorrect && (
                      <p className="text-xs text-zinc-500 mt-2 leading-relaxed">{q.explanation}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              sessionStorage.removeItem("quizResults");
              router.push("/");
            }}
            className="flex-1 py-4 rounded-xl border border-white/[0.08] text-zinc-300 hover:bg-white/[0.04] transition-all font-semibold"
          >
            New Quiz
          </button>
          <button
            onClick={() => {
              sessionStorage.removeItem("quizResults");
              sessionStorage.setItem("quizSession", JSON.stringify(result.session));
              router.push("/quiz");
            }}
            className="flex-1 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold transition-all"
          >
            Retry Quiz
          </button>
        </div>
      </div>
    </main>
  );
}
