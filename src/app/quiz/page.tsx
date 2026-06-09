// "use client";
// import { useEffect, useState, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import { QuizSession, UserAnswer, Question } from "@/types";

// export default function QuizPage() {
//   const router = useRouter();
//   const [session, setSession] = useState<QuizSession | null>(null);
//   const [current, setCurrent] = useState(0);
//   const [selected, setSelected] = useState<string[]>([]);
//   const [answers, setAnswers] = useState<UserAnswer[]>([]);
//   const [showExplain, setShowExplain] = useState(false);
//   const [startTime] = useState(Date.now());
//   const [elapsed, setElapsed] = useState(0);
//   const [submitted, setSubmitted] = useState(false);

//   useEffect(() => {
//     const raw = sessionStorage.getItem("quizSession");
//     if (!raw) { router.replace("/"); return; }
//     setSession(JSON.parse(raw));
//   }, [router]);

//   useEffect(() => {
//     const t = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 1000);
//     return () => clearInterval(t);
//   }, [startTime]);

//   const question: Question | undefined = session?.questions[current];

//   const toggleOption = (id: string) => {
//     if (submitted) return;
//     if (question?.type === "MCQ") {
//       setSelected([id]);
//     } else {
//       setSelected((prev) =>
//         prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//       );
//     }
//   };

//   const handleSubmitAnswer = useCallback(() => {
//     if (!question || submitted) return;
//     const correct = question.correctAnswers;
//     const isCorrect =
//       selected.length === correct.length &&
//       correct.every((c) => selected.includes(c));
//     const pointsEarned = isCorrect ? question.points : 0;
//     setAnswers((prev) => [
//       ...prev,
//       { questionId: question.id, selectedOptions: selected, isCorrect, pointsEarned },
//     ]);
//     setSubmitted(true);
//     setShowExplain(true);
//   }, [question, selected, submitted]);

//   const handleNext = () => {
//     if (!session) return;
//     if (current + 1 >= session.questions.length) {
//       const finalAnswers = [...answers];
//       const score = finalAnswers.reduce((s, a) => s + a.pointsEarned, 0);
//       sessionStorage.setItem(
//         "quizResults",
//         JSON.stringify({
//           session,
//           answers: finalAnswers,
//           totalScore: score,
//           maxScore: session.totalPoints,
//           percentage: Math.round((score / session.totalPoints) * 100),
//           timeTaken: elapsed,
//         })
//       );
//       router.push("/results");
//     } else {
//       setCurrent((c) => c + 1);
//       setSelected([]);
//       setShowExplain(false);
//       setSubmitted(false);
//     }
//   };

//   const formatTime = (s: number) =>
//     `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

//   if (!session || !question) {
//     return (
//       <div className="min-h-screen bg-[#080810] flex items-center justify-center">
//         <div className="w-6 h-6 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
//       </div>
//     );
//   }

//   const progress = (current / session.questions.length) * 100;
//   const currentScore = answers.reduce((s, a) => s + a.pointsEarned, 0);

//   const diffColor = {
//     basic: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
//     intermediate: "text-amber-400 border-amber-500/30 bg-amber-500/10",
//     advanced: "text-rose-400 border-rose-500/30 bg-rose-500/10",
//   }[session.difficulty];

//   return (
//     <main className="min-h-screen bg-[#080810] text-white">
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(99,102,241,0.08),transparent)]" />

//       <div className="relative z-10 max-w-2xl mx-auto px-6 py-10">
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center gap-3">
//             <button onClick={() => router.push("/")} className="text-zinc-600 hover:text-zinc-400 transition-colors">
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M19 12H5M12 19l-7-7 7-7"/>
//               </svg>
//             </button>
//             <span className="text-sm text-zinc-500 truncate max-w-[200px]">{session.sourceTitle}</span>
//           </div>
//           <div className="flex items-center gap-4 text-sm">
//             <span className="font-mono text-zinc-400">{formatTime(elapsed)}</span>
//             <span className="text-indigo-400 font-bold">{currentScore} pts</span>
//           </div>
//         </div>

//         <div className="mb-8">
//           <div className="flex justify-between text-xs text-zinc-600 mb-2">
//             <span>Question {current + 1} of {session.questions.length}</span>
//             <span className={`px-2 py-0.5 rounded border text-xs font-medium ${diffColor}`}>
//               {session.difficulty}
//             </span>
//           </div>
//           <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
//             <div
//               className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//         </div>

//         <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 mb-6">
//           <div className="flex items-center gap-2 mb-5">
//             <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
//               question.type === "MCQ"
//                 ? "text-blue-400 border-blue-500/30 bg-blue-500/10"
//                 : "text-purple-400 border-purple-500/30 bg-purple-500/10"
//             }`}>
//               {question.type === "MCQ" ? "Single Answer" : "Multiple Answers"}
//             </span>
//             <span className="text-xs text-zinc-600">{question.points} points</span>
//           </div>

//           <p className="text-xl font-semibold text-white leading-relaxed mb-7">
//             {question.question}
//           </p>

//           <div className="space-y-3">
//             {question.options.map((opt) => {
//               const isSelected = selected.includes(opt.id);
//               const isCorrect = question.correctAnswers.includes(opt.id);
//               const isWrong = submitted && isSelected && !isCorrect;
//               const showCorrect = submitted && isCorrect;

//               return (
//                 <button
//                   key={opt.id}
//                   onClick={() => toggleOption(opt.id)}
//                   className={`w-full flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${
//                     showCorrect
//                       ? "border-emerald-500/50 bg-emerald-500/10"
//                       : isWrong
//                       ? "border-rose-500/50 bg-rose-500/10"
//                       : isSelected
//                       ? "border-indigo-500/50 bg-indigo-500/10"
//                       : "border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.03]"
//                   } ${submitted ? "cursor-default" : "cursor-pointer"}`}
//                 >
//                   <span className={`shrink-0 w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-bold transition-all ${
//                     showCorrect
//                       ? "border-emerald-500 bg-emerald-500 text-white"
//                       : isWrong
//                       ? "border-rose-500 bg-rose-500 text-white"
//                       : isSelected
//                       ? "border-indigo-500 bg-indigo-500 text-white"
//                       : "border-white/[0.12] text-zinc-500"
//                   }`}>
//                     {submitted && isCorrect ? "✓" : submitted && isWrong ? "✗" : opt.id}
//                   </span>
//                   <span className={`text-sm leading-relaxed ${
//                     showCorrect ? "text-emerald-300"
//                     : isWrong ? "text-rose-300"
//                     : isSelected ? "text-white"
//                     : "text-zinc-400"
//                   }`}>
//                     {opt.text}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {showExplain && (
//           <div className={`rounded-xl border p-5 mb-6 ${
//             answers[answers.length - 1]?.isCorrect
//               ? "border-emerald-500/30 bg-emerald-500/[0.05]"
//               : "border-amber-500/30 bg-amber-500/[0.05]"
//           }`}>
//             <div className="flex items-center gap-2 mb-2">
//               <span>{answers[answers.length - 1]?.isCorrect ? "✅" : "💡"}</span>
//               <span className={`text-sm font-bold ${
//                 answers[answers.length - 1]?.isCorrect ? "text-emerald-400" : "text-amber-400"
//               }`}>
//                 {answers[answers.length - 1]?.isCorrect
//                   ? `Correct! +${answers[answers.length - 1]?.pointsEarned} points`
//                   : "Not quite right"}
//               </span>
//             </div>
//             <p className="text-sm text-zinc-400 leading-relaxed">{question.explanation}</p>
//           </div>
//         )}

//         <div className="flex gap-3">
//           {!submitted ? (
//             <button
//               onClick={handleSubmitAnswer}
//               disabled={selected.length === 0}
//               className="flex-1 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
//             >
//               Submit Answer
//             </button>
//           ) : (
//             <button
//               onClick={handleNext}
//               className="flex-1 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold transition-all flex items-center justify-center gap-2 group"
//             >
//               {current + 1 >= session.questions.length ? "See Results" : "Next Question"}
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
//                 <path d="M5 12h14M12 5l7 7-7 7"/>
//               </svg>
//             </button>
//           )}
//         </div>

//         <div className="flex justify-center gap-2 mt-8">
//           {session.questions.map((_, i) => {
//             const ans = answers[i];
//             return (
//               <div
//                 key={i}
//                 className={`w-2 h-2 rounded-full transition-all ${
//                   i === current ? "bg-indigo-400 w-6"
//                   : ans?.isCorrect ? "bg-emerald-500"
//                   : ans ? "bg-rose-500"
//                   : "bg-zinc-700"
//                 }`}
//               />
//             );
//           })}
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { QuizSession, UserAnswer, Question } from "@/types";

export default function QuizPage() {
  const router = useRouter();
  const [session, setSession] = useState<QuizSession | null>(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [showExplain, setShowExplain] = useState(false);
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("quizSession");
    if (!raw) { router.replace("/"); return; }
    setSession(JSON.parse(raw));
  }, [router]);

  useEffect(() => {
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 1000);
    return () => clearInterval(t);
  }, [startTime]);

  const question: Question | undefined = session?.questions[current];

  const toggleOption = (id: string) => {
    if (submitted) return;
    if (question?.type === "MCQ") {
      setSelected([id]);
    } else {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    }
  };

  const handleSubmitAnswer = useCallback(() => {
    if (!question || submitted) return;
    const correct = question.correctAnswers;
    const isCorrect =
      selected.length === correct.length &&
      correct.every((c) => selected.includes(c));
    const pointsEarned = isCorrect ? question.points : 0;
    setAnswers((prev) => [
      ...prev,
      { questionId: question.id, selectedOptions: selected, isCorrect, pointsEarned },
    ]);
    setSubmitted(true);
    setShowExplain(true);
  }, [question, selected, submitted]);

  const handleNext = () => {
    if (!session) return;
    if (current + 1 >= session.questions.length) {
      const finalAnswers = [...answers];
      const score = finalAnswers.reduce((s, a) => s + a.pointsEarned, 0);
      sessionStorage.setItem(
        "quizResults",
        JSON.stringify({
          session,
          answers: finalAnswers,
          totalScore: score,
          maxScore: session.totalPoints,
          percentage: Math.round((score / session.totalPoints) * 100),
          timeTaken: elapsed,
        })
      );
      router.push("/results");
    } else {
      setCurrent((c) => c + 1);
      setSelected([]);
      setShowExplain(false);
      setSubmitted(false);
    }
  };

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  if (!session || !question) {
    return (
      <div className="min-h-screen bg-[#080810] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  const progress = (current / session.questions.length) * 100;
  const currentScore = answers.reduce((s, a) => s + a.pointsEarned, 0);

  const diffColor = {
    basic: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    intermediate: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    advanced: "text-rose-400 border-rose-500/30 bg-rose-500/10",
  }[session.difficulty];

  return (
    <main className="min-h-screen bg-[#080810] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(99,102,241,0.08),transparent)]" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push("/")} className="text-zinc-600 hover:text-zinc-400 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <span className="text-sm text-zinc-500 truncate max-w-[200px]">{session.sourceTitle}</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="font-mono text-zinc-400">{formatTime(elapsed)}</span>
            <span className="text-indigo-400 font-bold">{currentScore} pts</span>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-xs text-zinc-600 mb-2">
            <span>Question {current + 1} of {session.questions.length}</span>
            <span className={`px-2 py-0.5 rounded border text-xs font-medium ${diffColor}`}>
              {session.difficulty}
            </span>
          </div>
          <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
              question.type === "MCQ"
                ? "text-blue-400 border-blue-500/30 bg-blue-500/10"
                : "text-purple-400 border-purple-500/30 bg-purple-500/10"
            }`}>
              {question.type === "MCQ" ? "Single Answer" : "Multiple Answers"}
            </span>
            <span className="text-xs text-zinc-600">{question.points} points</span>
          </div>

          <p className="text-xl font-semibold text-white leading-relaxed mb-7">
            {question.question}
          </p>

          <div className="space-y-3">
            {question.options.map((opt) => {
              const isSelected = selected.includes(opt.id);
              const isCorrect = question.correctAnswers.includes(opt.id);
              const isWrong = submitted && isSelected && !isCorrect;
              const showCorrect = submitted && isCorrect;

              return (
                <button
                  key={opt.id}
                  onClick={() => toggleOption(opt.id)}
                  className={`w-full flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${
                    showCorrect
                      ? "border-emerald-500/50 bg-emerald-500/10"
                      : isWrong
                      ? "border-rose-500/50 bg-rose-500/10"
                      : isSelected
                      ? "border-indigo-500/50 bg-indigo-500/10"
                      : "border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.03]"
                  } ${submitted ? "cursor-default" : "cursor-pointer"}`}
                >
                  <span className={`shrink-0 w-7 h-7 rounded-lg border flex items-center justify-center text-xs font-bold transition-all ${
                    showCorrect
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : isWrong
                      ? "border-rose-500 bg-rose-500 text-white"
                      : isSelected
                      ? "border-indigo-500 bg-indigo-500 text-white"
                      : "border-white/[0.12] text-zinc-500"
                  }`}>
                    {submitted && isCorrect ? "✓" : submitted && isWrong ? "✗" : opt.id}
                  </span>
                  <span className={`text-sm leading-relaxed ${
                    showCorrect ? "text-emerald-300"
                    : isWrong ? "text-rose-300"
                    : isSelected ? "text-white"
                    : "text-zinc-400"
                  }`}>
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {showExplain && (
          <div className={`rounded-xl border p-5 mb-6 ${
            answers[answers.length - 1]?.isCorrect
              ? "border-emerald-500/30 bg-emerald-500/[0.05]"
              : "border-amber-500/30 bg-amber-500/[0.05]"
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <span>{answers[answers.length - 1]?.isCorrect ? "✅" : "💡"}</span>
              <span className={`text-sm font-bold ${
                answers[answers.length - 1]?.isCorrect ? "text-emerald-400" : "text-amber-400"
              }`}>
                {answers[answers.length - 1]?.isCorrect
                  ? `Correct! +${answers[answers.length - 1]?.pointsEarned} points`
                  : "Not quite right"}
              </span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">{question.explanation}</p>
          </div>
        )}

        <div className="flex gap-3">
          {!submitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selected.length === 0}
              className="flex-1 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex-1 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold transition-all flex items-center justify-center gap-2 group"
            >
              {current + 1 >= session.questions.length ? "See Results" : "Next Question"}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          )}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {session.questions.map((_, i) => {
            const ans = answers[i];
            return (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? "bg-indigo-400 w-6"
                  : ans?.isCorrect ? "bg-emerald-500"
                  : ans ? "bg-rose-500"
                  : "bg-zinc-700"
                }`}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
