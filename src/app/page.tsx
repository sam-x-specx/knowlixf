// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Difficulty } from "@/types";

// const EXAMPLE_LINKS = [
//   { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Artificial_intelligence", icon: "📖" },
//   { label: "YouTube", url: "https://www.youtube.com/watch?v=aircAruvnKk", icon: "▶️" },
//   { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Black_hole", icon: "🌑" },
// ];

// const DIFFICULTY_CONFIG: { key: Difficulty; label: string; desc: string; color: string; points: string }[] = [
//   { key: "basic", label: "Basic", desc: "Recall & definitions", color: "emerald", points: "5 pts/q" },
//   { key: "intermediate", label: "Intermediate", desc: "Apply & connect concepts", color: "amber", points: "10 pts/q" },
//   { key: "advanced", label: "Advanced", desc: "Analyze & synthesize", color: "rose", points: "15 pts/q" },
// ];

// export default function HomePage() {
//   const router = useRouter();
//   const [url, setUrl] = useState("");
//   const [difficulty, setDifficulty] = useState<Difficulty>("intermediate");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [progress, setProgress] = useState("");

//   const handleSubmit = async () => {
//     if (!url.trim()) { setError("Please enter a valid URL"); return; }
//     setError("");
//     setLoading(true);
//     setProgress("Fetching content...");

//     try {
//       setTimeout(() => setProgress("Analyzing with AI..."), 1500);
//       setTimeout(() => setProgress("Crafting questions..."), 3500);

//       const res = await fetch("/api/analyze", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ url: url.trim(), difficulty }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to generate quiz");

//       sessionStorage.setItem("quizSession", JSON.stringify(data.session));
//       router.push("/quiz");
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-[#080810] text-white overflow-hidden relative">
//       {/* Background effects */}
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />
//       <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_60%,#080810_100%)]" />
//       <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg5OSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

//       <div className="relative z-10 max-w-2xl mx-auto px-6 py-20">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8 tracking-wide">
//             <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
//             AI-POWERED QUIZ ENGINE
//           </div>
//           <h1 className="text-6xl font-black tracking-tighter leading-none mb-4">
//             <span className="text-white">Learn</span>
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400"> Deeper</span>
//           </h1>
//           <p className="text-zinc-400 text-lg leading-relaxed">
//             Paste any link — YouTube, Wikipedia, article, PDF.<br />
//             We generate a quiz that tests your understanding.
//           </p>
//         </div>

//         {/* Main Card */}
//         <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-8 space-y-7">
//           {/* URL Input */}
//           <div>
//             <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
//               Source URL
//             </label>
//             <div className="relative">
//               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
//                   <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
//                 </svg>
//               </span>
//               <input
//                 type="url"
//                 value={url}
//                 onChange={(e) => { setUrl(e.target.value); setError(""); }}
//                 onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//                 placeholder="https://en.wikipedia.org/wiki/..."
//                 className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
//               />
//             </div>
//             {/* Example links */}
//             <div className="flex flex-wrap gap-2 mt-3">
//               {EXAMPLE_LINKS.map((ex) => (
//                 <button
//                   key={ex.url}
//                   onClick={() => setUrl(ex.url)}
//                   className="text-xs px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-zinc-500 hover:text-zinc-300 hover:border-white/[0.12] transition-all"
//                 >
//                   {ex.icon} Try {ex.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Difficulty */}
//           <div>
//             <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
//               Difficulty Level
//             </label>
//             <div className="grid grid-cols-3 gap-3">
//               {DIFFICULTY_CONFIG.map((d) => (
//                 <button
//                   key={d.key}
//                   onClick={() => setDifficulty(d.key)}
//                   className={`relative p-4 rounded-xl border text-left transition-all ${
//                     difficulty === d.key
//                       ? d.key === "basic"
//                         ? "border-emerald-500/50 bg-emerald-500/10"
//                         : d.key === "intermediate"
//                         ? "border-amber-500/50 bg-amber-500/10"
//                         : "border-rose-500/50 bg-rose-500/10"
//                       : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
//                   }`}
//                 >
//                   <div className={`text-sm font-bold mb-1 ${
//                     difficulty === d.key
//                       ? d.key === "basic" ? "text-emerald-400"
//                       : d.key === "intermediate" ? "text-amber-400"
//                       : "text-rose-400"
//                       : "text-white"
//                   }`}>
//                     {d.label}
//                   </div>
//                   <div className="text-xs text-zinc-500 leading-tight">{d.desc}</div>
//                   <div className={`text-xs mt-2 font-mono font-bold ${
//                     difficulty === d.key
//                       ? d.key === "basic" ? "text-emerald-500"
//                       : d.key === "intermediate" ? "text-amber-500"
//                       : "text-rose-500"
//                       : "text-zinc-600"
//                   }`}>
//                     {d.points}
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Info bar */}
//           <div className="flex items-center gap-4 text-xs text-zinc-600 bg-white/[0.02] rounded-lg px-4 py-3 border border-white/[0.04]">
//             <span>📝 4 questions</span>
//             <span className="w-px h-3 bg-zinc-700" />
//             <span>🎯 MCQ + MSQ mix</span>
//             <span className="w-px h-3 bg-zinc-700" />
//             <span>💡 Explanations included</span>
//           </div>

//           {/* Error */}
//           {error && (
//             <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
//                 <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
//               </svg>
//               {error}
//             </div>
//           )}

//           {/* CTA Button */}
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-base tracking-wide transition-all disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden group"
//           >
//             {loading ? (
//               <span className="flex items-center justify-center gap-3">
//                 <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
//                 </svg>
//                 {progress}
//               </span>
//             ) : (
//               <span className="flex items-center justify-center gap-2">
//                 Generate Quiz
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
//                   <path d="M5 12h14M12 5l7 7-7 7"/>
//                 </svg>
//               </span>
//             )}
//           </button>
//         </div>

//         {/* Features */}
//         <div className="grid grid-cols-3 gap-4 mt-8">
//           {[
//             { icon: "🔗", title: "Any Link", desc: "YouTube, Wikipedia, articles, docs" },
//             { icon: "🧠", title: "AI Analysis", desc: "Claude reads & understands deeply" },
//             { icon: "🏆", title: "Scored Results", desc: "Points, grades & explanations" },
//           ].map((f) => (
//             <div key={f.title} className="text-center">
//               <div className="text-2xl mb-2">{f.icon}</div>
//               <div className="text-xs font-semibold text-zinc-300">{f.title}</div>
//               <div className="text-xs text-zinc-600 mt-0.5">{f.desc}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }


// "use client";
// import { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { Difficulty } from "@/types";

// const EXAMPLE_LINKS = [
//   { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Artificial_intelligence", icon: "📖" },
//   { label: "YouTube", url: "https://www.youtube.com/watch?v=aircAruvnKk", icon: "▶️" },
//   { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Black_hole", icon: "🌑" },
// ];

// const DIFFICULTY_CONFIG: {
//   key: Difficulty;
//   label: string;
//   desc: string;
//   color: string;
//   points: string;
// }[] = [
//   { key: "basic", label: "Basic", desc: "Recall & definitions", color: "emerald", points: "5 pts/q" },
//   { key: "intermediate", label: "Intermediate", desc: "Apply & connect concepts", color: "amber", points: "10 pts/q" },
//   { key: "advanced", label: "Advanced", desc: "Analyze & synthesize", color: "rose", points: "15 pts/q" },
// ];

// export default function HomePage() {
//   const router = useRouter();
//   const [tab, setTab] = useState<"url" | "pdf">("url");
//   const [url, setUrl] = useState("");
//   const [pdfFile, setPdfFile] = useState<File | null>(null);
//   const [pdfDrag, setPdfDrag] = useState(false);
//   const [difficulty, setDifficulty] = useState<Difficulty>("intermediate");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [progress, setProgress] = useState("");
//   const fileRef = useRef<HTMLInputElement>(null);

//   const handleFileChange = (file: File | null) => {
//     if (!file) return;
//     if (file.type !== "application/pdf") {
//       setError("Only PDF files are supported.");
//       return;
//     }
//     if (file.size > 10 * 1024 * 1024) {
//       setError("PDF must be under 10MB.");
//       return;
//     }
//     setError("");
//     setPdfFile(file);
//   };

//   const handleSubmit = async () => {
//     if (tab === "url" && !url.trim()) { setError("Please enter a valid URL"); return; }
//     if (tab === "pdf" && !pdfFile) { setError("Please upload a PDF file"); return; }
//     setError("");
//     setLoading(true);
//     setProgress("Fetching content...");

//     try {
//       setTimeout(() => setProgress("Analyzing with AI..."), 1500);
//       setTimeout(() => setProgress("Crafting questions..."), 3500);

//       let res: Response;

//       if (tab === "pdf" && pdfFile) {
//         const formData = new FormData();
//         formData.append("pdf", pdfFile);
//         formData.append("difficulty", difficulty);
//         res = await fetch("/api/analyze", { method: "POST", body: formData });
//       } else {
//         res = await fetch("/api/analyze", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ url: url.trim(), difficulty }),
//         });
//       }

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to generate quiz");

//       sessionStorage.setItem("quizSession", JSON.stringify(data.session));
//       router.push("/quiz");
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-[#080810] text-white overflow-hidden relative">
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />
//       <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_60%,#080810_100%)]" />
//       <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg5OSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

//       <div className="relative z-10 max-w-2xl mx-auto px-6 py-20">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8 tracking-wide">
//             <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
//             AI-POWERED QUIZ ENGINE
//           </div>
//           <h1 className="text-6xl font-black tracking-tighter leading-none mb-4">
//             <span className="text-white">Learn</span>
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400"> Deeper</span>
//           </h1>
//           <p className="text-zinc-400 text-lg leading-relaxed">
//             Paste any link or upload a PDF.<br />
//             We generate a quiz that tests your understanding.
//           </p>
//         </div>

//         <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-8 space-y-7">

//           {/* Tab switcher */}
//           <div className="flex gap-1 p-1 bg-white/[0.04] rounded-xl border border-white/[0.06]">
//             <button
//               onClick={() => { setTab("url"); setError(""); }}
//               className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
//                 tab === "url"
//                   ? "bg-indigo-600 text-white"
//                   : "text-zinc-500 hover:text-zinc-300"
//               }`}
//             >
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
//                 <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
//               </svg>
//               URL / Link
//             </button>
//             <button
//               onClick={() => { setTab("pdf"); setError(""); }}
//               className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
//                 tab === "pdf"
//                   ? "bg-indigo-600 text-white"
//                   : "text-zinc-500 hover:text-zinc-300"
//               }`}
//             >
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                 <polyline points="14 2 14 8 20 8"/>
//                 <line x1="16" y1="13" x2="8" y2="13"/>
//                 <line x1="16" y1="17" x2="8" y2="17"/>
//                 <polyline points="10 9 9 9 8 9"/>
//               </svg>
//               PDF Upload
//             </button>
//           </div>

//           {/* URL Input */}
//           {tab === "url" && (
//             <div>
//               <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
//                 Source URL
//               </label>
//               <div className="relative">
//                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
//                     <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
//                   </svg>
//                 </span>
//                 <input
//                   type="url"
//                   value={url}
//                   onChange={(e) => { setUrl(e.target.value); setError(""); }}
//                   onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//                   placeholder="https://en.wikipedia.org/wiki/..."
//                   className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
//                 />
//               </div>
//               <div className="flex flex-wrap gap-2 mt-3">
//                 {EXAMPLE_LINKS.map((ex) => (
//                   <button
//                     key={ex.url}
//                     onClick={() => setUrl(ex.url)}
//                     className="text-xs px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-zinc-500 hover:text-zinc-300 hover:border-white/[0.12] transition-all"
//                   >
//                     {ex.icon} Try {ex.label}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* PDF Upload */}
//           {tab === "pdf" && (
//             <div>
//               <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
//                 Upload PDF
//               </label>
//               <div
//                 onClick={() => fileRef.current?.click()}
//                 onDragOver={(e) => { e.preventDefault(); setPdfDrag(true); }}
//                 onDragLeave={() => setPdfDrag(false)}
//                 onDrop={(e) => {
//                   e.preventDefault();
//                   setPdfDrag(false);
//                   handleFileChange(e.dataTransfer.files[0] ?? null);
//                 }}
//                 className={`relative flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
//                   pdfDrag
//                     ? "border-indigo-500/70 bg-indigo-500/10"
//                     : pdfFile
//                     ? "border-emerald-500/50 bg-emerald-500/[0.05]"
//                     : "border-white/[0.10] hover:border-white/[0.20] bg-white/[0.02]"
//                 }`}
//               >
//                 <input
//                   ref={fileRef}
//                   type="file"
//                   accept=".pdf,application/pdf"
//                   className="hidden"
//                   onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
//                 />
//                 {pdfFile ? (
//                   <>
//                     <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
//                       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <polyline points="20 6 9 17 4 12"/>
//                       </svg>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-sm font-semibold text-emerald-400">{pdfFile.name}</p>
//                       <p className="text-xs text-zinc-500 mt-1">{(pdfFile.size / 1024).toFixed(1)} KB — click to change</p>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center">
//                       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                         <polyline points="14 2 14 8 20 8"/>
//                         <line x1="12" y1="18" x2="12" y2="12"/>
//                         <line x1="9" y1="15" x2="15" y2="15"/>
//                       </svg>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-sm font-semibold text-zinc-300">Drop your PDF here</p>
//                       <p className="text-xs text-zinc-600 mt-1">or click to browse — max 10MB</p>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Difficulty */}
//           <div>
//             <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
//               Difficulty Level
//             </label>
//             <div className="grid grid-cols-3 gap-3">
//               {DIFFICULTY_CONFIG.map((d) => (
//                 <button
//                   key={d.key}
//                   onClick={() => setDifficulty(d.key)}
//                   className={`relative p-4 rounded-xl border text-left transition-all ${
//                     difficulty === d.key
//                       ? d.key === "basic"
//                         ? "border-emerald-500/50 bg-emerald-500/10"
//                         : d.key === "intermediate"
//                         ? "border-amber-500/50 bg-amber-500/10"
//                         : "border-rose-500/50 bg-rose-500/10"
//                       : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
//                   }`}
//                 >
//                   <div className={`text-sm font-bold mb-1 ${
//                     difficulty === d.key
//                       ? d.key === "basic" ? "text-emerald-400"
//                         : d.key === "intermediate" ? "text-amber-400"
//                         : "text-rose-400"
//                       : "text-white"
//                   }`}>
//                     {d.label}
//                   </div>
//                   <div className="text-xs text-zinc-500 leading-tight">{d.desc}</div>
//                   <div className={`text-xs mt-2 font-mono font-bold ${
//                     difficulty === d.key
//                       ? d.key === "basic" ? "text-emerald-500"
//                         : d.key === "intermediate" ? "text-amber-500"
//                         : "text-rose-500"
//                       : "text-zinc-600"
//                   }`}>
//                     {d.points}
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Info bar */}
//           <div className="flex items-center gap-4 text-xs text-zinc-600 bg-white/[0.02] rounded-lg px-4 py-3 border border-white/[0.04]">
//             <span>📝 4 questions</span>
//             <span className="w-px h-3 bg-zinc-700" />
//             <span>🎯 MCQ + MSQ mix</span>
//             <span className="w-px h-3 bg-zinc-700" />
//             <span>💡 Explanations included</span>
//           </div>

//           {/* Error */}
//           {error && (
//             <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
//                 <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
//               </svg>
//               {error}
//             </div>
//           )}

//           {/* CTA */}
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-base tracking-wide transition-all disabled:opacity-60 disabled:cursor-not-allowed group"
//           >
//             {loading ? (
//               <span className="flex items-center justify-center gap-3">
//                 <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
//                 </svg>
//                 {progress}
//               </span>
//             ) : (
//               <span className="flex items-center justify-center gap-2">
//                 Generate Quiz
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
//                   <path d="M5 12h14M12 5l7 7-7 7"/>
//                 </svg>
//               </span>
//             )}
//           </button>
//         </div>

//         {/* Features */}
//         <div className="grid grid-cols-3 gap-4 mt-8">
//           {[
//             { icon: "🔗", title: "Any Link", desc: "YouTube, Wikipedia, articles" },
//             { icon: "📄", title: "PDF Upload", desc: "Notes, textbooks, docs" },
//             { icon: "🏆", title: "Scored Results", desc: "Points, grades & explanations" },
//           ].map((f) => (
//             <div key={f.title} className="text-center">
//               <div className="text-2xl mb-2">{f.icon}</div>
//               <div className="text-xs font-semibold text-zinc-300">{f.title}</div>
//               <div className="text-xs text-zinc-600 mt-0.5">{f.desc}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }


















// "use client";
// import { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { Difficulty } from "@/types";

// const EXAMPLE_LINKS = [
//   { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Artificial_intelligence", icon: "📖" },
//   { label: "YouTube", url: "https://www.youtube.com/watch?v=aircAruvnKk", icon: "▶️" },
//   { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Black_hole", icon: "🌑" },
// ];

// const DIFFICULTY_CONFIG: {
//   key: Difficulty;
//   label: string;
//   desc: string;
//   color: string;
//   points: string;
// }[] = [
//   { key: "basic", label: "Basic", desc: "Recall & definitions", color: "emerald", points: "5 pts/q" },
//   { key: "intermediate", label: "Intermediate", desc: "Apply & connect concepts", color: "amber", points: "10 pts/q" },
//   { key: "advanced", label: "Advanced", desc: "Analyze & synthesize", color: "rose", points: "15 pts/q" },
// ];

// const FREE_LIMIT = 5;
// const MAX_QUESTIONS = 20;

// function UpgradeModal({ onClose }: { onClose: () => void }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
//       <div className="relative w-full max-w-md rounded-2xl border border-violet-500/30 bg-[#0e0e1a] p-8 shadow-2xl shadow-violet-900/30">
//         {/* Glow */}
//         <div className="absolute -top-px left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

//         <div className="flex flex-col items-center text-center gap-4">
//           <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-3xl shadow-lg shadow-violet-900/50">
//             ⚡
//           </div>
//           <div>
//             <h2 className="text-2xl font-black text-white tracking-tight">Unlock More Questions</h2>
//             <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
//               Free plan includes up to <span className="text-white font-semibold">5 questions</span> per quiz.<br />
//               Upgrade to generate up to <span className="text-violet-400 font-semibold">20 questions</span> and go deeper on any topic.
//             </p>
//           </div>

//           <div className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 space-y-2.5 text-sm text-left">
//             {[
//               ["✅", "Up to 20 questions per quiz"],
//               ["✅", "PDF + URL support"],
//               ["✅", "All difficulty levels"],
//               ["✅", "Priority AI processing"],
//             ].map(([icon, text]) => (
//               <div key={text} className="flex items-center gap-3 text-zinc-300">
//                 <span>{icon}</span>
//                 <span>{text}</span>
//               </div>
//             ))}
//           </div>

//           <button
//             onClick={onClose}
//             className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-violet-900/40"
//           >
//             Upgrade to Pro →
//           </button>
//           <button onClick={onClose} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
//             Maybe later
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function HomePage() {
//   const router = useRouter();
//   const [tab, setTab] = useState<"url" | "pdf">("url");
//   const [url, setUrl] = useState("");
//   const [pdfFile, setPdfFile] = useState<File | null>(null);
//   const [pdfDrag, setPdfDrag] = useState(false);
//   const [difficulty, setDifficulty] = useState<Difficulty>("intermediate");
//   const [questionCount, setQuestionCount] = useState(4);
//   const [showUpgrade, setShowUpgrade] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [progress, setProgress] = useState("");
//   const fileRef = useRef<HTMLInputElement>(null);

//   const handleFileChange = (file: File | null) => {
//     if (!file) return;
//     if (file.type !== "application/pdf") { setError("Only PDF files are supported."); return; }
//     if (file.size > 10 * 1024 * 1024) { setError("PDF must be under 10MB."); return; }
//     setError("");
//     setPdfFile(file);
//   };

//   const handleQuestionCountChange = (val: number) => {
//     if (val > FREE_LIMIT) { setShowUpgrade(true); return; }
//     setQuestionCount(val);
//   };

//   const handleSubmit = async () => {
//     if (tab === "url" && !url.trim()) { setError("Please enter a valid URL"); return; }
//     if (tab === "pdf" && !pdfFile) { setError("Please upload a PDF file"); return; }
//     setError("");
//     setLoading(true);
//     setProgress("Fetching content...");

//     try {
//       setTimeout(() => setProgress("Analyzing with AI..."), 1500);
//       setTimeout(() => setProgress("Crafting questions..."), 3500);

//       let res: Response;

//       if (tab === "pdf" && pdfFile) {
//         const formData = new FormData();
//         formData.append("pdf", pdfFile);
//         formData.append("difficulty", difficulty);
//         formData.append("questionCount", String(questionCount));
//         res = await fetch("/api/analyze", { method: "POST", body: formData });
//       } else {
//         res = await fetch("/api/analyze", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ url: url.trim(), difficulty, questionCount }),
//         });
//       }

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to generate quiz");

//       sessionStorage.setItem("quizSession", JSON.stringify(data.session));
//       router.push("/quiz");
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//       setLoading(false);
//     }
//   };

//   const totalPoints = (() => {
//     const pts = { basic: 5, intermediate: 10, advanced: 15 };
//     return pts[difficulty] * questionCount;
//   })();

//   return (
//     <>
//       {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}

//       <main className="min-h-screen bg-[#080810] text-white overflow-hidden relative">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />
//         <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_60%,#080810_100%)]" />
//         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg5OSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

//         <div className="relative z-10 max-w-2xl mx-auto px-6 py-20">
//           {/* Header */}
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8 tracking-wide">
//               <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
//               AI-POWERED QUIZ ENGINE
//             </div>
//             <h1 className="text-6xl font-black tracking-tighter leading-none mb-4">
//               <span className="text-white">Learn</span>
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400"> Deeper</span>
//             </h1>
//             <p className="text-zinc-400 text-lg leading-relaxed">
//               Paste any link or upload a PDF.<br />
//               We generate a quiz that tests your understanding.
//             </p>
//           </div>

//           <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-8 space-y-7">

//             {/* Tab switcher */}
//             <div className="flex gap-1 p-1 bg-white/[0.04] rounded-xl border border-white/[0.06]">
//               <button
//                 onClick={() => { setTab("url"); setError(""); }}
//                 className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${tab === "url" ? "bg-indigo-600 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
//               >
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
//                   <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
//                 </svg>
//                 URL / Link
//               </button>
//               <button
//                 onClick={() => { setTab("pdf"); setError(""); }}
//                 className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${tab === "pdf" ? "bg-indigo-600 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
//               >
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                   <polyline points="14 2 14 8 20 8"/>
//                   <line x1="16" y1="13" x2="8" y2="13"/>
//                   <line x1="16" y1="17" x2="8" y2="17"/>
//                   <polyline points="10 9 9 9 8 9"/>
//                 </svg>
//                 PDF Upload
//               </button>
//             </div>

//             {/* URL Input */}
//             {tab === "url" && (
//               <div>
//                 <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Source URL</label>
//                 <div className="relative">
//                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
//                       <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
//                     </svg>
//                   </span>
//                   <input
//                     type="url"
//                     value={url}
//                     onChange={(e) => { setUrl(e.target.value); setError(""); }}
//                     onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//                     placeholder="https://en.wikipedia.org/wiki/..."
//                     className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
//                   />
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-3">
//                   {EXAMPLE_LINKS.map((ex) => (
//                     <button
//                       key={ex.url}
//                       onClick={() => setUrl(ex.url)}
//                       className="text-xs px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-zinc-500 hover:text-zinc-300 hover:border-white/[0.12] transition-all"
//                     >
//                       {ex.icon} Try {ex.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* PDF Upload */}
//             {tab === "pdf" && (
//               <div>
//                 <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Upload PDF</label>
//                 <div
//                   onClick={() => fileRef.current?.click()}
//                   onDragOver={(e) => { e.preventDefault(); setPdfDrag(true); }}
//                   onDragLeave={() => setPdfDrag(false)}
//                   onDrop={(e) => { e.preventDefault(); setPdfDrag(false); handleFileChange(e.dataTransfer.files[0] ?? null); }}
//                   className={`relative flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
//                     pdfDrag ? "border-indigo-500/70 bg-indigo-500/10"
//                     : pdfFile ? "border-emerald-500/50 bg-emerald-500/[0.05]"
//                     : "border-white/[0.10] hover:border-white/[0.20] bg-white/[0.02]"
//                   }`}
//                 >
//                   <input ref={fileRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)} />
//                   {pdfFile ? (
//                     <>
//                       <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
//                         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                           <polyline points="20 6 9 17 4 12"/>
//                         </svg>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-sm font-semibold text-emerald-400">{pdfFile.name}</p>
//                         <p className="text-xs text-zinc-500 mt-1">{(pdfFile.size / 1024).toFixed(1)} KB — click to change</p>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center">
//                         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                           <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                           <polyline points="14 2 14 8 20 8"/>
//                           <line x1="12" y1="18" x2="12" y2="12"/>
//                           <line x1="9" y1="15" x2="15" y2="15"/>
//                         </svg>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-sm font-semibold text-zinc-300">Drop your PDF here</p>
//                         <p className="text-xs text-zinc-600 mt-1">or click to browse — max 10MB</p>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Question Count */}
//             <div>
//               <div className="flex items-center justify-between mb-3">
//                 <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
//                   Number of Questions
//                 </label>
//                 <div className="flex items-center gap-2">
//                   <span className="text-xs font-mono font-bold text-indigo-400">{questionCount} questions</span>
//                   <span className="text-xs text-zinc-600">·</span>
//                   <span className="text-xs font-mono font-bold text-zinc-500">{totalPoints} pts total</span>
//                 </div>
//               </div>

//               {/* Slider track */}
//               <div className="relative">
//                 <div className="flex gap-1.5">
//                   {Array.from({ length: MAX_QUESTIONS }, (_, i) => i + 1).map((n) => {
//                     const isSelected = n <= questionCount;
//                     const isFree = n <= FREE_LIMIT;
//                     const isLocked = !isFree;
//                     return (
//                       <button
//                         key={n}
//                         onClick={() => handleQuestionCountChange(n)}
//                         title={isLocked ? "Pro plan required" : `${n} question${n > 1 ? "s" : ""}`}
//                         className={`relative flex-1 h-8 rounded-md transition-all group ${
//                           isSelected && isFree
//                             ? "bg-indigo-500"
//                             : isSelected && isLocked
//                             ? "bg-violet-600"
//                             : isFree
//                             ? "bg-white/[0.07] hover:bg-white/[0.14]"
//                             : "bg-white/[0.04] hover:bg-violet-500/20"
//                         }`}
//                       >
//                         {isLocked && (
//                           <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                             <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.8)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
//                               <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
//                               <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
//                             </svg>
//                           </span>
//                         )}
//                       </button>
//                     );
//                   })}
//                 </div>

//                 {/* Free / Pro label below */}
//                 <div className="flex justify-between mt-2">
//                   <div className="flex items-center gap-1.5">
//                     <span className="w-2 h-2 rounded-sm bg-indigo-500" />
//                     <span className="text-[10px] text-zinc-500">Free (1–{FREE_LIMIT})</span>
//                   </div>
//                   <div className="flex items-center gap-1.5">
//                     <span className="w-2 h-2 rounded-sm bg-violet-600" />
//                     <span className="text-[10px] text-zinc-500">Pro ({FREE_LIMIT + 1}–{MAX_QUESTIONS})</span>
//                     <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-400 font-semibold border border-violet-500/30">⚡ Upgrade</span>
//                   </div>
//                 </div>
//               </div>

//               {/* +/- stepper */}
//               <div className="flex items-center justify-center gap-4 mt-4">
//                 <button
//                   onClick={() => handleQuestionCountChange(Math.max(1, questionCount - 1))}
//                   className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] text-zinc-300 hover:bg-white/[0.10] transition-all flex items-center justify-center text-lg font-bold"
//                 >
//                   −
//                 </button>
//                 <span className="text-2xl font-black text-white w-12 text-center tabular-nums">{questionCount}</span>
//                 <button
//                   onClick={() => handleQuestionCountChange(Math.min(MAX_QUESTIONS, questionCount + 1))}
//                   className={`w-9 h-9 rounded-lg border transition-all flex items-center justify-center text-lg font-bold ${
//                     questionCount >= FREE_LIMIT
//                       ? "bg-violet-500/10 border-violet-500/30 text-violet-400 hover:bg-violet-500/20"
//                       : "bg-white/[0.05] border-white/[0.08] text-zinc-300 hover:bg-white/[0.10]"
//                   }`}
//                 >
//                   {questionCount >= FREE_LIMIT ? "⚡" : "+"}
//                 </button>
//               </div>
//             </div>

//             {/* Difficulty */}
//             <div>
//               <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Difficulty Level</label>
//               <div className="grid grid-cols-3 gap-3">
//                 {DIFFICULTY_CONFIG.map((d) => (
//                   <button
//                     key={d.key}
//                     onClick={() => setDifficulty(d.key)}
//                     className={`relative p-4 rounded-xl border text-left transition-all ${
//                       difficulty === d.key
//                         ? d.key === "basic" ? "border-emerald-500/50 bg-emerald-500/10"
//                           : d.key === "intermediate" ? "border-amber-500/50 bg-amber-500/10"
//                           : "border-rose-500/50 bg-rose-500/10"
//                         : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
//                     }`}
//                   >
//                     <div className={`text-sm font-bold mb-1 ${
//                       difficulty === d.key
//                         ? d.key === "basic" ? "text-emerald-400"
//                           : d.key === "intermediate" ? "text-amber-400"
//                           : "text-rose-400"
//                         : "text-white"
//                     }`}>
//                       {d.label}
//                     </div>
//                     <div className="text-xs text-zinc-500 leading-tight">{d.desc}</div>
//                     <div className={`text-xs mt-2 font-mono font-bold ${
//                       difficulty === d.key
//                         ? d.key === "basic" ? "text-emerald-500"
//                           : d.key === "intermediate" ? "text-amber-500"
//                           : "text-rose-500"
//                         : "text-zinc-600"
//                     }`}>
//                       {d.points}
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Info bar */}
//             <div className="flex items-center gap-4 text-xs text-zinc-600 bg-white/[0.02] rounded-lg px-4 py-3 border border-white/[0.04]">
//               <span>📝 {questionCount} questions</span>
//               <span className="w-px h-3 bg-zinc-700" />
//               <span>🎯 MCQ + MSQ mix</span>
//               <span className="w-px h-3 bg-zinc-700" />
//               <span>🏆 {totalPoints} pts total</span>
//             </div>

//             {/* Error */}
//             {error && (
//               <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
//                   <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
//                 </svg>
//                 {error}
//               </div>
//             )}

//             {/* CTA */}
//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-base tracking-wide transition-all disabled:opacity-60 disabled:cursor-not-allowed group"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-3">
//                   <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
//                   </svg>
//                   {progress}
//                 </span>
//               ) : (
//                 <span className="flex items-center justify-center gap-2">
//                   Generate {questionCount} Question Quiz
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
//                     <path d="M5 12h14M12 5l7 7-7 7"/>
//                   </svg>
//                 </span>
//               )}
//             </button>
//           </div>

//           {/* Features */}
//           <div className="grid grid-cols-3 gap-4 mt-8">
//             {[
//               { icon: "🔗", title: "Any Link", desc: "YouTube, Wikipedia, articles" },
//               { icon: "📄", title: "PDF Upload", desc: "Notes, textbooks, docs" },
//               { icon: "🏆", title: "Scored Results", desc: "Points, grades & explanations" },
//             ].map((f) => (
//               <div key={f.title} className="text-center">
//                 <div className="text-2xl mb-2">{f.icon}</div>
//                 <div className="text-xs font-semibold text-zinc-300">{f.title}</div>
//                 <div className="text-xs text-zinc-600 mt-0.5">{f.desc}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }





























// "use client";
// import { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { Difficulty } from "@/types";

// const EXAMPLE_LINKS = [
//   { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Artificial_intelligence", icon: "📖" },
//   { label: "YouTube", url: "https://www.youtube.com/watch?v=aircAruvnKk", icon: "▶️" },
//   { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Black_hole", icon: "🌑" },
// ];

// const DIFFICULTY_CONFIG: {
//   key: Difficulty;
//   label: string;
//   desc: string;
//   color: string;
//   points: string;
// }[] = [
//   { key: "basic", label: "Basic", desc: "Recall & definitions", color: "emerald", points: "5 pts/q" },
//   { key: "intermediate", label: "Intermediate", desc: "Apply & connect concepts", color: "amber", points: "10 pts/q" },
//   { key: "advanced", label: "Advanced", desc: "Analyze & synthesize", color: "rose", points: "15 pts/q" },
// ];

// const FREE_LIMIT = 5;
// const MAX_QUESTIONS = 20;

// function UpgradeModal({ onClose }: { onClose: () => void }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
//       <div className="relative w-full max-w-md rounded-2xl border border-violet-500/30 bg-[#0e0e1a] p-8 shadow-2xl shadow-violet-900/30">
//         {/* Glow */}
//         <div className="absolute -top-px left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

//         <div className="flex flex-col items-center text-center gap-4">
//           <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-3xl shadow-lg shadow-violet-900/50">
//             ⚡
//           </div>
//           <div>
//             <h2 className="text-2xl font-black text-white tracking-tight">Unlock More Questions</h2>
//             <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
//               Free plan includes up to <span className="text-white font-semibold">5 questions</span> per quiz.<br />
//               Upgrade to generate up to <span className="text-violet-400 font-semibold">20 questions</span> and go deeper on any topic.
//             </p>
//           </div>

//           <div className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 space-y-2.5 text-sm text-left">
//             {[
//               ["✅", "Up to 20 questions per quiz"],
//               ["✅", "PDF + URL support"],
//               ["✅", "All difficulty levels"],
//               ["✅", "Priority AI processing"],
//             ].map(([icon, text]) => (
//               <div key={text} className="flex items-center gap-3 text-zinc-300">
//                 <span>{icon}</span>
//                 <span>{text}</span>
//               </div>
//             ))}
//           </div>

//           <button
//             onClick={onClose}
//             className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-violet-900/40"
//           >
//             Upgrade to Pro →
//           </button>
//           <button onClick={onClose} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
//             Maybe later
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function HomePage() {
//   const router = useRouter();
//   const [tab, setTab] = useState<"url" | "pdf">("url");
//   const [url, setUrl] = useState("");
//   const [pdfFile, setPdfFile] = useState<File | null>(null);
//   const [pdfDrag, setPdfDrag] = useState(false);
//   const [difficulty, setDifficulty] = useState<Difficulty>("intermediate");
//   const [questionCount, setQuestionCount] = useState(4);
//   const [showUpgrade, setShowUpgrade] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [progress, setProgress] = useState("");
//   const fileRef = useRef<HTMLInputElement>(null);

//   const handleFileChange = (file: File | null) => {
//     if (!file) return;
//     if (file.type !== "application/pdf") { setError("Only PDF files are supported."); return; }
//     if (file.size > 10 * 1024 * 1024) { setError("PDF must be under 10MB."); return; }
//     setError("");
//     setPdfFile(file);
//   };

//   const handleQuestionCountChange = (val: number) => {
//     if (val > FREE_LIMIT) { setShowUpgrade(true); return; }
//     setQuestionCount(val);
//   };

//   const handleSubmit = async () => {
//     if (tab === "url" && !url.trim()) { setError("Please enter a valid URL"); return; }
//     if (tab === "pdf" && !pdfFile) { setError("Please upload a PDF file"); return; }
//     setError("");
//     setLoading(true);
//     setProgress("Fetching content...");

//     try {
//       setTimeout(() => setProgress("Analyzing with AI..."), 1500);
//       setTimeout(() => setProgress("Crafting questions..."), 3500);

//       let res: Response;

//       if (tab === "pdf" && pdfFile) {
//         const formData = new FormData();
//         formData.append("pdf", pdfFile);
//         formData.append("difficulty", difficulty);
//         formData.append("questionCount", String(questionCount));
//         res = await fetch("/api/analyze", { method: "POST", body: formData });
//       } else {
//         res = await fetch("/api/analyze", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ url: url.trim(), difficulty, questionCount }),
//         });
//       }

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to generate quiz");

//       sessionStorage.setItem("quizSession", JSON.stringify(data.session));
//       router.push("/quiz");
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//       setLoading(false);
//     }
//   };

//   const totalPoints = (() => {
//     const pts = { basic: 5, intermediate: 10, advanced: 15 };
//     return pts[difficulty] * questionCount;
//   })();

//   return (
//     <>
//       {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}

//       <main className="min-h-screen bg-[#080810] text-white overflow-hidden relative">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />
//         <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_60%,#080810_100%)]" />
//         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg5OSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

//         <div className="relative z-10 max-w-2xl mx-auto px-6 py-20">
//           {/* Header */}
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8 tracking-wide">
//               <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
//               AI-POWERED QUIZ ENGINE
//             </div>
//             <h1 className="text-6xl font-black tracking-tighter leading-none mb-4">
//               <span className="text-white">Learn</span>
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400"> Deeper</span>
//             </h1>
//             <p className="text-zinc-400 text-lg leading-relaxed">
//               Paste any link or upload a PDF.<br />
//               We generate a quiz that tests your understanding.
//             </p>
//           </div>

//           <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-8 space-y-7">

//             {/* Tab switcher */}
//             <div className="flex gap-1 p-1 bg-white/[0.04] rounded-xl border border-white/[0.06]">
//               <button
//                 onClick={() => { setTab("url"); setError(""); }}
//                 className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${tab === "url" ? "bg-indigo-600 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
//               >
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
//                   <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
//                 </svg>
//                 URL / Link
//               </button>
//               <button
//                 onClick={() => { setTab("pdf"); setError(""); }}
//                 className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${tab === "pdf" ? "bg-indigo-600 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
//               >
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                   <polyline points="14 2 14 8 20 8"/>
//                   <line x1="16" y1="13" x2="8" y2="13"/>
//                   <line x1="16" y1="17" x2="8" y2="17"/>
//                   <polyline points="10 9 9 9 8 9"/>
//                 </svg>
//                 PDF Upload
//               </button>
//             </div>

//             {/* URL Input */}
//             {tab === "url" && (
//               <div>
//                 <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Source URL</label>
//                 <div className="relative">
//                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
//                       <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
//                     </svg>
//                   </span>
//                   <input
//                     type="url"
//                     value={url}
//                     onChange={(e) => { setUrl(e.target.value); setError(""); }}
//                     onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//                     placeholder="https://en.wikipedia.org/wiki/..."
//                     className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
//                   />
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-3">
//                   {EXAMPLE_LINKS.map((ex) => (
//                     <button
//                       key={ex.url}
//                       onClick={() => setUrl(ex.url)}
//                       className="text-xs px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-zinc-500 hover:text-zinc-300 hover:border-white/[0.12] transition-all"
//                     >
//                       {ex.icon} Try {ex.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* PDF Upload */}
//             {tab === "pdf" && (
//               <div>
//                 <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Upload PDF</label>
//                 <div
//                   onClick={() => fileRef.current?.click()}
//                   onDragOver={(e) => { e.preventDefault(); setPdfDrag(true); }}
//                   onDragLeave={() => setPdfDrag(false)}
//                   onDrop={(e) => { e.preventDefault(); setPdfDrag(false); handleFileChange(e.dataTransfer.files[0] ?? null); }}
//                   className={`relative flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
//                     pdfDrag ? "border-indigo-500/70 bg-indigo-500/10"
//                     : pdfFile ? "border-emerald-500/50 bg-emerald-500/[0.05]"
//                     : "border-white/[0.10] hover:border-white/[0.20] bg-white/[0.02]"
//                   }`}
//                 >
//                   <input ref={fileRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)} />
//                   {pdfFile ? (
//                     <>
//                       <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
//                         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                           <polyline points="20 6 9 17 4 12"/>
//                         </svg>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-sm font-semibold text-emerald-400">{pdfFile.name}</p>
//                         <p className="text-xs text-zinc-500 mt-1">{(pdfFile.size / 1024).toFixed(1)} KB — click to change</p>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center">
//                         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                           <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                           <polyline points="14 2 14 8 20 8"/>
//                           <line x1="12" y1="18" x2="12" y2="12"/>
//                           <line x1="9" y1="15" x2="15" y2="15"/>
//                         </svg>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-sm font-semibold text-zinc-300">Drop your PDF here</p>
//                         <p className="text-xs text-zinc-600 mt-1">or click to browse — max 10MB</p>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Question Count */}
//             <div>
//               <div className="flex items-center justify-between mb-3">
//                 <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
//                   Number of Questions
//                 </label>
//                 <div className="flex items-center gap-2">
//                   <span className="text-xs font-mono font-bold text-indigo-400">{questionCount} questions</span>
//                   <span className="text-xs text-zinc-600">·</span>
//                   <span className="text-xs font-mono font-bold text-zinc-500">{totalPoints} pts total</span>
//                 </div>
//               </div>

//               {/* Slider track */}
//               <div className="relative">
//                 <div className="flex gap-1.5">
//                   {Array.from({ length: MAX_QUESTIONS }, (_, i) => i + 1).map((n) => {
//                     const isSelected = n <= questionCount;
//                     const isFree = n <= FREE_LIMIT;
//                     const isLocked = !isFree;
//                     return (
//                       <button
//                         key={n}
//                         onClick={() => handleQuestionCountChange(n)}
//                         title={isLocked ? "Pro plan required" : `${n} question${n > 1 ? "s" : ""}`}
//                         className={`relative flex-1 h-8 rounded-md transition-all group ${
//                           isSelected && isFree
//                             ? "bg-indigo-500"
//                             : isSelected && isLocked
//                             ? "bg-violet-600"
//                             : isFree
//                             ? "bg-white/[0.07] hover:bg-white/[0.14]"
//                             : "bg-white/[0.04] hover:bg-violet-500/20"
//                         }`}
//                       >
//                         {isLocked && (
//                           <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                             <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.8)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
//                               <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
//                               <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
//                             </svg>
//                           </span>
//                         )}
//                       </button>
//                     );
//                   })}
//                 </div>

//                 {/* Free / Pro label below */}
//                 <div className="flex justify-between mt-2">
//                   <div className="flex items-center gap-1.5">
//                     <span className="w-2 h-2 rounded-sm bg-indigo-500" />
//                     <span className="text-[10px] text-zinc-500">Free (1–{FREE_LIMIT})</span>
//                   </div>
//                   <div className="flex items-center gap-1.5">
//                     <span className="w-2 h-2 rounded-sm bg-violet-600" />
//                     <span className="text-[10px] text-zinc-500">Pro ({FREE_LIMIT + 1}–{MAX_QUESTIONS})</span>
//                     <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-400 font-semibold border border-violet-500/30">⚡ Upgrade</span>
//                   </div>
//                 </div>
//               </div>

//               {/* +/- stepper */}
//               <div className="flex items-center justify-center gap-4 mt-4">
//                 <button
//                   onClick={() => handleQuestionCountChange(Math.max(1, questionCount - 1))}
//                   className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] text-zinc-300 hover:bg-white/[0.10] transition-all flex items-center justify-center text-lg font-bold"
//                 >
//                   −
//                 </button>
//                 <span className="text-2xl font-black text-white w-12 text-center tabular-nums">{questionCount}</span>
//                 <button
//                   onClick={() => handleQuestionCountChange(Math.min(MAX_QUESTIONS, questionCount + 1))}
//                   className={`w-9 h-9 rounded-lg border transition-all flex items-center justify-center text-lg font-bold ${
//                     questionCount >= FREE_LIMIT
//                       ? "bg-violet-500/10 border-violet-500/30 text-violet-400 hover:bg-violet-500/20"
//                       : "bg-white/[0.05] border-white/[0.08] text-zinc-300 hover:bg-white/[0.10]"
//                   }`}
//                 >
//                   {questionCount >= FREE_LIMIT ? "⚡" : "+"}
//                 </button>
//               </div>
//             </div>

//             {/* Difficulty */}
//             <div>
//               <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Difficulty Level</label>
//               <div className="grid grid-cols-3 gap-3">
//                 {DIFFICULTY_CONFIG.map((d) => (
//                   <button
//                     key={d.key}
//                     onClick={() => setDifficulty(d.key)}
//                     className={`relative p-4 rounded-xl border text-left transition-all ${
//                       difficulty === d.key
//                         ? d.key === "basic" ? "border-emerald-500/50 bg-emerald-500/10"
//                           : d.key === "intermediate" ? "border-amber-500/50 bg-amber-500/10"
//                           : "border-rose-500/50 bg-rose-500/10"
//                         : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
//                     }`}
//                   >
//                     <div className={`text-sm font-bold mb-1 ${
//                       difficulty === d.key
//                         ? d.key === "basic" ? "text-emerald-400"
//                           : d.key === "intermediate" ? "text-amber-400"
//                           : "text-rose-400"
//                         : "text-white"
//                     }`}>
//                       {d.label}
//                     </div>
//                     <div className="text-xs text-zinc-500 leading-tight">{d.desc}</div>
//                     <div className={`text-xs mt-2 font-mono font-bold ${
//                       difficulty === d.key
//                         ? d.key === "basic" ? "text-emerald-500"
//                           : d.key === "intermediate" ? "text-amber-500"
//                           : "text-rose-500"
//                         : "text-zinc-600"
//                     }`}>
//                       {d.points}
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Info bar */}
//             <div className="flex items-center gap-4 text-xs text-zinc-600 bg-white/[0.02] rounded-lg px-4 py-3 border border-white/[0.04]">
//               <span>📝 {questionCount} questions</span>
//               <span className="w-px h-3 bg-zinc-700" />
//               <span>🎯 MCQ + MSQ mix</span>
//               <span className="w-px h-3 bg-zinc-700" />
//               <span>🏆 {totalPoints} pts total</span>
//             </div>

//             {/* Error */}
//             {error && (
//               <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
//                   <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
//                 </svg>
//                 {error}
//               </div>
//             )}

//             {/* CTA */}
//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-base tracking-wide transition-all disabled:opacity-60 disabled:cursor-not-allowed group"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-3">
//                   <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
//                   </svg>
//                   {progress}
//                 </span>
//               ) : (
//                 <span className="flex items-center justify-center gap-2">
//                   Generate {questionCount} Question Quiz
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
//                     <path d="M5 12h14M12 5l7 7-7 7"/>
//                   </svg>
//                 </span>
//               )}
//             </button>
//           </div>

//           {/* Features */}
//           <div className="grid grid-cols-3 gap-4 mt-8">
//             {[
//               { icon: "🔗", title: "Any Link", desc: "YouTube, Wikipedia, articles" },
//               { icon: "📄", title: "PDF Upload", desc: "Notes, textbooks, docs" },
//               { icon: "🏆", title: "Scored Results", desc: "Points, grades & explanations" },
//             ].map((f) => (
//               <div key={f.title} className="text-center">
//                 <div className="text-2xl mb-2">{f.icon}</div>
//                 <div className="text-xs font-semibold text-zinc-300">{f.title}</div>
//                 <div className="text-xs text-zinc-600 mt-0.5">{f.desc}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }






























// "use client";
// import { useState, useRef, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { loadStripe } from "@stripe/stripe-js";
// import { Difficulty } from "@/types";

// // Initialize Stripe
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// const EXAMPLE_LINKS = [
//   { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Artificial_intelligence", icon: "📖" },
//   { label: "YouTube", url: "https://www.youtube.com/watch?v=aircAruvnKk", icon: "▶️" },
//   { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Black_hole", icon: "🌑" },
// ];

// const DIFFICULTY_CONFIG: {
//   key: Difficulty;
//   label: string;
//   desc: string;
//   color: string;
//   points: string;
// }[] = [
//   { key: "basic", label: "Basic", desc: "Recall & definitions", color: "emerald", points: "5 pts/q" },
//   { key: "intermediate", label: "Intermediate", desc: "Apply & connect concepts", color: "amber", points: "10 pts/q" },
//   { key: "advanced", label: "Advanced", desc: "Analyze & synthesize", color: "rose", points: "15 pts/q" },
// ];

// const FREE_LIMIT = 5;
// const MAX_QUESTIONS = 20;
// const PRO_PRICE = 15;

// function UpgradeModal({ onClose, onSubscribe }: { onClose: () => void; onSubscribe: () => void }) {
//   const [loading, setLoading] = useState(false);

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
//       <div className="relative w-full max-w-md rounded-2xl border border-violet-500/30 bg-[#0e0e1a] p-8 shadow-2xl shadow-violet-900/30">
//         <div className="absolute -top-px left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

//         <div className="flex flex-col items-center text-center gap-4">
//           <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-3xl shadow-lg shadow-violet-900/50">
//             ⚡
//           </div>
//           <div>
//             <h2 className="text-2xl font-black text-white tracking-tight">Unlock Pro Features</h2>
//             <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
//               Get unlimited quizzes, PDF uploads, and advanced AI processing
//             </p>
//           </div>

//           <div className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 space-y-2.5 text-sm text-left">
//             {[
//               ["✅", "Up to 20 questions per quiz"],
//               ["✅", "PDF + URL support"],
//               ["✅", "All difficulty levels"],
//               ["✅", "Priority AI processing"],
//               ["✅", "Export quizzes as PDF"],
//               ["✅", "Detailed analytics"],
//             ].map(([icon, text]) => (
//               <div key={text} className="flex items-center gap-3 text-zinc-300">
//                 <span>{icon}</span>
//                 <span>{text}</span>
//               </div>
//             ))}
//           </div>

//           <div className="text-center">
//             <div className="text-3xl font-bold text-white">${PRO_PRICE}</div>
//             <div className="text-xs text-zinc-500">per month</div>
//           </div>

//           <button
//             onClick={onSubscribe}
//             disabled={loading}
//             className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-violet-900/40 disabled:opacity-50"
//           >
//             {loading ? "Processing..." : "Subscribe Now →"}
//           </button>
//           <button onClick={onClose} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
//             Maybe later
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function HomePage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [tab, setTab] = useState<"url" | "pdf">("url");
//   const [url, setUrl] = useState("");
//   const [pdfFile, setPdfFile] = useState<File | null>(null);
//   const [pdfDrag, setPdfDrag] = useState(false);
//   const [difficulty, setDifficulty] = useState<Difficulty>("intermediate");
//   const [questionCount, setQuestionCount] = useState(4);
//   const [showUpgrade, setShowUpgrade] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [progress, setProgress] = useState("");
//   const [isPro, setIsPro] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const fileRef = useRef<HTMLInputElement>(null);

//   // Check subscription status
//   const checkSubscriptionStatus = async () => {
//     try {
//       const res = await fetch("/api/subscription/status");
//       const data = await res.json();
//       setIsPro(data.isPro);
//       if (data.isPro) {
//         localStorage.setItem("isPro", "true");
//       }
//     } catch {
//       const proStatus = localStorage.getItem("isPro");
//       setIsPro(proStatus === "true");
//     }
//   };

//   // Check URL params for payment success/cancel
//   useEffect(() => {
//     const success = searchParams.get("success");
//     const canceled = searchParams.get("canceled");
    
//     if (success === "true") {
//       setShowSuccess(true);
//       checkSubscriptionStatus();
//       const newUrl = window.location.pathname;
//       window.history.replaceState({}, "", newUrl);
//       setTimeout(() => setShowSuccess(false), 5000);
//     }
    
//     if (canceled === "true") {
//       setError("Payment was cancelled. You can try again anytime.");
//       const newUrl = window.location.pathname;
//       window.history.replaceState({}, "", newUrl);
//       setTimeout(() => setError(""), 5000);
//     }
//   }, [searchParams]);

//   // Check subscription on mount
//   useEffect(() => {
//     checkSubscriptionStatus();
//   }, []);

//   const handleSubscribe = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("/api/create-checkout", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           priceId: "price_pro_monthly",
//           successUrl: `${window.location.origin}/?success=true`,
//           cancelUrl: `${window.location.origin}/?canceled=true`,
//         }),
//       });

//       const { url } = await response.json();
//       window.location.href = url;
//     } catch (error) {
//       console.error("Error:", error);
//       setError("Failed to initiate checkout. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileChange = (file: File | null) => {
//     if (!file) return;
//     if (file.type !== "application/pdf") { setError("Only PDF files are supported."); return; }
//     if (file.size > 10 * 1024 * 1024) { setError("PDF must be under 10MB."); return; }
//     setError("");
//     setPdfFile(file);
//   };

//   const handleQuestionCountChange = (val: number) => {
//     if (!isPro && val > FREE_LIMIT) { 
//       setShowUpgrade(true); 
//       return; 
//     }
//     setQuestionCount(val);
//   };

//   const handleSubmit = async () => {
//     if (tab === "url" && !url.trim()) { setError("Please enter a valid URL"); return; }
//     if (tab === "pdf" && !pdfFile) { setError("Please upload a PDF file"); return; }
    
//     if (!isPro && questionCount > FREE_LIMIT) {
//       setShowUpgrade(true);
//       return;
//     }
    
//     setError("");
//     setLoading(true);
//     setProgress("Fetching content...");

//     try {
//       setTimeout(() => setProgress("Analyzing with AI..."), 1500);
//       setTimeout(() => setProgress("Crafting questions..."), 3500);

//       let res: Response;

//       if (tab === "pdf" && pdfFile) {
//         const formData = new FormData();
//         formData.append("pdf", pdfFile);
//         formData.append("difficulty", difficulty);
//         formData.append("questionCount", String(questionCount));
//         res = await fetch("/api/analyze", { method: "POST", body: formData });
//       } else {
//         res = await fetch("/api/analyze", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ url: url.trim(), difficulty, questionCount }),
//         });
//       }

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to generate quiz");

//       sessionStorage.setItem("quizSession", JSON.stringify(data.session));
//       router.push("/quiz");
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//       setLoading(false);
//     }
//   };

//   const totalPoints = (() => {
//     const pts = { basic: 5, intermediate: 10, advanced: 15 };
//     return pts[difficulty] * questionCount;
//   })();

//   return (
//     <>
//       {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} onSubscribe={handleSubscribe} />}

//       {/* Success Toast */}
//       {showSuccess && (
//         <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top fade-in duration-300">
//           <div className="bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded-xl px-6 py-3 flex items-center gap-3 shadow-xl">
//             <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5">
//                 <polyline points="20 6 9 17 4 12"/>
//               </svg>
//             </div>
//             <div>
//               <p className="font-semibold text-emerald-400">Payment Successful!</p>
//               <p className="text-xs text-emerald-300/80">You are now a Pro member!</p>
//             </div>
//           </div>
//         </div>
//       )}

//       <main className="min-h-screen bg-[#080810] text-white overflow-hidden relative">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />
//         <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_60%,#080810_100%)]" />
//         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg5OSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

//         <div className="relative z-10 max-w-2xl mx-auto px-6 py-20">
//           {/* Header */}
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8 tracking-wide">
//               <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
//               {isPro ? "⚡ PRO PLAN ACTIVE" : "AI-POWERED QUIZ ENGINE"}
//             </div>
//             <h1 className="text-6xl font-black tracking-tighter leading-none mb-4">
//               <span className="text-white">Learn</span>
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400"> Deeper</span>
//             </h1>
//             <p className="text-zinc-400 text-lg leading-relaxed">
//               Paste any link or upload a PDF.<br />
//               We generate a quiz that tests your understanding.
//             </p>
//             {!isPro && (
//               <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-400 text-xs">
//                 <span>⚡</span>
//                 <span>Free: {FREE_LIMIT} questions | Pro: ${PRO_PRICE}/month</span>
//               </div>
//             )}
//           </div>

//           <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-8 space-y-7">
//             {/* Tab switcher */}
//             <div className="flex gap-1 p-1 bg-white/[0.04] rounded-xl border border-white/[0.06]">
//               <button
//                 onClick={() => { setTab("url"); setError(""); }}
//                 className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${tab === "url" ? "bg-indigo-600 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
//               >
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
//                   <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
//                 </svg>
//                 URL / Link
//               </button>
//               <button
//                 onClick={() => { setTab("pdf"); setError(""); }}
//                 className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${tab === "pdf" ? "bg-indigo-600 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
//               >
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                   <polyline points="14 2 14 8 20 8"/>
//                   <line x1="16" y1="13" x2="8" y2="13"/>
//                   <line x1="16" y1="17" x2="8" y2="17"/>
//                 </svg>
//                 PDF Upload
//               </button>
//             </div>

//             {/* URL Input */}
//             {tab === "url" && (
//               <div>
//                 <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Source URL</label>
//                 <div className="relative">
//                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
//                       <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
//                     </svg>
//                   </span>
//                   <input
//                     type="url"
//                     value={url}
//                     onChange={(e) => { setUrl(e.target.value); setError(""); }}
//                     onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//                     placeholder="https://en.wikipedia.org/wiki/..."
//                     className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
//                   />
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-3">
//                   {EXAMPLE_LINKS.map((ex) => (
//                     <button
//                       key={ex.url}
//                       onClick={() => setUrl(ex.url)}
//                       className="text-xs px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-zinc-500 hover:text-zinc-300 hover:border-white/[0.12] transition-all"
//                     >
//                       {ex.icon} Try {ex.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* PDF Upload */}
//             {tab === "pdf" && (
//               <div>
//                 <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Upload PDF</label>
//                 <div
//                   onClick={() => fileRef.current?.click()}
//                   onDragOver={(e) => { e.preventDefault(); setPdfDrag(true); }}
//                   onDragLeave={() => setPdfDrag(false)}
//                   onDrop={(e) => { e.preventDefault(); setPdfDrag(false); handleFileChange(e.dataTransfer.files[0] ?? null); }}
//                   className={`relative flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
//                     pdfDrag ? "border-indigo-500/70 bg-indigo-500/10"
//                     : pdfFile ? "border-emerald-500/50 bg-emerald-500/[0.05]"
//                     : "border-white/[0.10] hover:border-white/[0.20] bg-white/[0.02]"
//                   }`}
//                 >
//                   <input ref={fileRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)} />
//                   {pdfFile ? (
//                     <>
//                       <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
//                         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
//                           <polyline points="20 6 9 17 4 12"/>
//                         </svg>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-sm font-semibold text-emerald-400">{pdfFile.name}</p>
//                         <p className="text-xs text-zinc-500 mt-1">{(pdfFile.size / 1024).toFixed(1)} KB — click to change</p>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center">
//                         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
//                           <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                           <polyline points="14 2 14 8 20 8"/>
//                           <line x1="12" y1="18" x2="12" y2="12"/>
//                           <line x1="9" y1="15" x2="15" y2="15"/>
//                         </svg>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-sm font-semibold text-zinc-300">Drop your PDF here</p>
//                         <p className="text-xs text-zinc-600 mt-1">or click to browse — max 10MB</p>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Question Count */}
//             <div>
//               <div className="flex items-center justify-between mb-3">
//                 <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
//                   Number of Questions
//                 </label>
//                 <div className="flex items-center gap-2">
//                   <span className="text-xs font-mono font-bold text-indigo-400">{questionCount} questions</span>
//                   <span className="text-xs text-zinc-600">·</span>
//                   <span className="text-xs font-mono font-bold text-zinc-500">{totalPoints} pts total</span>
//                 </div>
//               </div>

//               <div className="relative">
//                 <div className="flex gap-1.5">
//                   {Array.from({ length: MAX_QUESTIONS }, (_, i) => i + 1).map((n) => {
//                     const isSelected = n <= questionCount;
//                     const isAvailable = isPro || n <= FREE_LIMIT;
//                     return (
//                       <button
//                         key={n}
//                         onClick={() => isAvailable && handleQuestionCountChange(n)}
//                         disabled={!isAvailable}
//                         className={`relative flex-1 h-8 rounded-md transition-all group ${
//                           isSelected && isAvailable
//                             ? "bg-indigo-500"
//                             : isSelected && !isAvailable
//                             ? "bg-violet-600"
//                             : isAvailable
//                             ? "bg-white/[0.07] hover:bg-white/[0.14]"
//                             : "bg-white/[0.04] cursor-not-allowed"
//                         }`}
//                       >
//                         {!isAvailable && (
//                           <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                             <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.8)" strokeWidth="3">
//                               <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
//                               <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
//                             </svg>
//                           </span>
//                         )}
//                       </button>
//                     );
//                   })}
//                 </div>

//                 <div className="flex justify-between mt-2">
//                   <div className="flex items-center gap-1.5">
//                     <span className="w-2 h-2 rounded-sm bg-indigo-500" />
//                     <span className="text-[10px] text-zinc-500">Free (1–{FREE_LIMIT})</span>
//                   </div>
//                   <div className="flex items-center gap-1.5">
//                     <span className="w-2 h-2 rounded-sm bg-violet-600" />
//                     <span className="text-[10px] text-zinc-500">Pro ({FREE_LIMIT + 1}–{MAX_QUESTIONS})</span>
//                     {!isPro && (
//                       <button
//                         onClick={() => setShowUpgrade(true)}
//                         className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-400 font-semibold border border-violet-500/30 hover:bg-violet-500/30 transition-all"
//                       >
//                         ⚡ Upgrade
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center justify-center gap-4 mt-4">
//                 <button
//                   onClick={() => handleQuestionCountChange(Math.max(1, questionCount - 1))}
//                   className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] text-zinc-300 hover:bg-white/[0.10] transition-all flex items-center justify-center text-lg font-bold"
//                 >
//                   −
//                 </button>
//                 <span className="text-2xl font-black text-white w-12 text-center tabular-nums">{questionCount}</span>
//                 <button
//                   onClick={() => handleQuestionCountChange(Math.min(MAX_QUESTIONS, questionCount + 1))}
//                   className={`w-9 h-9 rounded-lg border transition-all flex items-center justify-center text-lg font-bold ${
//                     questionCount >= FREE_LIMIT && !isPro
//                       ? "bg-violet-500/10 border-violet-500/30 text-violet-400 hover:bg-violet-500/20"
//                       : "bg-white/[0.05] border-white/[0.08] text-zinc-300 hover:bg-white/[0.10]"
//                   }`}
//                 >
//                   {questionCount >= FREE_LIMIT && !isPro ? "⚡" : "+"}
//                 </button>
//               </div>
//             </div>

//             {/* Difficulty */}
//             <div>
//               <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Difficulty Level</label>
//               <div className="grid grid-cols-3 gap-3">
//                 {DIFFICULTY_CONFIG.map((d) => (
//                   <button
//                     key={d.key}
//                     onClick={() => setDifficulty(d.key)}
//                     className={`relative p-4 rounded-xl border text-left transition-all ${
//                       difficulty === d.key
//                         ? d.key === "basic" ? "border-emerald-500/50 bg-emerald-500/10"
//                           : d.key === "intermediate" ? "border-amber-500/50 bg-amber-500/10"
//                           : "border-rose-500/50 bg-rose-500/10"
//                         : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
//                     }`}
//                   >
//                     <div className={`text-sm font-bold mb-1 ${
//                       difficulty === d.key
//                         ? d.key === "basic" ? "text-emerald-400"
//                           : d.key === "intermediate" ? "text-amber-400"
//                           : "text-rose-400"
//                         : "text-white"
//                     }`}>
//                       {d.label}
//                     </div>
//                     <div className="text-xs text-zinc-500 leading-tight">{d.desc}</div>
//                     <div className={`text-xs mt-2 font-mono font-bold ${
//                       difficulty === d.key
//                         ? d.key === "basic" ? "text-emerald-500"
//                           : d.key === "intermediate" ? "text-amber-500"
//                           : "text-rose-500"
//                         : "text-zinc-600"
//                     }`}>
//                       {d.points}
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Info bar */}
//             <div className="flex items-center gap-4 text-xs text-zinc-600 bg-white/[0.02] rounded-lg px-4 py-3 border border-white/[0.04]">
//               <span>📝 {questionCount} questions</span>
//               <span className="w-px h-3 bg-zinc-700" />
//               <span>🎯 MCQ + MSQ mix</span>
//               <span className="w-px h-3 bg-zinc-700" />
//               <span>🏆 {totalPoints} pts total</span>
//               {!isPro && questionCount > FREE_LIMIT && (
//                 <>
//                   <span className="w-px h-3 bg-zinc-700" />
//                   <span className="text-violet-400">⚡ Pro required</span>
//                 </>
//               )}
//             </div>

//             {/* Error */}
//             {error && (
//               <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
//                   <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
//                 </svg>
//                 {error}
//               </div>
//             )}

//             {/* CTA */}
//             <button
//               onClick={handleSubmit}
//               disabled={loading || (!isPro && questionCount > FREE_LIMIT)}
//               className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-base tracking-wide transition-all disabled:opacity-60 disabled:cursor-not-allowed group"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-3">
//                   <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
//                   </svg>
//                   {progress}
//                 </span>
//               ) : (
//                 <span className="flex items-center justify-center gap-2">
//                   {!isPro && questionCount > FREE_LIMIT ? "Upgrade to Generate" : `Generate ${questionCount} Question Quiz`}
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform">
//                     <path d="M5 12h14M12 5l7 7-7 7"/>
//                   </svg>
//                 </span>
//               )}
//             </button>
//           </div>

//           {/* Features */}
//           <div className="grid grid-cols-3 gap-4 mt-8">
//             {[
//               { icon: "🔗", title: "Any Link", desc: "YouTube, Wikipedia, articles" },
//               { icon: "📄", title: "PDF Upload", desc: "Notes, textbooks, docs" },
//               { icon: "🏆", title: "Scored Results", desc: "Points, grades & explanations" },
//             ].map((f) => (
//               <div key={f.title} className="text-center">
//                 <div className="text-2xl mb-2">{f.icon}</div>
//                 <div className="text-xs font-semibold text-zinc-300">{f.title}</div>
//                 <div className="text-xs text-zinc-600 mt-0.5">{f.desc}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }













































// "use client";
// import { useState, useRef, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { loadStripe } from "@stripe/stripe-js";
// import { Difficulty } from "@/types";

// // Initialize Stripe
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// const EXAMPLE_LINKS = [
//   { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Artificial_intelligence", icon: "📖" },
//   { label: "YouTube", url: "https://www.youtube.com/watch?v=aircAruvnKk", icon: "▶️" },
//   { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Black_hole", icon: "🌑" },
// ];

// const DIFFICULTY_CONFIG: {
//   key: Difficulty;
//   label: string;
//   desc: string;
//   color: string;
//   points: string;
// }[] = [
//   { key: "basic", label: "Basic", desc: "Recall & definitions", color: "emerald", points: "5 pts/q" },
//   { key: "intermediate", label: "Intermediate", desc: "Apply & connect concepts", color: "amber", points: "10 pts/q" },
//   { key: "advanced", label: "Advanced", desc: "Analyze & synthesize", color: "rose", points: "15 pts/q" },
// ];

// const FREE_LIMIT = 5;
// const MAX_QUESTIONS = 20;
// const PRO_PRICE = 15;

// function UpgradeModal({ onClose, onSubscribe }: { onClose: () => void; onSubscribe: () => void }) {
//   const [loading, setLoading] = useState(false);

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
//       <div className="relative w-full max-w-[90vw] sm:max-w-md rounded-2xl border border-violet-500/30 bg-[#0e0e1a] p-5 sm:p-8 shadow-2xl shadow-violet-900/30">
//         <div className="absolute -top-px left-1/2 -translate-x-1/2 w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

//         <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
//           <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-2xl sm:text-3xl shadow-lg shadow-violet-900/50">
//             ⚡
//           </div>
//           <div>
//             <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">Unlock Pro Features</h2>
//             <p className="text-zinc-400 text-xs sm:text-sm mt-2 leading-relaxed">
//               Get unlimited quizzes, PDF uploads, and advanced AI processing
//             </p>
//           </div>

//           <div className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 sm:p-4 space-y-2 text-sm text-left">
//             {[
//               ["✅", "Up to 20 questions per quiz"],
//               ["✅", "PDF + URL support"],
//               ["✅", "All difficulty levels"],
//               ["✅", "Priority AI processing"],
//               ["✅", "Export quizzes as PDF"],
//               ["✅", "Detailed analytics"],
//             ].map(([icon, text]) => (
//               <div key={text} className="flex items-center gap-2 sm:gap-3 text-zinc-300 text-xs sm:text-sm">
//                 <span>{icon}</span>
//                 <span>{text}</span>
//               </div>
//             ))}
//           </div>

//           <div className="text-center">
//             <div className="text-2xl sm:text-3xl font-bold text-white">${PRO_PRICE}</div>
//             <div className="text-xs text-zinc-500">per month</div>
//           </div>

//           <button
//             onClick={onSubscribe}
//             disabled={loading}
//             className="w-full py-2.5 sm:py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-violet-900/40 disabled:opacity-50"
//           >
//             {loading ? "Processing..." : "Subscribe Now →"}
//           </button>
//           <button onClick={onClose} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
//             Maybe later
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function HomePage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [tab, setTab] = useState<"url" | "pdf">("url");
//   const [url, setUrl] = useState("");
//   const [pdfFile, setPdfFile] = useState<File | null>(null);
//   const [pdfDrag, setPdfDrag] = useState(false);
//   const [difficulty, setDifficulty] = useState<Difficulty>("intermediate");
//   const [questionCount, setQuestionCount] = useState(4);
//   const [showUpgrade, setShowUpgrade] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [progress, setProgress] = useState("");
//   const [isPro, setIsPro] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const fileRef = useRef<HTMLInputElement>(null);

//   // Check subscription status
//   const checkSubscriptionStatus = async () => {
//     try {
//       const res = await fetch("/api/subscription/status");
//       const data = await res.json();
//       setIsPro(data.isPro);
//       if (data.isPro) {
//         localStorage.setItem("isPro", "true");
//       }
//     } catch {
//       const proStatus = localStorage.getItem("isPro");
//       setIsPro(proStatus === "true");
//     }
//   };

//   // Check URL params for payment success/cancel
//   useEffect(() => {
//     const success = searchParams.get("success");
//     const canceled = searchParams.get("canceled");
    
//     if (success === "true") {
//       setShowSuccess(true);
//       checkSubscriptionStatus();
//       const newUrl = window.location.pathname;
//       window.history.replaceState({}, "", newUrl);
//       setTimeout(() => setShowSuccess(false), 5000);
//     }
    
//     if (canceled === "true") {
//       setError("Payment was cancelled. You can try again anytime.");
//       const newUrl = window.location.pathname;
//       window.history.replaceState({}, "", newUrl);
//       setTimeout(() => setError(""), 5000);
//     }
//   }, [searchParams]);

//   // Check subscription on mount
//   useEffect(() => {
//     checkSubscriptionStatus();
//   }, []);

//   const handleSubscribe = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("/api/create-checkout", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           priceId: "price_pro_monthly",
//           successUrl: `${window.location.origin}/?success=true`,
//           cancelUrl: `${window.location.origin}/?canceled=true`,
//         }),
//       });

//       const { url } = await response.json();
//       window.location.href = url;
//     } catch (error) {
//       console.error("Error:", error);
//       setError("Failed to initiate checkout. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileChange = (file: File | null) => {
//     if (!file) return;
//     if (file.type !== "application/pdf") { setError("Only PDF files are supported."); return; }
//     if (file.size > 10 * 1024 * 1024) { setError("PDF must be under 10MB."); return; }
//     setError("");
//     setPdfFile(file);
//   };

//   const handleQuestionCountChange = (val: number) => {
//     if (!isPro && val > FREE_LIMIT) { 
//       setShowUpgrade(true); 
//       return; 
//     }
//     setQuestionCount(val);
//   };

//   const handleSubmit = async () => {
//     if (tab === "url" && !url.trim()) { setError("Please enter a valid URL"); return; }
//     if (tab === "pdf" && !pdfFile) { setError("Please upload a PDF file"); return; }
    
//     if (!isPro && questionCount > FREE_LIMIT) {
//       setShowUpgrade(true);
//       return;
//     }
    
//     setError("");
//     setLoading(true);
//     setProgress("Fetching content...");

//     try {
//       setTimeout(() => setProgress("Analyzing with AI..."), 1500);
//       setTimeout(() => setProgress("Crafting questions..."), 3500);

//       let res: Response;

//       if (tab === "pdf" && pdfFile) {
//         const formData = new FormData();
//         formData.append("pdf", pdfFile);
//         formData.append("difficulty", difficulty);
//         formData.append("questionCount", String(questionCount));
//         res = await fetch("/api/analyze", { method: "POST", body: formData });
//       } else {
//         res = await fetch("/api/analyze", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ url: url.trim(), difficulty, questionCount }),
//         });
//       }

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to generate quiz");

//       sessionStorage.setItem("quizSession", JSON.stringify(data.session));
//       router.push("/quiz");
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//       setLoading(false);
//     }
//   };

//   const totalPoints = (() => {
//     const pts = { basic: 5, intermediate: 10, advanced: 15 };
//     return pts[difficulty] * questionCount;
//   })();

//   return (
//     <>
//       {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} onSubscribe={handleSubscribe} />}

//       {/* Success Toast - Responsive */}
//       {showSuccess && (
//         <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top fade-in duration-300 w-[90vw] sm:w-auto">
//           <div className="bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded-xl px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3 shadow-xl">
//             <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
//               <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5">
//                 <polyline points="20 6 9 17 4 12"/>
//               </svg>
//             </div>
//             <div>
//               <p className="font-semibold text-emerald-400 text-sm sm:text-base">Payment Successful!</p>
//               <p className="text-xs text-emerald-300/80 hidden xs:block">You are now a Pro member!</p>
//             </div>
//           </div>
//         </div>
//       )}

//       <main className="min-h-screen bg-[#080810] text-white overflow-hidden relative">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />
//         <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_60%,#080810_100%)]" />
//         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg5OSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

//         <div className="relative z-10 max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-20">
//           <div className="max-w-2xl mx-auto">
//             {/* Header - Fully Responsive */}
//             <div className="text-center mb-8 sm:mb-12 md:mb-16">
//               <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-[10px] sm:text-sm font-medium mb-6 sm:mb-8 tracking-wide">
//                 <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
//                 <span className="hidden xs:inline">{isPro ? "⚡ PRO PLAN ACTIVE" : "AI-POWERED QUIZ ENGINE"}</span>
//                 <span className="xs:hidden">{isPro ? "PRO" : "AI QUIZ"}</span>
//               </div>
//               <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-tight sm:leading-none mb-3 sm:mb-4">
//                 <span className="text-white">Learn</span>
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400"> Deeper</span>
//               </h1>
//               <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed px-2">
//                 Paste any link or upload a PDF.<br className="hidden xs:block" />
//                 We generate a quiz that tests your understanding.
//               </p>
//               {!isPro && (
//                 <div className="mt-3 sm:mt-4 inline-flex flex-wrap items-center justify-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-violet-500/20 text-violet-400 text-[10px] sm:text-xs">
//                   <span>⚡</span>
//                   <span>Free: {FREE_LIMIT} questions</span>
//                   <span className="hidden xs:inline">|</span>
//                   <span>Pro: ${PRO_PRICE}/month</span>
//                 </div>
//               )}
//             </div>

//             {/* Main Card - Responsive */}
//             <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-7">
              
//               {/* Tab switcher - Responsive */}
//               <div className="flex gap-1 p-1 bg-white/[0.04] rounded-xl border border-white/[0.06]">
//                 <button
//                   onClick={() => { setTab("url"); setError(""); }}
//                   className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
//                     tab === "url" ? "bg-indigo-600 text-white" : "text-zinc-500 hover:text-zinc-300"
//                   }`}
//                 >
//                   <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
//                     <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
//                   </svg>
//                   <span className="hidden xs:inline">URL / Link</span>
//                   <span className="xs:hidden">URL</span>
//                 </button>
//                 <button
//                   onClick={() => { setTab("pdf"); setError(""); }}
//                   className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
//                     tab === "pdf" ? "bg-indigo-600 text-white" : "text-zinc-500 hover:text-zinc-300"
//                   }`}
//                 >
//                   <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                     <polyline points="14 2 14 8 20 8"/>
//                     <line x1="16" y1="13" x2="8" y2="13"/>
//                     <line x1="16" y1="17" x2="8" y2="17"/>
//                   </svg>
//                   <span className="hidden xs:inline">PDF Upload</span>
//                   <span className="xs:hidden">PDF</span>
//                 </button>
//               </div>

//               {/* URL Input - Responsive */}
//               {tab === "url" && (
//                 <div>
//                   <label className="block text-[10px] sm:text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2 sm:mb-3">Source URL</label>
//                   <div className="relative">
//                     <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-zinc-500">
//                       <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
//                         <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
//                       </svg>
//                     </span>
//                     <input
//                       type="url"
//                       value={url}
//                       onChange={(e) => { setUrl(e.target.value); setError(""); }}
//                       onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//                       placeholder="https://en.wikipedia.org/wiki/..."
//                       className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3.5 text-white placeholder-zinc-600 text-xs sm:text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
//                     />
//                   </div>
//                   <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
//                     {EXAMPLE_LINKS.map((ex) => (
//                       <button
//                         key={ex.url}
//                         onClick={() => setUrl(ex.url)}
//                         className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-zinc-500 hover:text-zinc-300 hover:border-white/[0.12] transition-all"
//                       >
//                         {ex.icon} Try {ex.label}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* PDF Upload - Responsive */}
//               {tab === "pdf" && (
//                 <div>
//                   <label className="block text-[10px] sm:text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2 sm:mb-3">Upload PDF</label>
//                   <div
//                     onClick={() => fileRef.current?.click()}
//                     onDragOver={(e) => { e.preventDefault(); setPdfDrag(true); }}
//                     onDragLeave={() => setPdfDrag(false)}
//                     onDrop={(e) => { e.preventDefault(); setPdfDrag(false); handleFileChange(e.dataTransfer.files[0] ?? null); }}
//                     className={`relative flex flex-col items-center justify-center gap-2 sm:gap-3 p-6 sm:p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
//                       pdfDrag ? "border-indigo-500/70 bg-indigo-500/10"
//                       : pdfFile ? "border-emerald-500/50 bg-emerald-500/[0.05]"
//                       : "border-white/[0.10] hover:border-white/[0.20] bg-white/[0.02]"
//                     }`}
//                   >
//                     <input ref={fileRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)} />
//                     {pdfFile ? (
//                       <>
//                         <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
//                           <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
//                             <polyline points="20 6 9 17 4 12"/>
//                           </svg>
//                         </div>
//                         <div className="text-center">
//                           <p className="text-xs sm:text-sm font-semibold text-emerald-400 truncate max-w-[200px] sm:max-w-none">{pdfFile.name}</p>
//                           <p className="text-[10px] sm:text-xs text-zinc-500 mt-1">{(pdfFile.size / 1024).toFixed(1)} KB — click to change</p>
//                         </div>
//                       </>
//                     ) : (
//                       <>
//                         <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/[0.05] flex items-center justify-center">
//                           <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
//                             <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                             <polyline points="14 2 14 8 20 8"/>
//                             <line x1="12" y1="18" x2="12" y2="12"/>
//                             <line x1="9" y1="15" x2="15" y2="15"/>
//                           </svg>
//                         </div>
//                         <div className="text-center">
//                           <p className="text-xs sm:text-sm font-semibold text-zinc-300">Drop your PDF here</p>
//                           <p className="text-[10px] sm:text-xs text-zinc-600 mt-1">or click to browse — max 10MB</p>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Question Count - Responsive */}
//               <div>
//                 <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 mb-2 sm:mb-3">
//                   <label className="text-[10px] sm:text-xs font-semibold text-zinc-400 uppercase tracking-widest">
//                     Number of Questions
//                   </label>
//                   <div className="flex items-center gap-2">
//                     <span className="text-xs font-mono font-bold text-indigo-400">{questionCount} questions</span>
//                     <span className="text-xs text-zinc-600">·</span>
//                     <span className="text-xs font-mono font-bold text-zinc-500">{totalPoints} pts total</span>
//                   </div>
//                 </div>

//                 <div className="relative overflow-x-auto pb-2 sm:overflow-visible">
//                   <div className="flex gap-1 min-w-max sm:min-w-0">
//                     {Array.from({ length: MAX_QUESTIONS }, (_, i) => i + 1).map((n) => {
//                       const isSelected = n <= questionCount;
//                       const isAvailable = isPro || n <= FREE_LIMIT;
//                       return (
//                         <button
//                           key={n}
//                           onClick={() => isAvailable && handleQuestionCountChange(n)}
//                           disabled={!isAvailable}
//                           className={`relative w-7 h-7 sm:w-auto sm:flex-1 sm:h-8 rounded-md transition-all group ${
//                             isSelected && isAvailable
//                               ? "bg-indigo-500"
//                               : isSelected && !isAvailable
//                               ? "bg-violet-600"
//                               : isAvailable
//                               ? "bg-white/[0.07] hover:bg-white/[0.14]"
//                               : "bg-white/[0.04] cursor-not-allowed"
//                           }`}
//                         >
//                           {!isAvailable && (
//                             <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                               <svg className="w-1.5 h-1.5 sm:w-2 sm:h-2" viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.8)" strokeWidth="3">
//                                 <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
//                                 <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
//                               </svg>
//                             </span>
//                           )}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 <div className="flex flex-col xs:flex-row justify-between gap-1 mt-2">
//                   <div className="flex items-center gap-1.5">
//                     <span className="w-2 h-2 rounded-sm bg-indigo-500" />
//                     <span className="text-[9px] sm:text-[10px] text-zinc-500">Free (1–{FREE_LIMIT})</span>
//                   </div>
//                   <div className="flex items-center gap-1.5">
//                     <span className="w-2 h-2 rounded-sm bg-violet-600" />
//                     <span className="text-[9px] sm:text-[10px] text-zinc-500">Pro ({FREE_LIMIT + 1}–{MAX_QUESTIONS})</span>
//                     {!isPro && (
//                       <button
//                         onClick={() => setShowUpgrade(true)}
//                         className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-400 font-semibold border border-violet-500/30 hover:bg-violet-500/30 transition-all"
//                       >
//                         ⚡ Upgrade
//                       </button>
//                     )}
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-center gap-3 sm:gap-4 mt-3 sm:mt-4">
//                   <button
//                     onClick={() => handleQuestionCountChange(Math.max(1, questionCount - 1))}
//                     className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] text-zinc-300 hover:bg-white/[0.10] transition-all flex items-center justify-center text-base sm:text-lg font-bold"
//                   >
//                     −
//                   </button>
//                   <span className="text-xl sm:text-2xl font-black text-white w-10 sm:w-12 text-center tabular-nums">{questionCount}</span>
//                   <button
//                     onClick={() => handleQuestionCountChange(Math.min(MAX_QUESTIONS, questionCount + 1))}
//                     className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg border transition-all flex items-center justify-center text-base sm:text-lg font-bold ${
//                       questionCount >= FREE_LIMIT && !isPro
//                         ? "bg-violet-500/10 border-violet-500/30 text-violet-400 hover:bg-violet-500/20"
//                         : "bg-white/[0.05] border-white/[0.08] text-zinc-300 hover:bg-white/[0.10]"
//                     }`}
//                   >
//                     {questionCount >= FREE_LIMIT && !isPro ? "⚡" : "+"}
//                   </button>
//                 </div>
//               </div>

//               {/* Difficulty - Responsive Grid */}
//               <div>
//                 <label className="block text-[10px] sm:text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2 sm:mb-3">Difficulty Level</label>
//                 <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 sm:gap-3">
//                   {DIFFICULTY_CONFIG.map((d) => (
//                     <button
//                       key={d.key}
//                       onClick={() => setDifficulty(d.key)}
//                       className={`relative p-3 sm:p-4 rounded-xl border text-left transition-all ${
//                         difficulty === d.key
//                           ? d.key === "basic" ? "border-emerald-500/50 bg-emerald-500/10"
//                             : d.key === "intermediate" ? "border-amber-500/50 bg-amber-500/10"
//                             : "border-rose-500/50 bg-rose-500/10"
//                           : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
//                       }`}
//                     >
//                       <div className={`text-sm font-bold mb-0.5 sm:mb-1 ${
//                         difficulty === d.key
//                           ? d.key === "basic" ? "text-emerald-400"
//                             : d.key === "intermediate" ? "text-amber-400"
//                             : "text-rose-400"
//                           : "text-white"
//                       }`}>
//                         {d.label}
//                       </div>
//                       <div className="text-[10px] sm:text-xs text-zinc-500 leading-tight">{d.desc}</div>
//                       <div className={`text-[10px] sm:text-xs mt-1.5 sm:mt-2 font-mono font-bold ${
//                         difficulty === d.key
//                           ? d.key === "basic" ? "text-emerald-500"
//                             : d.key === "intermediate" ? "text-amber-500"
//                             : "text-rose-500"
//                           : "text-zinc-600"
//                       }`}>
//                         {d.points}
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Info bar - Responsive */}
//               <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-zinc-600 bg-white/[0.02] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 border border-white/[0.04]">
//                 <span className="flex items-center gap-1">📝 {questionCount} questions</span>
//                 <span className="hidden xs:inline w-px h-3 bg-zinc-700" />
//                 <span className="flex items-center gap-1">🎯 MCQ + MSQ mix</span>
//                 <span className="hidden xs:inline w-px h-3 bg-zinc-700" />
//                 <span className="flex items-center gap-1">🏆 {totalPoints} pts total</span>
//                 {!isPro && questionCount > FREE_LIMIT && (
//                   <>
//                     <span className="hidden xs:inline w-px h-3 bg-zinc-700" />
//                     <span className="text-violet-400">⚡ Pro required</span>
//                   </>
//                 )}
//               </div>

//               {/* Error - Responsive */}
//               {error && (
//                 <div className="flex items-start gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs sm:text-sm">
//                   <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
//                   </svg>
//                   <span>{error}</span>
//                 </div>
//               )}

//               {/* CTA Button - Responsive */}
//               <button
//                 onClick={handleSubmit}
//                 disabled={loading || (!isPro && questionCount > FREE_LIMIT)}
//                 className="w-full py-3 sm:py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm sm:text-base tracking-wide transition-all disabled:opacity-60 disabled:cursor-not-allowed group"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <svg className="animate-spin w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
//                     </svg>
//                     <span className="text-xs sm:text-sm">{progress}</span>
//                   </span>
//                 ) : (
//                   <span className="flex items-center justify-center gap-2 text-xs sm:text-sm">
//                     {!isPro && questionCount > FREE_LIMIT ? "Upgrade to Generate" : `Generate ${questionCount} Question Quiz`}
//                     <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                       <path d="M5 12h14M12 5l7 7-7 7"/>
//                     </svg>
//                   </span>
//                 )}
//               </button>
//             </div>

//             {/* Features - Responsive Grid */}
//             <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 sm:mt-8">
//               {[
//                 { icon: "🔗", title: "Any Link", desc: "YouTube, Wikipedia, articles" },
//                 { icon: "📄", title: "PDF Upload", desc: "Notes, textbooks, docs" },
//                 { icon: "🏆", title: "Scored Results", desc: "Points, grades & explanations" },
//               ].map((f) => (
//                 <div key={f.title} className="text-center">
//                   <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{f.icon}</div>
//                   <div className="text-[10px] sm:text-xs font-semibold text-zinc-300 truncate">{f.title}</div>
//                   <div className="hidden xs:block text-[9px] sm:text-xs text-zinc-600 mt-0.5 sm:mt-1">{f.desc}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }































// "use client";
// import { useState, useRef, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Difficulty } from "@/types";

// const EXAMPLE_LINKS = [
//   { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Artificial_intelligence", icon: "📖" },
//   { label: "YouTube", url: "https://www.youtube.com/watch?v=aircAruvnKk", icon: "▶️" },
//   { label: "Black Hole", url: "https://en.wikipedia.org/wiki/Black_hole", icon: "🌑" },
// ];

// const DIFFICULTY_CONFIG: {
//   key: Difficulty;
//   label: string;
//   desc: string;
//   points: string;
// }[] = [
//   { key: "basic", label: "Basic", desc: "Recall & definitions", points: "5 pts/q" },
//   { key: "intermediate", label: "Intermediate", desc: "Apply & connect", points: "10 pts/q" },
//   { key: "advanced", label: "Advanced", desc: "Analyze & synthesize", points: "15 pts/q" },
// ];

// const FREE_LIMIT = 5;
// const MAX_QUESTIONS = 70;
// const PRO_PRICE = 15;

// function UpgradeModal({ onClose, onSubscribe }: { onClose: () => void; onSubscribe: () => void }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
//       <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
//       <div className="relative w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl border border-violet-500/30 bg-[#0e0e1a] p-6 sm:p-8 shadow-2xl shadow-violet-900/30">
//         <div className="w-10 h-1 rounded-full bg-white/10 mx-auto mb-6 sm:hidden" />
//         <div className="absolute -top-px left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent hidden sm:block" />

//         <div className="flex flex-col items-center text-center gap-4">
//           <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-2xl sm:text-3xl shadow-lg shadow-violet-900/50">
//             ⚡
//           </div>
//           <div>
//             <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">Unlock Pro Features</h2>
//             <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
//               Get unlimited quizzes, PDF uploads, and advanced AI processing
//             </p>
//           </div>

//           <div className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 space-y-2 text-sm text-left">
//             {[
//               ["✅", "Up to 20 questions per quiz"],
//               ["✅", "PDF + URL support"],
//               ["✅", "All difficulty levels"],
//               ["✅", "Priority AI processing"],
//               ["✅", "Export quizzes as PDF"],
//               ["✅", "Detailed analytics"],
//             ].map(([icon, text]) => (
//               <div key={text} className="flex items-center gap-3 text-zinc-300">
//                 <span>{icon}</span>
//                 <span>{text}</span>
//               </div>
//             ))}
//           </div>

//           <div className="text-center">
//             <div className="text-3xl font-bold text-white">${PRO_PRICE}</div>
//             <div className="text-xs text-zinc-500">per month</div>
//           </div>

//           <button
//             onClick={onSubscribe}
//             className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-violet-900/40"
//           >
//             Subscribe Now →
//           </button>
//           <button onClick={onClose} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors pb-1">
//             Maybe later
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function HomePage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [tab, setTab] = useState<"url" | "pdf">("url");
//   const [url, setUrl] = useState("");
//   const [pdfFile, setPdfFile] = useState<File | null>(null);
//   const [pdfDrag, setPdfDrag] = useState(false);
//   const [difficulty, setDifficulty] = useState<Difficulty>("intermediate");
//   const [questionCount, setQuestionCount] = useState(4);
//   const [showUpgrade, setShowUpgrade] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [progress, setProgress] = useState("");
//   const [isPro, setIsPro] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const fileRef = useRef<HTMLInputElement>(null);

//   const checkSubscriptionStatus = async () => {
//     try {
//       const res = await fetch("/api/subscription/status");
//       const data = await res.json();
//       setIsPro(data.isPro);
//       if (data.isPro) localStorage.setItem("isPro", "true");
//     } catch {
//       setIsPro(localStorage.getItem("isPro") === "true");
//     }
//   };

//   useEffect(() => {
//     const success = searchParams.get("success");
//     const canceled = searchParams.get("canceled");
//     if (success === "true") {
//       setShowSuccess(true);
//       checkSubscriptionStatus();
//       window.history.replaceState({}, "", window.location.pathname);
//       setTimeout(() => setShowSuccess(false), 5000);
//     }
//     if (canceled === "true") {
//       setError("Payment was cancelled.");
//       window.history.replaceState({}, "", window.location.pathname);
//       setTimeout(() => setError(""), 4000);
//     }
//   }, [searchParams]);

//   useEffect(() => { checkSubscriptionStatus(); }, []);

//   const handleSubscribe = async () => {
//     try {
//       const response = await fetch("/api/create-checkout", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           priceId: "price_pro_monthly",
//           successUrl: `${window.location.origin}/?success=true`,
//           cancelUrl: `${window.location.origin}/?canceled=true`,
//         }),
//       });
//       const { url: checkoutUrl } = await response.json();
//       window.location.href = checkoutUrl;
//     } catch {
//       setError("Failed to initiate checkout. Please try again.");
//     }
//   };

//   const handleFileChange = (file: File | null) => {
//     if (!file) return;
//     if (file.type !== "application/pdf") { setError("Only PDF files are supported."); return; }
//     if (file.size > 10 * 1024 * 1024) { setError("PDF must be under 10MB."); return; }
//     setError("");
//     setPdfFile(file);
//   };

//   const handleQuestionCountChange = (val: number) => {
//     if (!isPro && val > FREE_LIMIT) { setShowUpgrade(true); return; }
//     setQuestionCount(Math.min(MAX_QUESTIONS, Math.max(1, val)));
//   };

//   const handleSubmit = async () => {
//     if (tab === "url" && !url.trim()) { setError("Please enter a valid URL"); return; }
//     if (tab === "pdf" && !pdfFile) { setError("Please upload a PDF file"); return; }
//     if (!isPro && questionCount > FREE_LIMIT) { setShowUpgrade(true); return; }

//     setError("");
//     setLoading(true);
//     setProgress("Fetching content...");

//     try {
//       setTimeout(() => setProgress("Analyzing with AI..."), 1500);
//       setTimeout(() => setProgress("Crafting questions..."), 3500);

//       let res: Response;
//       if (tab === "pdf" && pdfFile) {
//         const formData = new FormData();
//         formData.append("pdf", pdfFile);
//         formData.append("difficulty", difficulty);
//         formData.append("questionCount", String(questionCount));
//         res = await fetch("/api/analyze", { method: "POST", body: formData });
//       } else {
//         res = await fetch("/api/analyze", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ url: url.trim(), difficulty, questionCount }),
//         });
//       }

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to generate quiz");
//       sessionStorage.setItem("quizSession", JSON.stringify(data.session));
//       router.push("/quiz");
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//       setLoading(false);
//     }
//   };

//   const totalPoints = { basic: 5, intermediate: 10, advanced: 15 }[difficulty] * questionCount;

//   return (
//     <>
//       {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} onSubscribe={handleSubscribe} />}

//       {/* Success Toast */}
//       {showSuccess && (
//         <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90vw] sm:w-auto">
//           <div className="bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded-xl px-4 sm:px-6 py-3 flex items-center gap-3 shadow-xl">
//             <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5">
//                 <polyline points="20 6 9 17 4 12"/>
//               </svg>
//             </div>
//             <div>
//               <p className="font-semibold text-emerald-400 text-sm">Payment Successful!</p>
//               <p className="text-xs text-emerald-300/80">You are now a Pro member!</p>
//             </div>
//           </div>
//         </div>
//       )}

//       <main className="min-h-screen bg-[#080810] text-white overflow-x-hidden relative">
//         {/* Background */}
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />
//         <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_60%,#080810_100%)]" />
//         <div className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg5OSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]" />

//         <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-20">

//           {/* Header */}
//           <div className="text-center mb-8 sm:mb-12 lg:mb-16">
//             <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs sm:text-sm font-medium mb-5 sm:mb-8 tracking-wide">
//               <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse shrink-0" />
//               {isPro ? "⚡ PRO PLAN ACTIVE" : "AI-POWERED QUIZ ENGINE"}
//             </div>

//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-none mb-3 sm:mb-4">
//               <span className="text-white">Learn</span>
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400"> Deeper</span>
//             </h1>

//             <p className="text-zinc-400 text-sm sm:text-base lg:text-lg leading-relaxed px-2">
//               Paste any link or upload a PDF.{" "}
//               <span className="hidden sm:inline"><br /></span>
//               We generate a quiz that tests your understanding.
//             </p>

//             {!isPro && (
//               <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-400 text-xs">
//                 <span>⚡</span>
//                 <span>Free: {FREE_LIMIT} questions · Pro: ${PRO_PRICE}/mo</span>
//               </div>
//             )}
//           </div>

//           {/* Main Card */}
//           <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 lg:space-y-7">

//             {/* Tab Switcher */}
//             <div className="flex gap-1 p-1 bg-white/[0.04] rounded-xl border border-white/[0.06]">
//               {[
//                 {
//                   key: "url", label: "URL / Link",
//                   icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
//                 },
//                 {
//                   key: "pdf", label: "PDF Upload",
//                   icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
//                 },
//               ].map((t) => (
//                 <button
//                   key={t.key}
//                   onClick={() => { setTab(t.key as "url" | "pdf"); setError(""); }}
//                   className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
//                     tab === t.key ? "bg-indigo-600 text-white" : "text-zinc-500 hover:text-zinc-300"
//                   }`}
//                 >
//                   {t.icon}
//                   <span>{t.label}</span>
//                 </button>
//               ))}
//             </div>

//             {/* URL Input */}
//             {tab === "url" && (
//               <div>
//                 <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2 sm:mb-3">
//                   Source URL
//                 </label>
//                 <div className="relative">
//                   <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-zinc-500">
//                     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
//                       <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
//                     </svg>
//                   </span>
//                   <input
//                     type="url"
//                     value={url}
//                     onChange={(e) => { setUrl(e.target.value); setError(""); }}
//                     onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//                     placeholder="https://en.wikipedia.org/wiki/..."
//                     className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-9 sm:pl-11 pr-4 py-3 sm:py-3.5 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
//                   />
//                 </div>
//                 <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
//                   {EXAMPLE_LINKS.map((ex) => (
//                     <button
//                       key={ex.url}
//                       onClick={() => setUrl(ex.url)}
//                       className="text-xs px-2.5 sm:px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-zinc-500 hover:text-zinc-300 hover:border-white/[0.12] transition-all"
//                     >
//                       {ex.icon} {ex.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* PDF Upload */}
//             {tab === "pdf" && (
//               <div>
//                 <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2 sm:mb-3">
//                   Upload PDF
//                 </label>
//                 <div
//                   onClick={() => fileRef.current?.click()}
//                   onDragOver={(e) => { e.preventDefault(); setPdfDrag(true); }}
//                   onDragLeave={() => setPdfDrag(false)}
//                   onDrop={(e) => { e.preventDefault(); setPdfDrag(false); handleFileChange(e.dataTransfer.files[0] ?? null); }}
//                   className={`flex flex-col items-center justify-center gap-3 p-6 sm:p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
//                     pdfDrag ? "border-indigo-500/70 bg-indigo-500/10"
//                     : pdfFile ? "border-emerald-500/50 bg-emerald-500/[0.05]"
//                     : "border-white/[0.10] hover:border-white/[0.20] bg-white/[0.02]"
//                   }`}
//                 >
//                   <input ref={fileRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)} />
//                   {pdfFile ? (
//                     <>
//                       <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
//                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-sm font-semibold text-emerald-400 truncate max-w-[200px] sm:max-w-xs">{pdfFile.name}</p>
//                         <p className="text-xs text-zinc-500 mt-1">{(pdfFile.size / 1024).toFixed(1)} KB · tap to change</p>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/[0.05] flex items-center justify-center">
//                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
//                           <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                           <polyline points="14 2 14 8 20 8"/>
//                           <line x1="12" y1="18" x2="12" y2="12"/>
//                           <line x1="9" y1="15" x2="15" y2="15"/>
//                         </svg>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-sm font-semibold text-zinc-300">Drop your PDF here</p>
//                         <p className="text-xs text-zinc-600 mt-1">or tap to browse · max 10MB</p>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Question Count */}
//             <div>
//               <div className="flex items-center justify-between mb-2 sm:mb-3">
//                 <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
//                   Questions
//                 </label>
//                 <div className="flex items-center gap-1.5 sm:gap-2">
//                   <span className="text-xs font-mono font-bold text-indigo-400">{questionCount}q</span>
//                   <span className="text-xs text-zinc-600">·</span>
//                   <span className="text-xs font-mono font-bold text-zinc-500">{totalPoints}pts</span>
//                 </div>
//               </div>

//               {/* Grid bar */}
//               <div className="flex gap-1">
//                 {Array.from({ length: MAX_QUESTIONS }, (_, i) => i + 1).map((n) => {
//                   const isSelected = n <= questionCount;
//                   const isAvailable = isPro || n <= FREE_LIMIT;
//                   return (
//                     <button
//                       key={n}
//                       onClick={() => isAvailable ? handleQuestionCountChange(n) : setShowUpgrade(true)}
//                       className={`relative flex-1 h-6 sm:h-8 rounded transition-all ${
//                         isSelected && isAvailable ? "bg-indigo-500"
//                         : isSelected && !isAvailable ? "bg-violet-600"
//                         : isAvailable ? "bg-white/[0.07] hover:bg-white/[0.14]"
//                         : "bg-white/[0.04] hover:bg-violet-500/20"
//                       }`}
//                     />
//                   );
//                 })}
//               </div>

//               <div className="flex items-center justify-between mt-2">
//                 <div className="flex items-center gap-1.5">
//                   <span className="w-2 h-2 rounded-sm bg-indigo-500" />
//                   <span className="text-[10px] text-zinc-500">Free (1–{FREE_LIMIT})</span>
//                 </div>
//                 <div className="flex items-center gap-1.5">
//                   <span className="w-2 h-2 rounded-sm bg-violet-600" />
//                   <span className="text-[10px] text-zinc-500">Pro (6–{MAX_QUESTIONS})</span>
//                   {!isPro && (
//                     <button
//                       onClick={() => setShowUpgrade(true)}
//                       className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-400 font-semibold border border-violet-500/30 hover:bg-violet-500/30 transition-all"
//                     >
//                       ⚡ Upgrade
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* +/- controls */}
//               <div className="flex items-center justify-center gap-4 mt-3 sm:mt-4">
//                 <button
//                   onClick={() => handleQuestionCountChange(questionCount - 1)}
//                   className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] text-zinc-300 hover:bg-white/[0.10] transition-all flex items-center justify-center text-xl font-bold"
//                 >
//                   −
//                 </button>
//                 <span className="text-2xl sm:text-3xl font-black text-white w-12 text-center tabular-nums">{questionCount}</span>
//                 <button
//                   onClick={() => handleQuestionCountChange(questionCount + 1)}
//                   className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border transition-all flex items-center justify-center text-xl font-bold ${
//                     questionCount >= FREE_LIMIT && !isPro
//                       ? "bg-violet-500/10 border-violet-500/30 text-violet-400 hover:bg-violet-500/20"
//                       : "bg-white/[0.05] border-white/[0.08] text-zinc-300 hover:bg-white/[0.10]"
//                   }`}
//                 >
//                   {questionCount >= FREE_LIMIT && !isPro ? "⚡" : "+"}
//                 </button>
//               </div>
//             </div>

//             {/* Difficulty */}
//             <div>
//               <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2 sm:mb-3">
//                 Difficulty Level
//               </label>
//               <div className="grid grid-cols-3 gap-2 sm:gap-3">
//                 {DIFFICULTY_CONFIG.map((d) => (
//                   <button
//                     key={d.key}
//                     onClick={() => setDifficulty(d.key)}
//                     className={`p-3 sm:p-4 rounded-xl border text-left transition-all ${
//                       difficulty === d.key
//                         ? d.key === "basic" ? "border-emerald-500/50 bg-emerald-500/10"
//                           : d.key === "intermediate" ? "border-amber-500/50 bg-amber-500/10"
//                           : "border-rose-500/50 bg-rose-500/10"
//                         : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
//                     }`}
//                   >
//                     <div className={`text-xs sm:text-sm font-bold mb-0.5 sm:mb-1 ${
//                       difficulty === d.key
//                         ? d.key === "basic" ? "text-emerald-400"
//                           : d.key === "intermediate" ? "text-amber-400"
//                           : "text-rose-400"
//                         : "text-white"
//                     }`}>
//                       {d.label}
//                     </div>
//                     <div className="text-[10px] sm:text-xs text-zinc-500 leading-tight hidden sm:block">{d.desc}</div>
//                     <div className={`text-[10px] sm:text-xs mt-1 sm:mt-2 font-mono font-bold ${
//                       difficulty === d.key
//                         ? d.key === "basic" ? "text-emerald-500"
//                           : d.key === "intermediate" ? "text-amber-500"
//                           : "text-rose-500"
//                         : "text-zinc-600"
//                     }`}>
//                       {d.points}
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Info bar */}
//             <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-600 bg-white/[0.02] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 border border-white/[0.04]">
//               <span>📝 {questionCount} questions</span>
//               <span className="w-px h-3 bg-zinc-700 hidden sm:block" />
//               <span>🎯 MCQ + MSQ</span>
//               <span className="w-px h-3 bg-zinc-700 hidden sm:block" />
//               <span>🏆 {totalPoints} pts</span>
//               {!isPro && questionCount > FREE_LIMIT && (
//                 <span className="text-violet-400">⚡ Pro required</span>
//               )}
//             </div>

//             {/* Error */}
//             {error && (
//               <div className="flex items-start gap-3 px-3 sm:px-4 py-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs sm:text-sm">
//                 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
//                   <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
//                 </svg>
//                 {error}
//               </div>
//             )}

//             {/* CTA Button */}
//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="w-full py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm sm:text-base tracking-wide transition-all disabled:opacity-60 disabled:cursor-not-allowed group"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-2 sm:gap-3">
//                   <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
//                   </svg>
//                   {progress}
//                 </span>
//               ) : (
//                 <span className="flex items-center justify-center gap-2">
//                   {!isPro && questionCount > FREE_LIMIT
//                     ? "⚡ Upgrade to Generate"
//                     : `Generate ${questionCount} Question Quiz`}
//                   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
//                     <path d="M5 12h14M12 5l7 7-7 7"/>
//                   </svg>
//                 </span>
//               )}
//             </button>
//           </div>

//           {/* Features */}
//           <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 sm:mt-8">
//             {[
//               { icon: "🔗", title: "Any Link", desc: "YouTube, Wikipedia, articles" },
//               { icon: "📄", title: "PDF Upload", desc: "Notes, textbooks, docs" },
//               { icon: "🏆", title: "Results", desc: "Points, grades & explanations" },
//             ].map((f) => (
//               <div key={f.title} className="text-center px-1">
//                 <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{f.icon}</div>
//                 <div className="text-xs font-semibold text-zinc-300">{f.title}</div>
//                 <div className="text-[10px] sm:text-xs text-zinc-600 mt-0.5 hidden sm:block">{f.desc}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }















// "use client";
// import { useState, useRef, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useSession, signIn } from "next-auth/react";
// import { Difficulty } from "@/types";
// import { useTokens } from "@/hooks/useTokens";

// const EXAMPLE_LINKS = [
//   { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Artificial_intelligence", icon: "📖" },
//   { label: "YouTube", url: "https://www.youtube.com/watch?v=aircAruvnKk", icon: "▶️" },
//   { label: "Black Hole", url: "https://en.wikipedia.org/wiki/Black_hole", icon: "🌑" },
// ];

// const DIFFICULTY_CONFIG: {
//   key: Difficulty;
//   label: string;
//   desc: string;
//   points: string;
// }[] = [
//   { key: "basic", label: "Basic", desc: "Recall & definitions", points: "5 pts/q" },
//   { key: "intermediate", label: "Intermediate", desc: "Apply & connect", points: "10 pts/q" },
//   { key: "advanced", label: "Advanced", desc: "Analyze & synthesize", points: "15 pts/q" },
// ];

// // ── Token economy constants ──────────────────────────────────────────────────
// const FREE_LIMIT = 5;           // max questions per quiz for free (logged-out) users
// const MAX_QUESTIONS = 70;       // max for token users / pro
// const PAGE_SIZE = 35;           // bars shown per page in the grid
// const PRO_PRICE = 15;
// const QUIZ_TOKEN_COST = 11;     // tokens deducted per quiz generation
// const SIGNUP_TOKENS = 120;      // tokens awarded on first sign-in
// const PRO_TOKENS = 500;         // tokens awarded on Pro purchase
// const PERFECT_BONUS = 10;       // bonus tokens for 100% correct answers
// const COMPLETE_BONUS = 10;      // bonus tokens for answering ALL selected questions
// // ─────────────────────────────────────────────────────────────────────────────

// type UpgradeReason = "no_tokens" | "pro_limit" | "login_required";

// function TokenBadge({ tokens, cost }: { tokens: number; cost: number }) {
//   const low = tokens < cost * 2;
//   const empty = tokens < cost;
//   return (
//     <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${
//       empty
//         ? "border-rose-500/30 bg-rose-500/10 text-rose-300"
//         : low
//         ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
//         : "border-amber-500/20 bg-amber-500/[0.08] text-amber-300"
//     }`}>
//       <span>🪙</span>
//       <span className="font-mono tabular-nums">{tokens}</span>
//       <span className="text-[10px] opacity-60">tokens</span>
//       {empty && <span className="text-rose-400 text-[10px]">· not enough</span>}
//       {!empty && low && <span className="text-amber-500/70 text-[10px]">· low</span>}
//     </div>
//   );
// }

// function UpgradeModal({
//   onClose,
//   onSubscribe,
//   onSignIn,
//   reason,
//   tokens,
// }: {
//   onClose: () => void;
//   onSubscribe: () => void;
//   onSignIn: () => void;
//   reason: UpgradeReason;
//   tokens: number;
// }) {
//   const isLoginRequired = reason === "login_required";
//   const isNoTokens = reason === "no_tokens";

//   return (
//     <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
//       <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
//       <div className="relative w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl border border-violet-500/30 bg-[#0e0e1a] p-6 sm:p-8 shadow-2xl shadow-violet-900/30">
//         <div className="w-10 h-1 rounded-full bg-white/10 mx-auto mb-6 sm:hidden" />
//         <div className="absolute -top-px left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent hidden sm:block" />

//         <div className="flex flex-col items-center text-center gap-4">
//           <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg ${
//             isLoginRequired
//               ? "bg-gradient-to-br from-indigo-600 to-blue-600 shadow-indigo-900/50"
//               : isNoTokens
//               ? "bg-gradient-to-br from-rose-600 to-orange-600 shadow-rose-900/50"
//               : "bg-gradient-to-br from-violet-600 to-indigo-600 shadow-violet-900/50"
//           }`}>
//             {isLoginRequired ? "🔐" : isNoTokens ? "🪙" : "⚡"}
//           </div>

//           <div>
//             <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
//               {isLoginRequired
//                 ? "Sign in to Continue"
//                 : isNoTokens
//                 ? "Not Enough Tokens"
//                 : "Unlock Pro Features"}
//             </h2>
//             <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
//               {isLoginRequired
//                 ? `Create a free account and get 🪙 ${SIGNUP_TOKENS} tokens instantly. Each quiz costs only ${QUIZ_TOKEN_COST} tokens.`
//                 : isNoTokens
//                 ? `You have 🪙 ${tokens} tokens but need ${QUIZ_TOKEN_COST}. Upgrade to Pro for 🪙 ${PRO_TOKENS} tokens instantly.`
//                 : `Get ${PRO_TOKENS} tokens, up to ${MAX_QUESTIONS} questions per quiz, and advanced AI processing.`}
//             </p>
//           </div>

//           {/* Features list */}
//           <div className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 space-y-2 text-sm text-left">
//             {isLoginRequired ? [
//               ["🪙", `${SIGNUP_TOKENS} free tokens on signup`],
//               ["📝", `Up to ${FREE_LIMIT} questions per quiz`],
//               ["🔗", "URL & PDF support"],
//               ["🏆", `Win +${PERFECT_BONUS} bonus tokens for perfect score`],
//               ["✅", `+${COMPLETE_BONUS} tokens for answering all questions`],
//             ] : [
//               ["⚡", `${PRO_TOKENS} tokens on upgrade`],
//               ["📝", `Up to ${MAX_QUESTIONS} questions per quiz`],
//               ["🏆", `Win +${PERFECT_BONUS} bonus tokens for perfect score`],
//               ["✅", `+${COMPLETE_BONUS} tokens for answering all questions`],
//               ["📄", "PDF + URL support"],
//               ["🚀", "Priority AI processing"],
//               ["📊", "Export & analytics"],
//             ].map(([icon, text]) => (
//               <div key={String(text)} className="flex items-center gap-3 text-zinc-300">
//                 <span>{icon}</span>
//                 <span>{text}</span>
//               </div>
//             ))}
//           </div>

//           {isLoginRequired ? (
//             <>
//               <button
//                 onClick={onSignIn}
//                 className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-indigo-900/40"
//               >
//                 Sign in with Google — Free →
//               </button>
//               <button onClick={onClose} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors pb-1">
//                 Maybe later
//               </button>
//             </>
//           ) : (
//             <>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-white">${PRO_PRICE}</div>
//                 <div className="text-xs text-zinc-500">per month · includes 🪙 {PRO_TOKENS} tokens</div>
//               </div>
//               <button
//                 onClick={onSubscribe}
//                 className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-violet-900/40"
//               >
//                 Upgrade to Pro →
//               </button>
//               <button onClick={onClose} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors pb-1">
//                 Maybe later
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function HomePage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const { data: session } = useSession();
//   const { tokens, deductTokens, addTokens, refetch: refetchTokens } = useTokens();

//   const [tab, setTab] = useState<"url" | "pdf">("url");
//   const [url, setUrl] = useState("");
//   const [pdfFile, setPdfFile] = useState<File | null>(null);
//   const [pdfDrag, setPdfDrag] = useState(false);
//   const [difficulty, setDifficulty] = useState<Difficulty>("intermediate");
//   const [questionCount, setQuestionCount] = useState(4);
//   const [currentPage, setCurrentPage] = useState(0); // 0 = slots 1–35, 1 = slots 36–70
//   const [showUpgrade, setShowUpgrade] = useState(false);
//   const [upgradeReason, setUpgradeReason] = useState<UpgradeReason>("login_required");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [progress, setProgress] = useState("");
//   const [isPro, setIsPro] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   const fileRef = useRef<HTMLInputElement>(null);

//   const isLoggedIn = !!session;
//   const effectiveMax = isLoggedIn ? MAX_QUESTIONS : FREE_LIMIT;

//   const checkSubscriptionStatus = async () => {
//     try {
//       const res = await fetch("/api/subscription/status");
//       const data = await res.json();
//       setIsPro(data.isPro);
//       if (data.isPro) localStorage.setItem("isPro", "true");
//     } catch {
//       setIsPro(localStorage.getItem("isPro") === "true");
//     }
//   };

//   useEffect(() => {
//     const success = searchParams.get("success");
//     const canceled = searchParams.get("canceled");
//     if (success === "true") {
//       setShowSuccess(true);
//       checkSubscriptionStatus();
//       // Award Pro tokens
//       addTokens(PRO_TOKENS);
//       window.history.replaceState({}, "", window.location.pathname);
//       setTimeout(() => setShowSuccess(false), 5000);
//     }
//     if (canceled === "true") {
//       setError("Payment was cancelled.");
//       window.history.replaceState({}, "", window.location.pathname);
//       setTimeout(() => setError(""), 4000);
//     }
//   }, [searchParams]);

//   useEffect(() => { checkSubscriptionStatus(); }, []);

//   const handleSubscribe = async () => {
//     try {
//       const response = await fetch("/api/create-checkout", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           priceId: "price_pro_monthly",
//           successUrl: `${window.location.origin}/?success=true`,
//           cancelUrl: `${window.location.origin}/?canceled=true`,
//         }),
//       });
//       const { url: checkoutUrl } = await response.json();
//       window.location.href = checkoutUrl;
//     } catch {
//       setError("Failed to initiate checkout. Please try again.");
//     }
//   };

//   const handleFileChange = (file: File | null) => {
//     if (!file) return;
//     if (file.type !== "application/pdf") { setError("Only PDF files are supported."); return; }
//     if (file.size > 10 * 1024 * 1024) { setError("PDF must be under 10MB."); return; }
//     setError("");
//     setPdfFile(file);
//   };

//   const openUpgrade = (reason: UpgradeReason) => {
//     setUpgradeReason(reason);
//     setShowUpgrade(true);
//   };

//   const handleQuestionCountChange = (val: number) => {
//     if (!isLoggedIn && val > FREE_LIMIT) { openUpgrade("login_required"); return; }
//     const clamped = Math.min(effectiveMax, Math.max(1, val));
//     setQuestionCount(clamped);
//     setCurrentPage(clamped > PAGE_SIZE ? 1 : 0);
//   };

//   const handleSubmit = async () => {
//     if (tab === "url" && !url.trim()) { setError("Please enter a valid URL"); return; }
//     if (tab === "pdf" && !pdfFile) { setError("Please upload a PDF file"); return; }

//     // Gate: must be logged in
//     if (!isLoggedIn) { openUpgrade("login_required"); return; }

//     // Gate: must have enough tokens
//     if ((tokens ?? 0) < QUIZ_TOKEN_COST) { openUpgrade("no_tokens"); return; }

//     setError("");
//     setLoading(true);
//     setProgress("Fetching content...");

//     try {
//       setTimeout(() => setProgress("Analyzing with AI..."), 1500);
//       setTimeout(() => setProgress("Crafting questions..."), 3500);

//       let res: Response;
//       if (tab === "pdf" && pdfFile) {
//         const formData = new FormData();
//         formData.append("pdf", pdfFile);
//         formData.append("difficulty", difficulty);
//         formData.append("questionCount", String(questionCount));
//         res = await fetch("/api/analyze", { method: "POST", body: formData });
//       } else {
//         res = await fetch("/api/analyze", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ url: url.trim(), difficulty, questionCount }),
//         });
//       }

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to generate quiz");

//       // Deduct tokens after successful generation
//       await deductTokens(QUIZ_TOKEN_COST);
//       await refetchTokens();

//       sessionStorage.setItem("quizSession", JSON.stringify(data.session));
//       // Pass token reward info so quiz page can award bonuses on completion
//       sessionStorage.setItem("tokenRewards", JSON.stringify({
//         perfectBonus: PERFECT_BONUS,
//         completeBonus: COMPLETE_BONUS,
//         totalQuestions: questionCount,
//       }));

//       router.push("/quiz");
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//       setLoading(false);
//     }
//   };

//   const totalPoints = { basic: 5, intermediate: 10, advanced: 15 }[difficulty] * questionCount;
//   const hasEnoughTokens = isLoggedIn && (tokens ?? 0) >= QUIZ_TOKEN_COST;

//   // Paginated bars
//   const pageStart = currentPage * PAGE_SIZE + 1;
//   const pageEnd = Math.min(pageStart + PAGE_SIZE - 1, MAX_QUESTIONS);
//   const visibleBars = Array.from({ length: pageEnd - pageStart + 1 }, (_, i) => pageStart + i);

//   return (
//     <>
//       {showUpgrade && (
//         <UpgradeModal
//           reason={upgradeReason}
//           tokens={tokens ?? 0}
//           onClose={() => setShowUpgrade(false)}
//           onSubscribe={handleSubscribe}
//           onSignIn={() => signIn("google")}
//         />
//       )}

//       {/* Success Toast */}
//       {showSuccess && (
//         <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90vw] sm:w-auto">
//           <div className="bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded-xl px-4 sm:px-6 py-3 flex items-center gap-3 shadow-xl">
//             <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5">
//                 <polyline points="20 6 9 17 4 12" />
//               </svg>
//             </div>
//             <div>
//               <p className="font-semibold text-emerald-400 text-sm">Payment Successful!</p>
//               <p className="text-xs text-emerald-300/80">🪙 {PRO_TOKENS} tokens added to your account!</p>
//             </div>
//           </div>
//         </div>
//       )}

//       <main className="min-h-screen bg-[#080810] text-white overflow-x-hidden relative">
//         {/* Background */}
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />
//         <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_60%,#080810_100%)]" />
//         <div className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg5OSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]" />

//         <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-20">

//           {/* Header */}
//           <div className="text-center mb-8 sm:mb-12 lg:mb-16">
//             <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs sm:text-sm font-medium mb-5 sm:mb-8 tracking-wide">
//               <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse shrink-0" />
//               {isPro ? "⚡ PRO PLAN ACTIVE" : isLoggedIn ? "AI-POWERED QUIZ ENGINE" : "AI-POWERED QUIZ ENGINE"}
//             </div>

//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-none mb-3 sm:mb-4">
//               <span className="text-white">Learn</span>
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400"> Deeper</span>
//             </h1>

//             <p className="text-zinc-400 text-sm sm:text-base lg:text-lg leading-relaxed px-2">
//               Paste any link or upload a PDF.{" "}
//               <span className="hidden sm:inline"><br /></span>
//               We generate a quiz that tests your understanding.
//             </p>

//             {/* Token/status badge */}
//             <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
//               {isLoggedIn ? (
//                 <TokenBadge tokens={tokens ?? 0} cost={QUIZ_TOKEN_COST} />
//               ) : (
//                 <button
//                   onClick={() => openUpgrade("login_required")}
//                   className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold hover:bg-indigo-500/25 transition-all"
//                 >
//                   <span>🪙</span>
//                   <span>Sign in to get {SIGNUP_TOKENS} free tokens</span>
//                 </button>
//               )}
//               {isPro && (
//                 <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-semibold">
//                   ⚡ Pro · up to {MAX_QUESTIONS}q
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Main Card */}
//           <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 lg:space-y-7">

//             {/* Tab Switcher */}
//             <div className="flex gap-1 p-1 bg-white/[0.04] rounded-xl border border-white/[0.06]">
//               {[
//                 {
//                   key: "url", label: "URL / Link",
//                   icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
//                 },
//                 {
//                   key: "pdf", label: "PDF Upload",
//                   icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
//                 },
//               ].map((t) => (
//                 <button
//                   key={t.key}
//                   onClick={() => { setTab(t.key as "url" | "pdf"); setError(""); }}
//                   className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${tab === t.key ? "bg-indigo-600 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
//                 >
//                   {t.icon}
//                   <span>{t.label}</span>
//                 </button>
//               ))}
//             </div>

//             {/* URL Input */}
//             {tab === "url" && (
//               <div>
//                 <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2 sm:mb-3">
//                   Source URL
//                 </label>
//                 <div className="relative">
//                   <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-zinc-500">
//                     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
//                       <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
//                     </svg>
//                   </span>
//                   <input
//                     type="url"
//                     value={url}
//                     onChange={(e) => { setUrl(e.target.value); setError(""); }}
//                     onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//                     placeholder="https://en.wikipedia.org/wiki/..."
//                     className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-9 sm:pl-11 pr-4 py-3 sm:py-3.5 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
//                   />
//                 </div>
//                 <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
//                   {EXAMPLE_LINKS.map((ex) => (
//                     <button
//                       key={ex.url}
//                       onClick={() => setUrl(ex.url)}
//                       className="text-xs px-2.5 sm:px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-zinc-500 hover:text-zinc-300 hover:border-white/[0.12] transition-all"
//                     >
//                       {ex.icon} {ex.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* PDF Upload */}
//             {tab === "pdf" && (
//               <div>
//                 <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2 sm:mb-3">
//                   Upload PDF
//                 </label>
//                 <div
//                   onClick={() => fileRef.current?.click()}
//                   onDragOver={(e) => { e.preventDefault(); setPdfDrag(true); }}
//                   onDragLeave={() => setPdfDrag(false)}
//                   onDrop={(e) => { e.preventDefault(); setPdfDrag(false); handleFileChange(e.dataTransfer.files[0] ?? null); }}
//                   className={`flex flex-col items-center justify-center gap-3 p-6 sm:p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all ${pdfDrag ? "border-indigo-500/70 bg-indigo-500/10" : pdfFile ? "border-emerald-500/50 bg-emerald-500/[0.05]" : "border-white/[0.10] hover:border-white/[0.20] bg-white/[0.02]"}`}
//                 >
//                   <input ref={fileRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)} />
//                   {pdfFile ? (
//                     <>
//                       <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
//                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-sm font-semibold text-emerald-400 truncate max-w-[200px] sm:max-w-xs">{pdfFile.name}</p>
//                         <p className="text-xs text-zinc-500 mt-1">{(pdfFile.size / 1024).toFixed(1)} KB · tap to change</p>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/[0.05] flex items-center justify-center">
//                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
//                           <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
//                           <polyline points="14 2 14 8 20 8" />
//                           <line x1="12" y1="18" x2="12" y2="12" />
//                           <line x1="9" y1="15" x2="15" y2="15" />
//                         </svg>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-sm font-semibold text-zinc-300">Drop your PDF here</p>
//                         <p className="text-xs text-zinc-600 mt-1">or tap to browse · max 10MB</p>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Question Count */}
//             <div>
//               <div className="flex items-center justify-between mb-2 sm:mb-3">
//                 <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
//                   Questions
//                 </label>
//                 <div className="flex items-center gap-1.5 sm:gap-2">
//                   <span className="text-xs font-mono font-bold text-indigo-400">{questionCount}q</span>
//                   <span className="text-xs text-zinc-600">·</span>
//                   <span className="text-xs font-mono font-bold text-zinc-500">{totalPoints}pts</span>
//                   <span className="text-xs text-zinc-600">·</span>
//                   <span className="text-xs font-mono font-bold text-amber-500/80">🪙 {QUIZ_TOKEN_COST}</span>
//                 </div>
//               </div>

//               {/* Paginated bar grid */}
//               <div className="flex gap-[2px] sm:gap-1">
//                 {visibleBars.map((n) => {
//                   const isSelected = n <= questionCount;
//                   const isFreeRange = n <= FREE_LIMIT;
//                   const isAvailable = isLoggedIn || isFreeRange;
//                   return (
//                     <button
//                       key={n}
//                       onClick={() => {
//                         if (!isLoggedIn && n > FREE_LIMIT) { openUpgrade("login_required"); return; }
//                         handleQuestionCountChange(n);
//                       }}
//                       title={`${n} question${n > 1 ? "s" : ""}${!isLoggedIn && n > FREE_LIMIT ? " · Sign in required" : ""}`}
//                       className={`relative flex-1 h-6 sm:h-8 rounded transition-all ${
//                         isSelected && isAvailable ? "bg-indigo-500"
//                         : isSelected && !isAvailable ? "bg-violet-600"
//                         : isAvailable ? "bg-white/[0.07] hover:bg-white/[0.14]"
//                         : "bg-white/[0.04] hover:bg-violet-500/20"
//                       }`}
//                     />
//                   );
//                 })}
//               </div>

//               {/* Legend + page nav */}
//               <div className="flex items-center justify-between mt-2">
//                 <div className="flex items-center gap-3">
//                   <div className="flex items-center gap-1.5">
//                     <span className="w-2 h-2 rounded-sm bg-indigo-500" />
//                     <span className="text-[10px] text-zinc-500">Free (1–{FREE_LIMIT})</span>
//                   </div>
//                   <div className="flex items-center gap-1.5">
//                     <span className="w-2 h-2 rounded-sm bg-indigo-400/50" />
//                     <span className="text-[10px] text-zinc-500">Signed in (1–{MAX_QUESTIONS})</span>
//                   </div>
//                 </div>
//                 {/* page flip */}
//                 <div className="flex items-center gap-1">
//                   <button
//                     onClick={() => setCurrentPage(0)}
//                     disabled={currentPage === 0}
//                     className="w-6 h-6 rounded-md text-[11px] font-bold border border-white/[0.08] bg-white/[0.04] text-zinc-400 hover:bg-white/[0.10] disabled:opacity-30 disabled:cursor-default transition-all"
//                   >‹</button>
//                   <span className="text-[10px] text-zinc-600 font-mono px-1">{pageStart}–{pageEnd}</span>
//                   <button
//                     onClick={() => setCurrentPage(1)}
//                     disabled={currentPage === 1}
//                     className="w-6 h-6 rounded-md text-[11px] font-bold border border-white/[0.08] bg-white/[0.04] text-zinc-400 hover:bg-white/[0.10] disabled:opacity-30 disabled:cursor-default transition-all"
//                   >›</button>
//                 </div>
//               </div>

//               {/* +/- stepper */}
//               <div className="flex items-center justify-center gap-4 mt-3 sm:mt-4">
//                 <button
//                   onClick={() => handleQuestionCountChange(questionCount - 1)}
//                   className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] text-zinc-300 hover:bg-white/[0.10] transition-all flex items-center justify-center text-xl font-bold"
//                 >−</button>
//                 <span className="text-2xl sm:text-3xl font-black text-white w-12 text-center tabular-nums">{questionCount}</span>
//                 <button
//                   onClick={() => handleQuestionCountChange(questionCount + 1)}
//                   className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border transition-all flex items-center justify-center text-xl font-bold ${
//                     !isLoggedIn && questionCount >= FREE_LIMIT
//                       ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/20"
//                       : "bg-white/[0.05] border-white/[0.08] text-zinc-300 hover:bg-white/[0.10]"
//                   }`}
//                 >
//                   {!isLoggedIn && questionCount >= FREE_LIMIT ? "🔐" : "+"}
//                 </button>
//               </div>
//             </div>

//             {/* Difficulty */}
//             <div>
//               <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2 sm:mb-3">
//                 Difficulty Level
//               </label>
//               <div className="grid grid-cols-3 gap-2 sm:gap-3">
//                 {DIFFICULTY_CONFIG.map((d) => (
//                   <button
//                     key={d.key}
//                     onClick={() => setDifficulty(d.key)}
//                     className={`p-3 sm:p-4 rounded-xl border text-left transition-all ${difficulty === d.key
//                       ? d.key === "basic" ? "border-emerald-500/50 bg-emerald-500/10"
//                         : d.key === "intermediate" ? "border-amber-500/50 bg-amber-500/10"
//                         : "border-rose-500/50 bg-rose-500/10"
//                       : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"}`}
//                   >
//                     <div className={`text-xs sm:text-sm font-bold mb-0.5 sm:mb-1 ${difficulty === d.key
//                       ? d.key === "basic" ? "text-emerald-400"
//                         : d.key === "intermediate" ? "text-amber-400"
//                         : "text-rose-400"
//                       : "text-white"}`}>
//                       {d.label}
//                     </div>
//                     <div className="text-[10px] sm:text-xs text-zinc-500 leading-tight hidden sm:block">{d.desc}</div>
//                     <div className={`text-[10px] sm:text-xs mt-1 sm:mt-2 font-mono font-bold ${difficulty === d.key
//                       ? d.key === "basic" ? "text-emerald-500"
//                         : d.key === "intermediate" ? "text-amber-500"
//                         : "text-rose-500"
//                       : "text-zinc-600"}`}>
//                       {d.points}
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Token reward hint */}
//             {isLoggedIn && (
//               <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-600 bg-amber-500/[0.04] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 border border-amber-500/[0.08]">
//                 <span>🪙 {QUIZ_TOKEN_COST} tokens · this quiz</span>
//                 <span className="w-px h-3 bg-zinc-700 hidden sm:block" />
//                 <span className="text-emerald-600">+{PERFECT_BONUS} bonus if perfect score</span>
//                 <span className="w-px h-3 bg-zinc-700 hidden sm:block" />
//                 <span className="text-emerald-600">+{COMPLETE_BONUS} for answering all {questionCount}q</span>
//               </div>
//             )}

//             {/* Info bar */}
//             <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-600 bg-white/[0.02] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 border border-white/[0.04]">
//               <span>📝 {questionCount} questions</span>
//               <span className="w-px h-3 bg-zinc-700 hidden sm:block" />
//               <span>🎯 MCQ + MSQ</span>
//               <span className="w-px h-3 bg-zinc-700 hidden sm:block" />
//               <span>🏆 {totalPoints} pts</span>
//               {isLoggedIn && !hasEnoughTokens && (
//                 <>
//                   <span className="w-px h-3 bg-zinc-700 hidden sm:block" />
//                   <span className="text-rose-400">⚠️ Need {QUIZ_TOKEN_COST} tokens</span>
//                 </>
//               )}
//             </div>

//             {/* Error */}
//             {error && (
//               <div className="flex items-start gap-3 px-3 sm:px-4 py-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs sm:text-sm">
//                 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
//                   <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
//                 </svg>
//                 {error}
//               </div>
//             )}

//             {/* CTA Button */}
//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="w-full py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm sm:text-base tracking-wide transition-all disabled:opacity-60 disabled:cursor-not-allowed group"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-2 sm:gap-3">
//                   <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                   </svg>
//                   {progress}
//                 </span>
//               ) : (
//                 <span className="flex items-center justify-center gap-2">
//                   {!isLoggedIn
//                     ? "🔐 Sign in to Generate Quiz"
//                     : !hasEnoughTokens
//                     ? "🪙 Get More Tokens"
//                     : `Generate ${questionCount} Question Quiz · 🪙 ${QUIZ_TOKEN_COST}`}
//                   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
//                     <path d="M5 12h14M12 5l7 7-7 7" />
//                   </svg>
//                 </span>
//               )}
//             </button>
//           </div>

//           {/* Features */}
//           <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 sm:mt-8">
//             {[
//               { icon: "🔗", title: "Any Link", desc: "YouTube, Wikipedia, articles" },
//               { icon: "📄", title: "PDF Upload", desc: "Notes, textbooks, docs" },
//               { icon: "🪙", title: "Earn Tokens", desc: "Perfect score = bonus tokens" },
//             ].map((f) => (
//               <div key={f.title} className="text-center px-1">
//                 <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{f.icon}</div>
//                 <div className="text-xs font-semibold text-zinc-300">{f.title}</div>
//                 <div className="text-[10px] sm:text-xs text-zinc-600 mt-0.5 hidden sm:block">{f.desc}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }













// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Difficulty } from "@/types";

// const EXAMPLE_LINKS = [
//   { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Artificial_intelligence", icon: "📖" },
//   { label: "YouTube", url: "https://www.youtube.com/watch?v=aircAruvnKk", icon: "▶️" },
//   { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Black_hole", icon: "🌑" },
// ];

// const DIFFICULTY_CONFIG: { key: Difficulty; label: string; desc: string; color: string; points: string }[] = [
//   { key: "basic", label: "Basic", desc: "Recall & definitions", color: "emerald", points: "5 pts/q" },
//   { key: "intermediate", label: "Intermediate", desc: "Apply & connect concepts", color: "amber", points: "10 pts/q" },
//   { key: "advanced", label: "Advanced", desc: "Analyze & synthesize", color: "rose", points: "15 pts/q" },
// ];

// export default function HomePage() {
//   const router = useRouter();
//   const [url, setUrl] = useState("");
//   const [difficulty, setDifficulty] = useState<Difficulty>("intermediate");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [progress, setProgress] = useState("");

//   const handleSubmit = async () => {
//     if (!url.trim()) { setError("Please enter a valid URL"); return; }
//     setError("");
//     setLoading(true);
//     setProgress("Fetching content...");

//     try {
//       setTimeout(() => setProgress("Analyzing with AI..."), 1500);
//       setTimeout(() => setProgress("Crafting questions..."), 3500);

//       const res = await fetch("/api/analyze", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ url: url.trim(), difficulty }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to generate quiz");

//       sessionStorage.setItem("quizSession", JSON.stringify(data.session));
//       router.push("/quiz");
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-[#080810] text-white overflow-hidden relative">
//       {/* Background effects */}
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />
//       <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_60%,#080810_100%)]" />
//       <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg5OSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

//       <div className="relative z-10 max-w-2xl mx-auto px-6 py-20">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8 tracking-wide">
//             <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
//             AI-POWERED QUIZ ENGINE
//           </div>
//           <h1 className="text-6xl font-black tracking-tighter leading-none mb-4">
//             <span className="text-white">Learn</span>
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400"> Deeper</span>
//           </h1>
//           <p className="text-zinc-400 text-lg leading-relaxed">
//             Paste any link — YouTube, Wikipedia, article, PDF.<br />
//             We generate a quiz that tests your understanding.
//           </p>
//         </div>

//         {/* Main Card */}
//         <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-8 space-y-7">
//           {/* URL Input */}
//           <div>
//             <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
//               Source URL
//             </label>
//             <div className="relative">
//               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
//                   <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
//                 </svg>
//               </span>
//               <input
//                 type="url"
//                 value={url}
//                 onChange={(e) => { setUrl(e.target.value); setError(""); }}
//                 onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//                 placeholder="https://en.wikipedia.org/wiki/..."
//                 className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
//               />
//             </div>
//             {/* Example links */}
//             <div className="flex flex-wrap gap-2 mt-3">
//               {EXAMPLE_LINKS.map((ex) => (
//                 <button
//                   key={ex.url}
//                   onClick={() => setUrl(ex.url)}
//                   className="text-xs px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-zinc-500 hover:text-zinc-300 hover:border-white/[0.12] transition-all"
//                 >
//                   {ex.icon} Try {ex.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Difficulty */}
//           <div>
//             <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
//               Difficulty Level
//             </label>
//             <div className="grid grid-cols-3 gap-3">
//               {DIFFICULTY_CONFIG.map((d) => (
//                 <button
//                   key={d.key}
//                   onClick={() => setDifficulty(d.key)}
//                   className={`relative p-4 rounded-xl border text-left transition-all ${
//                     difficulty === d.key
//                       ? d.key === "basic"
//                         ? "border-emerald-500/50 bg-emerald-500/10"
//                         : d.key === "intermediate"
//                         ? "border-amber-500/50 bg-amber-500/10"
//                         : "border-rose-500/50 bg-rose-500/10"
//                       : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
//                   }`}
//                 >
//                   <div className={`text-sm font-bold mb-1 ${
//                     difficulty === d.key
//                       ? d.key === "basic" ? "text-emerald-400"
//                       : d.key === "intermediate" ? "text-amber-400"
//                       : "text-rose-400"
//                       : "text-white"
//                   }`}>
//                     {d.label}
//                   </div>
//                   <div className="text-xs text-zinc-500 leading-tight">{d.desc}</div>
//                   <div className={`text-xs mt-2 font-mono font-bold ${
//                     difficulty === d.key
//                       ? d.key === "basic" ? "text-emerald-500"
//                       : d.key === "intermediate" ? "text-amber-500"
//                       : "text-rose-500"
//                       : "text-zinc-600"
//                   }`}>
//                     {d.points}
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Info bar */}
//           <div className="flex items-center gap-4 text-xs text-zinc-600 bg-white/[0.02] rounded-lg px-4 py-3 border border-white/[0.04]">
//             <span>📝 4 questions</span>
//             <span className="w-px h-3 bg-zinc-700" />
//             <span>🎯 MCQ + MSQ mix</span>
//             <span className="w-px h-3 bg-zinc-700" />
//             <span>💡 Explanations included</span>
//           </div>

//           {/* Error */}
//           {error && (
//             <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
//                 <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
//               </svg>
//               {error}
//             </div>
//           )}

//           {/* CTA Button */}
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-base tracking-wide transition-all disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden group"
//           >
//             {loading ? (
//               <span className="flex items-center justify-center gap-3">
//                 <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
//                 </svg>
//                 {progress}
//               </span>
//             ) : (
//               <span className="flex items-center justify-center gap-2">
//                 Generate Quiz
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
//                   <path d="M5 12h14M12 5l7 7-7 7"/>
//                 </svg>
//               </span>
//             )}
//           </button>
//         </div>

//         {/* Features */}
//         <div className="grid grid-cols-3 gap-4 mt-8">
//           {[
//             { icon: "🔗", title: "Any Link", desc: "YouTube, Wikipedia, articles, docs" },
//             { icon: "🧠", title: "AI Analysis", desc: "Claude reads & understands deeply" },
//             { icon: "🏆", title: "Scored Results", desc: "Points, grades & explanations" },
//           ].map((f) => (
//             <div key={f.title} className="text-center">
//               <div className="text-2xl mb-2">{f.icon}</div>
//               <div className="text-xs font-semibold text-zinc-300">{f.title}</div>
//               <div className="text-xs text-zinc-600 mt-0.5">{f.desc}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }


// "use client";
// import { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { Difficulty } from "@/types";

// const EXAMPLE_LINKS = [
//   { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Artificial_intelligence", icon: "📖" },
//   { label: "YouTube", url: "https://www.youtube.com/watch?v=aircAruvnKk", icon: "▶️" },
//   { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Black_hole", icon: "🌑" },
// ];

// const DIFFICULTY_CONFIG: {
//   key: Difficulty;
//   label: string;
//   desc: string;
//   color: string;
//   points: string;
// }[] = [
//   { key: "basic", label: "Basic", desc: "Recall & definitions", color: "emerald", points: "5 pts/q" },
//   { key: "intermediate", label: "Intermediate", desc: "Apply & connect concepts", color: "amber", points: "10 pts/q" },
//   { key: "advanced", label: "Advanced", desc: "Analyze & synthesize", color: "rose", points: "15 pts/q" },
// ];

// export default function HomePage() {
//   const router = useRouter();
//   const [tab, setTab] = useState<"url" | "pdf">("url");
//   const [url, setUrl] = useState("");
//   const [pdfFile, setPdfFile] = useState<File | null>(null);
//   const [pdfDrag, setPdfDrag] = useState(false);
//   const [difficulty, setDifficulty] = useState<Difficulty>("intermediate");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [progress, setProgress] = useState("");
//   const fileRef = useRef<HTMLInputElement>(null);

//   const handleFileChange = (file: File | null) => {
//     if (!file) return;
//     if (file.type !== "application/pdf") {
//       setError("Only PDF files are supported.");
//       return;
//     }
//     if (file.size > 10 * 1024 * 1024) {
//       setError("PDF must be under 10MB.");
//       return;
//     }
//     setError("");
//     setPdfFile(file);
//   };

//   const handleSubmit = async () => {
//     if (tab === "url" && !url.trim()) { setError("Please enter a valid URL"); return; }
//     if (tab === "pdf" && !pdfFile) { setError("Please upload a PDF file"); return; }
//     setError("");
//     setLoading(true);
//     setProgress("Fetching content...");

//     try {
//       setTimeout(() => setProgress("Analyzing with AI..."), 1500);
//       setTimeout(() => setProgress("Crafting questions..."), 3500);

//       let res: Response;

//       if (tab === "pdf" && pdfFile) {
//         const formData = new FormData();
//         formData.append("pdf", pdfFile);
//         formData.append("difficulty", difficulty);
//         res = await fetch("/api/analyze", { method: "POST", body: formData });
//       } else {
//         res = await fetch("/api/analyze", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ url: url.trim(), difficulty }),
//         });
//       }

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to generate quiz");

//       sessionStorage.setItem("quizSession", JSON.stringify(data.session));
//       router.push("/quiz");
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-[#080810] text-white overflow-hidden relative">
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />
//       <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_60%,#080810_100%)]" />
//       <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg5OSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

//       <div className="relative z-10 max-w-2xl mx-auto px-6 py-20">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8 tracking-wide">
//             <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
//             AI-POWERED QUIZ ENGINE
//           </div>
//           <h1 className="text-6xl font-black tracking-tighter leading-none mb-4">
//             <span className="text-white">Learn</span>
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400"> Deeper</span>
//           </h1>
//           <p className="text-zinc-400 text-lg leading-relaxed">
//             Paste any link or upload a PDF.<br />
//             We generate a quiz that tests your understanding.
//           </p>
//         </div>

//         <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-8 space-y-7">

//           {/* Tab switcher */}
//           <div className="flex gap-1 p-1 bg-white/[0.04] rounded-xl border border-white/[0.06]">
//             <button
//               onClick={() => { setTab("url"); setError(""); }}
//               className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
//                 tab === "url"
//                   ? "bg-indigo-600 text-white"
//                   : "text-zinc-500 hover:text-zinc-300"
//               }`}
//             >
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
//                 <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
//               </svg>
//               URL / Link
//             </button>
//             <button
//               onClick={() => { setTab("pdf"); setError(""); }}
//               className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
//                 tab === "pdf"
//                   ? "bg-indigo-600 text-white"
//                   : "text-zinc-500 hover:text-zinc-300"
//               }`}
//             >
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                 <polyline points="14 2 14 8 20 8"/>
//                 <line x1="16" y1="13" x2="8" y2="13"/>
//                 <line x1="16" y1="17" x2="8" y2="17"/>
//                 <polyline points="10 9 9 9 8 9"/>
//               </svg>
//               PDF Upload
//             </button>
//           </div>

//           {/* URL Input */}
//           {tab === "url" && (
//             <div>
//               <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
//                 Source URL
//               </label>
//               <div className="relative">
//                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
//                     <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
//                   </svg>
//                 </span>
//                 <input
//                   type="url"
//                   value={url}
//                   onChange={(e) => { setUrl(e.target.value); setError(""); }}
//                   onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//                   placeholder="https://en.wikipedia.org/wiki/..."
//                   className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
//                 />
//               </div>
//               <div className="flex flex-wrap gap-2 mt-3">
//                 {EXAMPLE_LINKS.map((ex) => (
//                   <button
//                     key={ex.url}
//                     onClick={() => setUrl(ex.url)}
//                     className="text-xs px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-zinc-500 hover:text-zinc-300 hover:border-white/[0.12] transition-all"
//                   >
//                     {ex.icon} Try {ex.label}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* PDF Upload */}
//           {tab === "pdf" && (
//             <div>
//               <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
//                 Upload PDF
//               </label>
//               <div
//                 onClick={() => fileRef.current?.click()}
//                 onDragOver={(e) => { e.preventDefault(); setPdfDrag(true); }}
//                 onDragLeave={() => setPdfDrag(false)}
//                 onDrop={(e) => {
//                   e.preventDefault();
//                   setPdfDrag(false);
//                   handleFileChange(e.dataTransfer.files[0] ?? null);
//                 }}
//                 className={`relative flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
//                   pdfDrag
//                     ? "border-indigo-500/70 bg-indigo-500/10"
//                     : pdfFile
//                     ? "border-emerald-500/50 bg-emerald-500/[0.05]"
//                     : "border-white/[0.10] hover:border-white/[0.20] bg-white/[0.02]"
//                 }`}
//               >
//                 <input
//                   ref={fileRef}
//                   type="file"
//                   accept=".pdf,application/pdf"
//                   className="hidden"
//                   onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
//                 />
//                 {pdfFile ? (
//                   <>
//                     <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
//                       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <polyline points="20 6 9 17 4 12"/>
//                       </svg>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-sm font-semibold text-emerald-400">{pdfFile.name}</p>
//                       <p className="text-xs text-zinc-500 mt-1">{(pdfFile.size / 1024).toFixed(1)} KB — click to change</p>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center">
//                       <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                         <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                         <polyline points="14 2 14 8 20 8"/>
//                         <line x1="12" y1="18" x2="12" y2="12"/>
//                         <line x1="9" y1="15" x2="15" y2="15"/>
//                       </svg>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-sm font-semibold text-zinc-300">Drop your PDF here</p>
//                       <p className="text-xs text-zinc-600 mt-1">or click to browse — max 10MB</p>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Difficulty */}
//           <div>
//             <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
//               Difficulty Level
//             </label>
//             <div className="grid grid-cols-3 gap-3">
//               {DIFFICULTY_CONFIG.map((d) => (
//                 <button
//                   key={d.key}
//                   onClick={() => setDifficulty(d.key)}
//                   className={`relative p-4 rounded-xl border text-left transition-all ${
//                     difficulty === d.key
//                       ? d.key === "basic"
//                         ? "border-emerald-500/50 bg-emerald-500/10"
//                         : d.key === "intermediate"
//                         ? "border-amber-500/50 bg-amber-500/10"
//                         : "border-rose-500/50 bg-rose-500/10"
//                       : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
//                   }`}
//                 >
//                   <div className={`text-sm font-bold mb-1 ${
//                     difficulty === d.key
//                       ? d.key === "basic" ? "text-emerald-400"
//                         : d.key === "intermediate" ? "text-amber-400"
//                         : "text-rose-400"
//                       : "text-white"
//                   }`}>
//                     {d.label}
//                   </div>
//                   <div className="text-xs text-zinc-500 leading-tight">{d.desc}</div>
//                   <div className={`text-xs mt-2 font-mono font-bold ${
//                     difficulty === d.key
//                       ? d.key === "basic" ? "text-emerald-500"
//                         : d.key === "intermediate" ? "text-amber-500"
//                         : "text-rose-500"
//                       : "text-zinc-600"
//                   }`}>
//                     {d.points}
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Info bar */}
//           <div className="flex items-center gap-4 text-xs text-zinc-600 bg-white/[0.02] rounded-lg px-4 py-3 border border-white/[0.04]">
//             <span>📝 4 questions</span>
//             <span className="w-px h-3 bg-zinc-700" />
//             <span>🎯 MCQ + MSQ mix</span>
//             <span className="w-px h-3 bg-zinc-700" />
//             <span>💡 Explanations included</span>
//           </div>

//           {/* Error */}
//           {error && (
//             <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
//                 <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
//               </svg>
//               {error}
//             </div>
//           )}

//           {/* CTA */}
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-base tracking-wide transition-all disabled:opacity-60 disabled:cursor-not-allowed group"
//           >
//             {loading ? (
//               <span className="flex items-center justify-center gap-3">
//                 <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
//                 </svg>
//                 {progress}
//               </span>
//             ) : (
//               <span className="flex items-center justify-center gap-2">
//                 Generate Quiz
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
//                   <path d="M5 12h14M12 5l7 7-7 7"/>
//                 </svg>
//               </span>
//             )}
//           </button>
//         </div>

//         {/* Features */}
//         <div className="grid grid-cols-3 gap-4 mt-8">
//           {[
//             { icon: "🔗", title: "Any Link", desc: "YouTube, Wikipedia, articles" },
//             { icon: "📄", title: "PDF Upload", desc: "Notes, textbooks, docs" },
//             { icon: "🏆", title: "Scored Results", desc: "Points, grades & explanations" },
//           ].map((f) => (
//             <div key={f.title} className="text-center">
//               <div className="text-2xl mb-2">{f.icon}</div>
//               <div className="text-xs font-semibold text-zinc-300">{f.title}</div>
//               <div className="text-xs text-zinc-600 mt-0.5">{f.desc}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }


















// "use client";
// import { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { Difficulty } from "@/types";

// const EXAMPLE_LINKS = [
//   { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Artificial_intelligence", icon: "📖" },
//   { label: "YouTube", url: "https://www.youtube.com/watch?v=aircAruvnKk", icon: "▶️" },
//   { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Black_hole", icon: "🌑" },
// ];

// const DIFFICULTY_CONFIG: {
//   key: Difficulty;
//   label: string;
//   desc: string;
//   color: string;
//   points: string;
// }[] = [
//   { key: "basic", label: "Basic", desc: "Recall & definitions", color: "emerald", points: "5 pts/q" },
//   { key: "intermediate", label: "Intermediate", desc: "Apply & connect concepts", color: "amber", points: "10 pts/q" },
//   { key: "advanced", label: "Advanced", desc: "Analyze & synthesize", color: "rose", points: "15 pts/q" },
// ];

// const FREE_LIMIT = 5;
// const MAX_QUESTIONS = 20;

// function UpgradeModal({ onClose }: { onClose: () => void }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
//       <div className="relative w-full max-w-md rounded-2xl border border-violet-500/30 bg-[#0e0e1a] p-8 shadow-2xl shadow-violet-900/30">
//         {/* Glow */}
//         <div className="absolute -top-px left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

//         <div className="flex flex-col items-center text-center gap-4">
//           <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-3xl shadow-lg shadow-violet-900/50">
//             ⚡
//           </div>
//           <div>
//             <h2 className="text-2xl font-black text-white tracking-tight">Unlock More Questions</h2>
//             <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
//               Free plan includes up to <span className="text-white font-semibold">5 questions</span> per quiz.<br />
//               Upgrade to generate up to <span className="text-violet-400 font-semibold">20 questions</span> and go deeper on any topic.
//             </p>
//           </div>

//           <div className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 space-y-2.5 text-sm text-left">
//             {[
//               ["✅", "Up to 20 questions per quiz"],
//               ["✅", "PDF + URL support"],
//               ["✅", "All difficulty levels"],
//               ["✅", "Priority AI processing"],
//             ].map(([icon, text]) => (
//               <div key={text} className="flex items-center gap-3 text-zinc-300">
//                 <span>{icon}</span>
//                 <span>{text}</span>
//               </div>
//             ))}
//           </div>

//           <button
//             onClick={onClose}
//             className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-violet-900/40"
//           >
//             Upgrade to Pro →
//           </button>
//           <button onClick={onClose} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
//             Maybe later
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function HomePage() {
//   const router = useRouter();
//   const [tab, setTab] = useState<"url" | "pdf">("url");
//   const [url, setUrl] = useState("");
//   const [pdfFile, setPdfFile] = useState<File | null>(null);
//   const [pdfDrag, setPdfDrag] = useState(false);
//   const [difficulty, setDifficulty] = useState<Difficulty>("intermediate");
//   const [questionCount, setQuestionCount] = useState(4);
//   const [showUpgrade, setShowUpgrade] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [progress, setProgress] = useState("");
//   const fileRef = useRef<HTMLInputElement>(null);

//   const handleFileChange = (file: File | null) => {
//     if (!file) return;
//     if (file.type !== "application/pdf") { setError("Only PDF files are supported."); return; }
//     if (file.size > 10 * 1024 * 1024) { setError("PDF must be under 10MB."); return; }
//     setError("");
//     setPdfFile(file);
//   };

//   const handleQuestionCountChange = (val: number) => {
//     if (val > FREE_LIMIT) { setShowUpgrade(true); return; }
//     setQuestionCount(val);
//   };

//   const handleSubmit = async () => {
//     if (tab === "url" && !url.trim()) { setError("Please enter a valid URL"); return; }
//     if (tab === "pdf" && !pdfFile) { setError("Please upload a PDF file"); return; }
//     setError("");
//     setLoading(true);
//     setProgress("Fetching content...");

//     try {
//       setTimeout(() => setProgress("Analyzing with AI..."), 1500);
//       setTimeout(() => setProgress("Crafting questions..."), 3500);

//       let res: Response;

//       if (tab === "pdf" && pdfFile) {
//         const formData = new FormData();
//         formData.append("pdf", pdfFile);
//         formData.append("difficulty", difficulty);
//         formData.append("questionCount", String(questionCount));
//         res = await fetch("/api/analyze", { method: "POST", body: formData });
//       } else {
//         res = await fetch("/api/analyze", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ url: url.trim(), difficulty, questionCount }),
//         });
//       }

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to generate quiz");

//       sessionStorage.setItem("quizSession", JSON.stringify(data.session));
//       router.push("/quiz");
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//       setLoading(false);
//     }
//   };

//   const totalPoints = (() => {
//     const pts = { basic: 5, intermediate: 10, advanced: 15 };
//     return pts[difficulty] * questionCount;
//   })();

//   return (
//     <>
//       {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}

//       <main className="min-h-screen bg-[#080810] text-white overflow-hidden relative">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />
//         <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_60%,#080810_100%)]" />
//         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg5OSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

//         <div className="relative z-10 max-w-2xl mx-auto px-6 py-20">
//           {/* Header */}
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8 tracking-wide">
//               <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
//               AI-POWERED QUIZ ENGINE
//             </div>
//             <h1 className="text-6xl font-black tracking-tighter leading-none mb-4">
//               <span className="text-white">Learn</span>
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400"> Deeper</span>
//             </h1>
//             <p className="text-zinc-400 text-lg leading-relaxed">
//               Paste any link or upload a PDF.<br />
//               We generate a quiz that tests your understanding.
//             </p>
//           </div>

//           <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-8 space-y-7">

//             {/* Tab switcher */}
//             <div className="flex gap-1 p-1 bg-white/[0.04] rounded-xl border border-white/[0.06]">
//               <button
//                 onClick={() => { setTab("url"); setError(""); }}
//                 className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${tab === "url" ? "bg-indigo-600 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
//               >
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
//                   <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
//                 </svg>
//                 URL / Link
//               </button>
//               <button
//                 onClick={() => { setTab("pdf"); setError(""); }}
//                 className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${tab === "pdf" ? "bg-indigo-600 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
//               >
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                   <polyline points="14 2 14 8 20 8"/>
//                   <line x1="16" y1="13" x2="8" y2="13"/>
//                   <line x1="16" y1="17" x2="8" y2="17"/>
//                   <polyline points="10 9 9 9 8 9"/>
//                 </svg>
//                 PDF Upload
//               </button>
//             </div>

//             {/* URL Input */}
//             {tab === "url" && (
//               <div>
//                 <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Source URL</label>
//                 <div className="relative">
//                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
//                       <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
//                     </svg>
//                   </span>
//                   <input
//                     type="url"
//                     value={url}
//                     onChange={(e) => { setUrl(e.target.value); setError(""); }}
//                     onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//                     placeholder="https://en.wikipedia.org/wiki/..."
//                     className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
//                   />
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-3">
//                   {EXAMPLE_LINKS.map((ex) => (
//                     <button
//                       key={ex.url}
//                       onClick={() => setUrl(ex.url)}
//                       className="text-xs px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-zinc-500 hover:text-zinc-300 hover:border-white/[0.12] transition-all"
//                     >
//                       {ex.icon} Try {ex.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* PDF Upload */}
//             {tab === "pdf" && (
//               <div>
//                 <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Upload PDF</label>
//                 <div
//                   onClick={() => fileRef.current?.click()}
//                   onDragOver={(e) => { e.preventDefault(); setPdfDrag(true); }}
//                   onDragLeave={() => setPdfDrag(false)}
//                   onDrop={(e) => { e.preventDefault(); setPdfDrag(false); handleFileChange(e.dataTransfer.files[0] ?? null); }}
//                   className={`relative flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
//                     pdfDrag ? "border-indigo-500/70 bg-indigo-500/10"
//                     : pdfFile ? "border-emerald-500/50 bg-emerald-500/[0.05]"
//                     : "border-white/[0.10] hover:border-white/[0.20] bg-white/[0.02]"
//                   }`}
//                 >
//                   <input ref={fileRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)} />
//                   {pdfFile ? (
//                     <>
//                       <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
//                         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                           <polyline points="20 6 9 17 4 12"/>
//                         </svg>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-sm font-semibold text-emerald-400">{pdfFile.name}</p>
//                         <p className="text-xs text-zinc-500 mt-1">{(pdfFile.size / 1024).toFixed(1)} KB — click to change</p>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center">
//                         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                           <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                           <polyline points="14 2 14 8 20 8"/>
//                           <line x1="12" y1="18" x2="12" y2="12"/>
//                           <line x1="9" y1="15" x2="15" y2="15"/>
//                         </svg>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-sm font-semibold text-zinc-300">Drop your PDF here</p>
//                         <p className="text-xs text-zinc-600 mt-1">or click to browse — max 10MB</p>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Question Count */}
//             <div>
//               <div className="flex items-center justify-between mb-3">
//                 <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
//                   Number of Questions
//                 </label>
//                 <div className="flex items-center gap-2">
//                   <span className="text-xs font-mono font-bold text-indigo-400">{questionCount} questions</span>
//                   <span className="text-xs text-zinc-600">·</span>
//                   <span className="text-xs font-mono font-bold text-zinc-500">{totalPoints} pts total</span>
//                 </div>
//               </div>

//               {/* Slider track */}
//               <div className="relative">
//                 <div className="flex gap-1.5">
//                   {Array.from({ length: MAX_QUESTIONS }, (_, i) => i + 1).map((n) => {
//                     const isSelected = n <= questionCount;
//                     const isFree = n <= FREE_LIMIT;
//                     const isLocked = !isFree;
//                     return (
//                       <button
//                         key={n}
//                         onClick={() => handleQuestionCountChange(n)}
//                         title={isLocked ? "Pro plan required" : `${n} question${n > 1 ? "s" : ""}`}
//                         className={`relative flex-1 h-8 rounded-md transition-all group ${
//                           isSelected && isFree
//                             ? "bg-indigo-500"
//                             : isSelected && isLocked
//                             ? "bg-violet-600"
//                             : isFree
//                             ? "bg-white/[0.07] hover:bg-white/[0.14]"
//                             : "bg-white/[0.04] hover:bg-violet-500/20"
//                         }`}
//                       >
//                         {isLocked && (
//                           <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                             <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.8)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
//                               <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
//                               <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
//                             </svg>
//                           </span>
//                         )}
//                       </button>
//                     );
//                   })}
//                 </div>

//                 {/* Free / Pro label below */}
//                 <div className="flex justify-between mt-2">
//                   <div className="flex items-center gap-1.5">
//                     <span className="w-2 h-2 rounded-sm bg-indigo-500" />
//                     <span className="text-[10px] text-zinc-500">Free (1–{FREE_LIMIT})</span>
//                   </div>
//                   <div className="flex items-center gap-1.5">
//                     <span className="w-2 h-2 rounded-sm bg-violet-600" />
//                     <span className="text-[10px] text-zinc-500">Pro ({FREE_LIMIT + 1}–{MAX_QUESTIONS})</span>
//                     <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-400 font-semibold border border-violet-500/30">⚡ Upgrade</span>
//                   </div>
//                 </div>
//               </div>

//               {/* +/- stepper */}
//               <div className="flex items-center justify-center gap-4 mt-4">
//                 <button
//                   onClick={() => handleQuestionCountChange(Math.max(1, questionCount - 1))}
//                   className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] text-zinc-300 hover:bg-white/[0.10] transition-all flex items-center justify-center text-lg font-bold"
//                 >
//                   −
//                 </button>
//                 <span className="text-2xl font-black text-white w-12 text-center tabular-nums">{questionCount}</span>
//                 <button
//                   onClick={() => handleQuestionCountChange(Math.min(MAX_QUESTIONS, questionCount + 1))}
//                   className={`w-9 h-9 rounded-lg border transition-all flex items-center justify-center text-lg font-bold ${
//                     questionCount >= FREE_LIMIT
//                       ? "bg-violet-500/10 border-violet-500/30 text-violet-400 hover:bg-violet-500/20"
//                       : "bg-white/[0.05] border-white/[0.08] text-zinc-300 hover:bg-white/[0.10]"
//                   }`}
//                 >
//                   {questionCount >= FREE_LIMIT ? "⚡" : "+"}
//                 </button>
//               </div>
//             </div>

//             {/* Difficulty */}
//             <div>
//               <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Difficulty Level</label>
//               <div className="grid grid-cols-3 gap-3">
//                 {DIFFICULTY_CONFIG.map((d) => (
//                   <button
//                     key={d.key}
//                     onClick={() => setDifficulty(d.key)}
//                     className={`relative p-4 rounded-xl border text-left transition-all ${
//                       difficulty === d.key
//                         ? d.key === "basic" ? "border-emerald-500/50 bg-emerald-500/10"
//                           : d.key === "intermediate" ? "border-amber-500/50 bg-amber-500/10"
//                           : "border-rose-500/50 bg-rose-500/10"
//                         : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
//                     }`}
//                   >
//                     <div className={`text-sm font-bold mb-1 ${
//                       difficulty === d.key
//                         ? d.key === "basic" ? "text-emerald-400"
//                           : d.key === "intermediate" ? "text-amber-400"
//                           : "text-rose-400"
//                         : "text-white"
//                     }`}>
//                       {d.label}
//                     </div>
//                     <div className="text-xs text-zinc-500 leading-tight">{d.desc}</div>
//                     <div className={`text-xs mt-2 font-mono font-bold ${
//                       difficulty === d.key
//                         ? d.key === "basic" ? "text-emerald-500"
//                           : d.key === "intermediate" ? "text-amber-500"
//                           : "text-rose-500"
//                         : "text-zinc-600"
//                     }`}>
//                       {d.points}
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Info bar */}
//             <div className="flex items-center gap-4 text-xs text-zinc-600 bg-white/[0.02] rounded-lg px-4 py-3 border border-white/[0.04]">
//               <span>📝 {questionCount} questions</span>
//               <span className="w-px h-3 bg-zinc-700" />
//               <span>🎯 MCQ + MSQ mix</span>
//               <span className="w-px h-3 bg-zinc-700" />
//               <span>🏆 {totalPoints} pts total</span>
//             </div>

//             {/* Error */}
//             {error && (
//               <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
//                   <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
//                 </svg>
//                 {error}
//               </div>
//             )}

//             {/* CTA */}
//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-base tracking-wide transition-all disabled:opacity-60 disabled:cursor-not-allowed group"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-3">
//                   <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
//                   </svg>
//                   {progress}
//                 </span>
//               ) : (
//                 <span className="flex items-center justify-center gap-2">
//                   Generate {questionCount} Question Quiz
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
//                     <path d="M5 12h14M12 5l7 7-7 7"/>
//                   </svg>
//                 </span>
//               )}
//             </button>
//           </div>

//           {/* Features */}
//           <div className="grid grid-cols-3 gap-4 mt-8">
//             {[
//               { icon: "🔗", title: "Any Link", desc: "YouTube, Wikipedia, articles" },
//               { icon: "📄", title: "PDF Upload", desc: "Notes, textbooks, docs" },
//               { icon: "🏆", title: "Scored Results", desc: "Points, grades & explanations" },
//             ].map((f) => (
//               <div key={f.title} className="text-center">
//                 <div className="text-2xl mb-2">{f.icon}</div>
//                 <div className="text-xs font-semibold text-zinc-300">{f.title}</div>
//                 <div className="text-xs text-zinc-600 mt-0.5">{f.desc}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }





























// "use client";
// import { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { Difficulty } from "@/types";

// const EXAMPLE_LINKS = [
//   { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Artificial_intelligence", icon: "📖" },
//   { label: "YouTube", url: "https://www.youtube.com/watch?v=aircAruvnKk", icon: "▶️" },
//   { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Black_hole", icon: "🌑" },
// ];

// const DIFFICULTY_CONFIG: {
//   key: Difficulty;
//   label: string;
//   desc: string;
//   color: string;
//   points: string;
// }[] = [
//   { key: "basic", label: "Basic", desc: "Recall & definitions", color: "emerald", points: "5 pts/q" },
//   { key: "intermediate", label: "Intermediate", desc: "Apply & connect concepts", color: "amber", points: "10 pts/q" },
//   { key: "advanced", label: "Advanced", desc: "Analyze & synthesize", color: "rose", points: "15 pts/q" },
// ];

// const FREE_LIMIT = 5;
// const MAX_QUESTIONS = 20;

// function UpgradeModal({ onClose }: { onClose: () => void }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
//       <div className="relative w-full max-w-md rounded-2xl border border-violet-500/30 bg-[#0e0e1a] p-8 shadow-2xl shadow-violet-900/30">
//         {/* Glow */}
//         <div className="absolute -top-px left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

//         <div className="flex flex-col items-center text-center gap-4">
//           <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-3xl shadow-lg shadow-violet-900/50">
//             ⚡
//           </div>
//           <div>
//             <h2 className="text-2xl font-black text-white tracking-tight">Unlock More Questions</h2>
//             <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
//               Free plan includes up to <span className="text-white font-semibold">5 questions</span> per quiz.<br />
//               Upgrade to generate up to <span className="text-violet-400 font-semibold">20 questions</span> and go deeper on any topic.
//             </p>
//           </div>

//           <div className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 space-y-2.5 text-sm text-left">
//             {[
//               ["✅", "Up to 20 questions per quiz"],
//               ["✅", "PDF + URL support"],
//               ["✅", "All difficulty levels"],
//               ["✅", "Priority AI processing"],
//             ].map(([icon, text]) => (
//               <div key={text} className="flex items-center gap-3 text-zinc-300">
//                 <span>{icon}</span>
//                 <span>{text}</span>
//               </div>
//             ))}
//           </div>

//           <button
//             onClick={onClose}
//             className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-violet-900/40"
//           >
//             Upgrade to Pro →
//           </button>
//           <button onClick={onClose} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
//             Maybe later
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function HomePage() {
//   const router = useRouter();
//   const [tab, setTab] = useState<"url" | "pdf">("url");
//   const [url, setUrl] = useState("");
//   const [pdfFile, setPdfFile] = useState<File | null>(null);
//   const [pdfDrag, setPdfDrag] = useState(false);
//   const [difficulty, setDifficulty] = useState<Difficulty>("intermediate");
//   const [questionCount, setQuestionCount] = useState(4);
//   const [showUpgrade, setShowUpgrade] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [progress, setProgress] = useState("");
//   const fileRef = useRef<HTMLInputElement>(null);

//   const handleFileChange = (file: File | null) => {
//     if (!file) return;
//     if (file.type !== "application/pdf") { setError("Only PDF files are supported."); return; }
//     if (file.size > 10 * 1024 * 1024) { setError("PDF must be under 10MB."); return; }
//     setError("");
//     setPdfFile(file);
//   };

//   const handleQuestionCountChange = (val: number) => {
//     if (val > FREE_LIMIT) { setShowUpgrade(true); return; }
//     setQuestionCount(val);
//   };

//   const handleSubmit = async () => {
//     if (tab === "url" && !url.trim()) { setError("Please enter a valid URL"); return; }
//     if (tab === "pdf" && !pdfFile) { setError("Please upload a PDF file"); return; }
//     setError("");
//     setLoading(true);
//     setProgress("Fetching content...");

//     try {
//       setTimeout(() => setProgress("Analyzing with AI..."), 1500);
//       setTimeout(() => setProgress("Crafting questions..."), 3500);

//       let res: Response;

//       if (tab === "pdf" && pdfFile) {
//         const formData = new FormData();
//         formData.append("pdf", pdfFile);
//         formData.append("difficulty", difficulty);
//         formData.append("questionCount", String(questionCount));
//         res = await fetch("/api/analyze", { method: "POST", body: formData });
//       } else {
//         res = await fetch("/api/analyze", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ url: url.trim(), difficulty, questionCount }),
//         });
//       }

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to generate quiz");

//       sessionStorage.setItem("quizSession", JSON.stringify(data.session));
//       router.push("/quiz");
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//       setLoading(false);
//     }
//   };

//   const totalPoints = (() => {
//     const pts = { basic: 5, intermediate: 10, advanced: 15 };
//     return pts[difficulty] * questionCount;
//   })();

//   return (
//     <>
//       {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}

//       <main className="min-h-screen bg-[#080810] text-white overflow-hidden relative">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />
//         <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_60%,#080810_100%)]" />
//         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg5OSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

//         <div className="relative z-10 max-w-2xl mx-auto px-6 py-20">
//           {/* Header */}
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8 tracking-wide">
//               <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
//               AI-POWERED QUIZ ENGINE
//             </div>
//             <h1 className="text-6xl font-black tracking-tighter leading-none mb-4">
//               <span className="text-white">Learn</span>
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400"> Deeper</span>
//             </h1>
//             <p className="text-zinc-400 text-lg leading-relaxed">
//               Paste any link or upload a PDF.<br />
//               We generate a quiz that tests your understanding.
//             </p>
//           </div>

//           <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-8 space-y-7">

//             {/* Tab switcher */}
//             <div className="flex gap-1 p-1 bg-white/[0.04] rounded-xl border border-white/[0.06]">
//               <button
//                 onClick={() => { setTab("url"); setError(""); }}
//                 className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${tab === "url" ? "bg-indigo-600 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
//               >
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
//                   <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
//                 </svg>
//                 URL / Link
//               </button>
//               <button
//                 onClick={() => { setTab("pdf"); setError(""); }}
//                 className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${tab === "pdf" ? "bg-indigo-600 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
//               >
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                   <polyline points="14 2 14 8 20 8"/>
//                   <line x1="16" y1="13" x2="8" y2="13"/>
//                   <line x1="16" y1="17" x2="8" y2="17"/>
//                   <polyline points="10 9 9 9 8 9"/>
//                 </svg>
//                 PDF Upload
//               </button>
//             </div>

//             {/* URL Input */}
//             {tab === "url" && (
//               <div>
//                 <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Source URL</label>
//                 <div className="relative">
//                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
//                       <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
//                     </svg>
//                   </span>
//                   <input
//                     type="url"
//                     value={url}
//                     onChange={(e) => { setUrl(e.target.value); setError(""); }}
//                     onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//                     placeholder="https://en.wikipedia.org/wiki/..."
//                     className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
//                   />
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-3">
//                   {EXAMPLE_LINKS.map((ex) => (
//                     <button
//                       key={ex.url}
//                       onClick={() => setUrl(ex.url)}
//                       className="text-xs px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-zinc-500 hover:text-zinc-300 hover:border-white/[0.12] transition-all"
//                     >
//                       {ex.icon} Try {ex.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* PDF Upload */}
//             {tab === "pdf" && (
//               <div>
//                 <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Upload PDF</label>
//                 <div
//                   onClick={() => fileRef.current?.click()}
//                   onDragOver={(e) => { e.preventDefault(); setPdfDrag(true); }}
//                   onDragLeave={() => setPdfDrag(false)}
//                   onDrop={(e) => { e.preventDefault(); setPdfDrag(false); handleFileChange(e.dataTransfer.files[0] ?? null); }}
//                   className={`relative flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
//                     pdfDrag ? "border-indigo-500/70 bg-indigo-500/10"
//                     : pdfFile ? "border-emerald-500/50 bg-emerald-500/[0.05]"
//                     : "border-white/[0.10] hover:border-white/[0.20] bg-white/[0.02]"
//                   }`}
//                 >
//                   <input ref={fileRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)} />
//                   {pdfFile ? (
//                     <>
//                       <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
//                         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                           <polyline points="20 6 9 17 4 12"/>
//                         </svg>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-sm font-semibold text-emerald-400">{pdfFile.name}</p>
//                         <p className="text-xs text-zinc-500 mt-1">{(pdfFile.size / 1024).toFixed(1)} KB — click to change</p>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center">
//                         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                           <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                           <polyline points="14 2 14 8 20 8"/>
//                           <line x1="12" y1="18" x2="12" y2="12"/>
//                           <line x1="9" y1="15" x2="15" y2="15"/>
//                         </svg>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-sm font-semibold text-zinc-300">Drop your PDF here</p>
//                         <p className="text-xs text-zinc-600 mt-1">or click to browse — max 10MB</p>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Question Count */}
//             <div>
//               <div className="flex items-center justify-between mb-3">
//                 <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
//                   Number of Questions
//                 </label>
//                 <div className="flex items-center gap-2">
//                   <span className="text-xs font-mono font-bold text-indigo-400">{questionCount} questions</span>
//                   <span className="text-xs text-zinc-600">·</span>
//                   <span className="text-xs font-mono font-bold text-zinc-500">{totalPoints} pts total</span>
//                 </div>
//               </div>

//               {/* Slider track */}
//               <div className="relative">
//                 <div className="flex gap-1.5">
//                   {Array.from({ length: MAX_QUESTIONS }, (_, i) => i + 1).map((n) => {
//                     const isSelected = n <= questionCount;
//                     const isFree = n <= FREE_LIMIT;
//                     const isLocked = !isFree;
//                     return (
//                       <button
//                         key={n}
//                         onClick={() => handleQuestionCountChange(n)}
//                         title={isLocked ? "Pro plan required" : `${n} question${n > 1 ? "s" : ""}`}
//                         className={`relative flex-1 h-8 rounded-md transition-all group ${
//                           isSelected && isFree
//                             ? "bg-indigo-500"
//                             : isSelected && isLocked
//                             ? "bg-violet-600"
//                             : isFree
//                             ? "bg-white/[0.07] hover:bg-white/[0.14]"
//                             : "bg-white/[0.04] hover:bg-violet-500/20"
//                         }`}
//                       >
//                         {isLocked && (
//                           <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                             <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.8)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
//                               <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
//                               <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
//                             </svg>
//                           </span>
//                         )}
//                       </button>
//                     );
//                   })}
//                 </div>

//                 {/* Free / Pro label below */}
//                 <div className="flex justify-between mt-2">
//                   <div className="flex items-center gap-1.5">
//                     <span className="w-2 h-2 rounded-sm bg-indigo-500" />
//                     <span className="text-[10px] text-zinc-500">Free (1–{FREE_LIMIT})</span>
//                   </div>
//                   <div className="flex items-center gap-1.5">
//                     <span className="w-2 h-2 rounded-sm bg-violet-600" />
//                     <span className="text-[10px] text-zinc-500">Pro ({FREE_LIMIT + 1}–{MAX_QUESTIONS})</span>
//                     <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-400 font-semibold border border-violet-500/30">⚡ Upgrade</span>
//                   </div>
//                 </div>
//               </div>

//               {/* +/- stepper */}
//               <div className="flex items-center justify-center gap-4 mt-4">
//                 <button
//                   onClick={() => handleQuestionCountChange(Math.max(1, questionCount - 1))}
//                   className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] text-zinc-300 hover:bg-white/[0.10] transition-all flex items-center justify-center text-lg font-bold"
//                 >
//                   −
//                 </button>
//                 <span className="text-2xl font-black text-white w-12 text-center tabular-nums">{questionCount}</span>
//                 <button
//                   onClick={() => handleQuestionCountChange(Math.min(MAX_QUESTIONS, questionCount + 1))}
//                   className={`w-9 h-9 rounded-lg border transition-all flex items-center justify-center text-lg font-bold ${
//                     questionCount >= FREE_LIMIT
//                       ? "bg-violet-500/10 border-violet-500/30 text-violet-400 hover:bg-violet-500/20"
//                       : "bg-white/[0.05] border-white/[0.08] text-zinc-300 hover:bg-white/[0.10]"
//                   }`}
//                 >
//                   {questionCount >= FREE_LIMIT ? "⚡" : "+"}
//                 </button>
//               </div>
//             </div>

//             {/* Difficulty */}
//             <div>
//               <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Difficulty Level</label>
//               <div className="grid grid-cols-3 gap-3">
//                 {DIFFICULTY_CONFIG.map((d) => (
//                   <button
//                     key={d.key}
//                     onClick={() => setDifficulty(d.key)}
//                     className={`relative p-4 rounded-xl border text-left transition-all ${
//                       difficulty === d.key
//                         ? d.key === "basic" ? "border-emerald-500/50 bg-emerald-500/10"
//                           : d.key === "intermediate" ? "border-amber-500/50 bg-amber-500/10"
//                           : "border-rose-500/50 bg-rose-500/10"
//                         : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
//                     }`}
//                   >
//                     <div className={`text-sm font-bold mb-1 ${
//                       difficulty === d.key
//                         ? d.key === "basic" ? "text-emerald-400"
//                           : d.key === "intermediate" ? "text-amber-400"
//                           : "text-rose-400"
//                         : "text-white"
//                     }`}>
//                       {d.label}
//                     </div>
//                     <div className="text-xs text-zinc-500 leading-tight">{d.desc}</div>
//                     <div className={`text-xs mt-2 font-mono font-bold ${
//                       difficulty === d.key
//                         ? d.key === "basic" ? "text-emerald-500"
//                           : d.key === "intermediate" ? "text-amber-500"
//                           : "text-rose-500"
//                         : "text-zinc-600"
//                     }`}>
//                       {d.points}
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Info bar */}
//             <div className="flex items-center gap-4 text-xs text-zinc-600 bg-white/[0.02] rounded-lg px-4 py-3 border border-white/[0.04]">
//               <span>📝 {questionCount} questions</span>
//               <span className="w-px h-3 bg-zinc-700" />
//               <span>🎯 MCQ + MSQ mix</span>
//               <span className="w-px h-3 bg-zinc-700" />
//               <span>🏆 {totalPoints} pts total</span>
//             </div>

//             {/* Error */}
//             {error && (
//               <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
//                   <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
//                 </svg>
//                 {error}
//               </div>
//             )}

//             {/* CTA */}
//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-base tracking-wide transition-all disabled:opacity-60 disabled:cursor-not-allowed group"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-3">
//                   <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
//                   </svg>
//                   {progress}
//                 </span>
//               ) : (
//                 <span className="flex items-center justify-center gap-2">
//                   Generate {questionCount} Question Quiz
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
//                     <path d="M5 12h14M12 5l7 7-7 7"/>
//                   </svg>
//                 </span>
//               )}
//             </button>
//           </div>

//           {/* Features */}
//           <div className="grid grid-cols-3 gap-4 mt-8">
//             {[
//               { icon: "🔗", title: "Any Link", desc: "YouTube, Wikipedia, articles" },
//               { icon: "📄", title: "PDF Upload", desc: "Notes, textbooks, docs" },
//               { icon: "🏆", title: "Scored Results", desc: "Points, grades & explanations" },
//             ].map((f) => (
//               <div key={f.title} className="text-center">
//                 <div className="text-2xl mb-2">{f.icon}</div>
//                 <div className="text-xs font-semibold text-zinc-300">{f.title}</div>
//                 <div className="text-xs text-zinc-600 mt-0.5">{f.desc}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }






























// "use client";
// import { useState, useRef, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { loadStripe } from "@stripe/stripe-js";
// import { Difficulty } from "@/types";

// // Initialize Stripe
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// const EXAMPLE_LINKS = [
//   { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Artificial_intelligence", icon: "📖" },
//   { label: "YouTube", url: "https://www.youtube.com/watch?v=aircAruvnKk", icon: "▶️" },
//   { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Black_hole", icon: "🌑" },
// ];

// const DIFFICULTY_CONFIG: {
//   key: Difficulty;
//   label: string;
//   desc: string;
//   color: string;
//   points: string;
// }[] = [
//   { key: "basic", label: "Basic", desc: "Recall & definitions", color: "emerald", points: "5 pts/q" },
//   { key: "intermediate", label: "Intermediate", desc: "Apply & connect concepts", color: "amber", points: "10 pts/q" },
//   { key: "advanced", label: "Advanced", desc: "Analyze & synthesize", color: "rose", points: "15 pts/q" },
// ];

// const FREE_LIMIT = 5;
// const MAX_QUESTIONS = 20;
// const PRO_PRICE = 15;

// function UpgradeModal({ onClose, onSubscribe }: { onClose: () => void; onSubscribe: () => void }) {
//   const [loading, setLoading] = useState(false);

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
//       <div className="relative w-full max-w-md rounded-2xl border border-violet-500/30 bg-[#0e0e1a] p-8 shadow-2xl shadow-violet-900/30">
//         <div className="absolute -top-px left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

//         <div className="flex flex-col items-center text-center gap-4">
//           <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-3xl shadow-lg shadow-violet-900/50">
//             ⚡
//           </div>
//           <div>
//             <h2 className="text-2xl font-black text-white tracking-tight">Unlock Pro Features</h2>
//             <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
//               Get unlimited quizzes, PDF uploads, and advanced AI processing
//             </p>
//           </div>

//           <div className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 space-y-2.5 text-sm text-left">
//             {[
//               ["✅", "Up to 20 questions per quiz"],
//               ["✅", "PDF + URL support"],
//               ["✅", "All difficulty levels"],
//               ["✅", "Priority AI processing"],
//               ["✅", "Export quizzes as PDF"],
//               ["✅", "Detailed analytics"],
//             ].map(([icon, text]) => (
//               <div key={text} className="flex items-center gap-3 text-zinc-300">
//                 <span>{icon}</span>
//                 <span>{text}</span>
//               </div>
//             ))}
//           </div>

//           <div className="text-center">
//             <div className="text-3xl font-bold text-white">${PRO_PRICE}</div>
//             <div className="text-xs text-zinc-500">per month</div>
//           </div>

//           <button
//             onClick={onSubscribe}
//             disabled={loading}
//             className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-violet-900/40 disabled:opacity-50"
//           >
//             {loading ? "Processing..." : "Subscribe Now →"}
//           </button>
//           <button onClick={onClose} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
//             Maybe later
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function HomePage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [tab, setTab] = useState<"url" | "pdf">("url");
//   const [url, setUrl] = useState("");
//   const [pdfFile, setPdfFile] = useState<File | null>(null);
//   const [pdfDrag, setPdfDrag] = useState(false);
//   const [difficulty, setDifficulty] = useState<Difficulty>("intermediate");
//   const [questionCount, setQuestionCount] = useState(4);
//   const [showUpgrade, setShowUpgrade] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [progress, setProgress] = useState("");
//   const [isPro, setIsPro] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const fileRef = useRef<HTMLInputElement>(null);

//   // Check subscription status
//   const checkSubscriptionStatus = async () => {
//     try {
//       const res = await fetch("/api/subscription/status");
//       const data = await res.json();
//       setIsPro(data.isPro);
//       if (data.isPro) {
//         localStorage.setItem("isPro", "true");
//       }
//     } catch {
//       const proStatus = localStorage.getItem("isPro");
//       setIsPro(proStatus === "true");
//     }
//   };

//   // Check URL params for payment success/cancel
//   useEffect(() => {
//     const success = searchParams.get("success");
//     const canceled = searchParams.get("canceled");
    
//     if (success === "true") {
//       setShowSuccess(true);
//       checkSubscriptionStatus();
//       const newUrl = window.location.pathname;
//       window.history.replaceState({}, "", newUrl);
//       setTimeout(() => setShowSuccess(false), 5000);
//     }
    
//     if (canceled === "true") {
//       setError("Payment was cancelled. You can try again anytime.");
//       const newUrl = window.location.pathname;
//       window.history.replaceState({}, "", newUrl);
//       setTimeout(() => setError(""), 5000);
//     }
//   }, [searchParams]);

//   // Check subscription on mount
//   useEffect(() => {
//     checkSubscriptionStatus();
//   }, []);

//   const handleSubscribe = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("/api/create-checkout", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           priceId: "price_pro_monthly",
//           successUrl: `${window.location.origin}/?success=true`,
//           cancelUrl: `${window.location.origin}/?canceled=true`,
//         }),
//       });

//       const { url } = await response.json();
//       window.location.href = url;
//     } catch (error) {
//       console.error("Error:", error);
//       setError("Failed to initiate checkout. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileChange = (file: File | null) => {
//     if (!file) return;
//     if (file.type !== "application/pdf") { setError("Only PDF files are supported."); return; }
//     if (file.size > 10 * 1024 * 1024) { setError("PDF must be under 10MB."); return; }
//     setError("");
//     setPdfFile(file);
//   };

//   const handleQuestionCountChange = (val: number) => {
//     if (!isPro && val > FREE_LIMIT) { 
//       setShowUpgrade(true); 
//       return; 
//     }
//     setQuestionCount(val);
//   };

//   const handleSubmit = async () => {
//     if (tab === "url" && !url.trim()) { setError("Please enter a valid URL"); return; }
//     if (tab === "pdf" && !pdfFile) { setError("Please upload a PDF file"); return; }
    
//     if (!isPro && questionCount > FREE_LIMIT) {
//       setShowUpgrade(true);
//       return;
//     }
    
//     setError("");
//     setLoading(true);
//     setProgress("Fetching content...");

//     try {
//       setTimeout(() => setProgress("Analyzing with AI..."), 1500);
//       setTimeout(() => setProgress("Crafting questions..."), 3500);

//       let res: Response;

//       if (tab === "pdf" && pdfFile) {
//         const formData = new FormData();
//         formData.append("pdf", pdfFile);
//         formData.append("difficulty", difficulty);
//         formData.append("questionCount", String(questionCount));
//         res = await fetch("/api/analyze", { method: "POST", body: formData });
//       } else {
//         res = await fetch("/api/analyze", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ url: url.trim(), difficulty, questionCount }),
//         });
//       }

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to generate quiz");

//       sessionStorage.setItem("quizSession", JSON.stringify(data.session));
//       router.push("/quiz");
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//       setLoading(false);
//     }
//   };

//   const totalPoints = (() => {
//     const pts = { basic: 5, intermediate: 10, advanced: 15 };
//     return pts[difficulty] * questionCount;
//   })();

//   return (
//     <>
//       {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} onSubscribe={handleSubscribe} />}

//       {/* Success Toast */}
//       {showSuccess && (
//         <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top fade-in duration-300">
//           <div className="bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded-xl px-6 py-3 flex items-center gap-3 shadow-xl">
//             <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5">
//                 <polyline points="20 6 9 17 4 12"/>
//               </svg>
//             </div>
//             <div>
//               <p className="font-semibold text-emerald-400">Payment Successful!</p>
//               <p className="text-xs text-emerald-300/80">You are now a Pro member!</p>
//             </div>
//           </div>
//         </div>
//       )}

//       <main className="min-h-screen bg-[#080810] text-white overflow-hidden relative">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />
//         <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_60%,#080810_100%)]" />
//         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg5OSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

//         <div className="relative z-10 max-w-2xl mx-auto px-6 py-20">
//           {/* Header */}
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8 tracking-wide">
//               <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
//               {isPro ? "⚡ PRO PLAN ACTIVE" : "AI-POWERED QUIZ ENGINE"}
//             </div>
//             <h1 className="text-6xl font-black tracking-tighter leading-none mb-4">
//               <span className="text-white">Learn</span>
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400"> Deeper</span>
//             </h1>
//             <p className="text-zinc-400 text-lg leading-relaxed">
//               Paste any link or upload a PDF.<br />
//               We generate a quiz that tests your understanding.
//             </p>
//             {!isPro && (
//               <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-400 text-xs">
//                 <span>⚡</span>
//                 <span>Free: {FREE_LIMIT} questions | Pro: ${PRO_PRICE}/month</span>
//               </div>
//             )}
//           </div>

//           <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-8 space-y-7">
//             {/* Tab switcher */}
//             <div className="flex gap-1 p-1 bg-white/[0.04] rounded-xl border border-white/[0.06]">
//               <button
//                 onClick={() => { setTab("url"); setError(""); }}
//                 className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${tab === "url" ? "bg-indigo-600 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
//               >
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
//                   <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
//                 </svg>
//                 URL / Link
//               </button>
//               <button
//                 onClick={() => { setTab("pdf"); setError(""); }}
//                 className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${tab === "pdf" ? "bg-indigo-600 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
//               >
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                   <polyline points="14 2 14 8 20 8"/>
//                   <line x1="16" y1="13" x2="8" y2="13"/>
//                   <line x1="16" y1="17" x2="8" y2="17"/>
//                 </svg>
//                 PDF Upload
//               </button>
//             </div>

//             {/* URL Input */}
//             {tab === "url" && (
//               <div>
//                 <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Source URL</label>
//                 <div className="relative">
//                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
//                       <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
//                     </svg>
//                   </span>
//                   <input
//                     type="url"
//                     value={url}
//                     onChange={(e) => { setUrl(e.target.value); setError(""); }}
//                     onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//                     placeholder="https://en.wikipedia.org/wiki/..."
//                     className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
//                   />
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-3">
//                   {EXAMPLE_LINKS.map((ex) => (
//                     <button
//                       key={ex.url}
//                       onClick={() => setUrl(ex.url)}
//                       className="text-xs px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-zinc-500 hover:text-zinc-300 hover:border-white/[0.12] transition-all"
//                     >
//                       {ex.icon} Try {ex.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* PDF Upload */}
//             {tab === "pdf" && (
//               <div>
//                 <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Upload PDF</label>
//                 <div
//                   onClick={() => fileRef.current?.click()}
//                   onDragOver={(e) => { e.preventDefault(); setPdfDrag(true); }}
//                   onDragLeave={() => setPdfDrag(false)}
//                   onDrop={(e) => { e.preventDefault(); setPdfDrag(false); handleFileChange(e.dataTransfer.files[0] ?? null); }}
//                   className={`relative flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
//                     pdfDrag ? "border-indigo-500/70 bg-indigo-500/10"
//                     : pdfFile ? "border-emerald-500/50 bg-emerald-500/[0.05]"
//                     : "border-white/[0.10] hover:border-white/[0.20] bg-white/[0.02]"
//                   }`}
//                 >
//                   <input ref={fileRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)} />
//                   {pdfFile ? (
//                     <>
//                       <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
//                         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
//                           <polyline points="20 6 9 17 4 12"/>
//                         </svg>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-sm font-semibold text-emerald-400">{pdfFile.name}</p>
//                         <p className="text-xs text-zinc-500 mt-1">{(pdfFile.size / 1024).toFixed(1)} KB — click to change</p>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center">
//                         <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
//                           <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                           <polyline points="14 2 14 8 20 8"/>
//                           <line x1="12" y1="18" x2="12" y2="12"/>
//                           <line x1="9" y1="15" x2="15" y2="15"/>
//                         </svg>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-sm font-semibold text-zinc-300">Drop your PDF here</p>
//                         <p className="text-xs text-zinc-600 mt-1">or click to browse — max 10MB</p>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Question Count */}
//             <div>
//               <div className="flex items-center justify-between mb-3">
//                 <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
//                   Number of Questions
//                 </label>
//                 <div className="flex items-center gap-2">
//                   <span className="text-xs font-mono font-bold text-indigo-400">{questionCount} questions</span>
//                   <span className="text-xs text-zinc-600">·</span>
//                   <span className="text-xs font-mono font-bold text-zinc-500">{totalPoints} pts total</span>
//                 </div>
//               </div>

//               <div className="relative">
//                 <div className="flex gap-1.5">
//                   {Array.from({ length: MAX_QUESTIONS }, (_, i) => i + 1).map((n) => {
//                     const isSelected = n <= questionCount;
//                     const isAvailable = isPro || n <= FREE_LIMIT;
//                     return (
//                       <button
//                         key={n}
//                         onClick={() => isAvailable && handleQuestionCountChange(n)}
//                         disabled={!isAvailable}
//                         className={`relative flex-1 h-8 rounded-md transition-all group ${
//                           isSelected && isAvailable
//                             ? "bg-indigo-500"
//                             : isSelected && !isAvailable
//                             ? "bg-violet-600"
//                             : isAvailable
//                             ? "bg-white/[0.07] hover:bg-white/[0.14]"
//                             : "bg-white/[0.04] cursor-not-allowed"
//                         }`}
//                       >
//                         {!isAvailable && (
//                           <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                             <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.8)" strokeWidth="3">
//                               <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
//                               <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
//                             </svg>
//                           </span>
//                         )}
//                       </button>
//                     );
//                   })}
//                 </div>

//                 <div className="flex justify-between mt-2">
//                   <div className="flex items-center gap-1.5">
//                     <span className="w-2 h-2 rounded-sm bg-indigo-500" />
//                     <span className="text-[10px] text-zinc-500">Free (1–{FREE_LIMIT})</span>
//                   </div>
//                   <div className="flex items-center gap-1.5">
//                     <span className="w-2 h-2 rounded-sm bg-violet-600" />
//                     <span className="text-[10px] text-zinc-500">Pro ({FREE_LIMIT + 1}–{MAX_QUESTIONS})</span>
//                     {!isPro && (
//                       <button
//                         onClick={() => setShowUpgrade(true)}
//                         className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-400 font-semibold border border-violet-500/30 hover:bg-violet-500/30 transition-all"
//                       >
//                         ⚡ Upgrade
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-center justify-center gap-4 mt-4">
//                 <button
//                   onClick={() => handleQuestionCountChange(Math.max(1, questionCount - 1))}
//                   className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] text-zinc-300 hover:bg-white/[0.10] transition-all flex items-center justify-center text-lg font-bold"
//                 >
//                   −
//                 </button>
//                 <span className="text-2xl font-black text-white w-12 text-center tabular-nums">{questionCount}</span>
//                 <button
//                   onClick={() => handleQuestionCountChange(Math.min(MAX_QUESTIONS, questionCount + 1))}
//                   className={`w-9 h-9 rounded-lg border transition-all flex items-center justify-center text-lg font-bold ${
//                     questionCount >= FREE_LIMIT && !isPro
//                       ? "bg-violet-500/10 border-violet-500/30 text-violet-400 hover:bg-violet-500/20"
//                       : "bg-white/[0.05] border-white/[0.08] text-zinc-300 hover:bg-white/[0.10]"
//                   }`}
//                 >
//                   {questionCount >= FREE_LIMIT && !isPro ? "⚡" : "+"}
//                 </button>
//               </div>
//             </div>

//             {/* Difficulty */}
//             <div>
//               <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">Difficulty Level</label>
//               <div className="grid grid-cols-3 gap-3">
//                 {DIFFICULTY_CONFIG.map((d) => (
//                   <button
//                     key={d.key}
//                     onClick={() => setDifficulty(d.key)}
//                     className={`relative p-4 rounded-xl border text-left transition-all ${
//                       difficulty === d.key
//                         ? d.key === "basic" ? "border-emerald-500/50 bg-emerald-500/10"
//                           : d.key === "intermediate" ? "border-amber-500/50 bg-amber-500/10"
//                           : "border-rose-500/50 bg-rose-500/10"
//                         : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
//                     }`}
//                   >
//                     <div className={`text-sm font-bold mb-1 ${
//                       difficulty === d.key
//                         ? d.key === "basic" ? "text-emerald-400"
//                           : d.key === "intermediate" ? "text-amber-400"
//                           : "text-rose-400"
//                         : "text-white"
//                     }`}>
//                       {d.label}
//                     </div>
//                     <div className="text-xs text-zinc-500 leading-tight">{d.desc}</div>
//                     <div className={`text-xs mt-2 font-mono font-bold ${
//                       difficulty === d.key
//                         ? d.key === "basic" ? "text-emerald-500"
//                           : d.key === "intermediate" ? "text-amber-500"
//                           : "text-rose-500"
//                         : "text-zinc-600"
//                     }`}>
//                       {d.points}
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Info bar */}
//             <div className="flex items-center gap-4 text-xs text-zinc-600 bg-white/[0.02] rounded-lg px-4 py-3 border border-white/[0.04]">
//               <span>📝 {questionCount} questions</span>
//               <span className="w-px h-3 bg-zinc-700" />
//               <span>🎯 MCQ + MSQ mix</span>
//               <span className="w-px h-3 bg-zinc-700" />
//               <span>🏆 {totalPoints} pts total</span>
//               {!isPro && questionCount > FREE_LIMIT && (
//                 <>
//                   <span className="w-px h-3 bg-zinc-700" />
//                   <span className="text-violet-400">⚡ Pro required</span>
//                 </>
//               )}
//             </div>

//             {/* Error */}
//             {error && (
//               <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
//                   <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
//                 </svg>
//                 {error}
//               </div>
//             )}

//             {/* CTA */}
//             <button
//               onClick={handleSubmit}
//               disabled={loading || (!isPro && questionCount > FREE_LIMIT)}
//               className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-base tracking-wide transition-all disabled:opacity-60 disabled:cursor-not-allowed group"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-3">
//                   <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
//                   </svg>
//                   {progress}
//                 </span>
//               ) : (
//                 <span className="flex items-center justify-center gap-2">
//                   {!isPro && questionCount > FREE_LIMIT ? "Upgrade to Generate" : `Generate ${questionCount} Question Quiz`}
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform">
//                     <path d="M5 12h14M12 5l7 7-7 7"/>
//                   </svg>
//                 </span>
//               )}
//             </button>
//           </div>

//           {/* Features */}
//           <div className="grid grid-cols-3 gap-4 mt-8">
//             {[
//               { icon: "🔗", title: "Any Link", desc: "YouTube, Wikipedia, articles" },
//               { icon: "📄", title: "PDF Upload", desc: "Notes, textbooks, docs" },
//               { icon: "🏆", title: "Scored Results", desc: "Points, grades & explanations" },
//             ].map((f) => (
//               <div key={f.title} className="text-center">
//                 <div className="text-2xl mb-2">{f.icon}</div>
//                 <div className="text-xs font-semibold text-zinc-300">{f.title}</div>
//                 <div className="text-xs text-zinc-600 mt-0.5">{f.desc}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }













































// "use client";
// import { useState, useRef, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { loadStripe } from "@stripe/stripe-js";
// import { Difficulty } from "@/types";

// // Initialize Stripe
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// const EXAMPLE_LINKS = [
//   { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Artificial_intelligence", icon: "📖" },
//   { label: "YouTube", url: "https://www.youtube.com/watch?v=aircAruvnKk", icon: "▶️" },
//   { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Black_hole", icon: "🌑" },
// ];

// const DIFFICULTY_CONFIG: {
//   key: Difficulty;
//   label: string;
//   desc: string;
//   color: string;
//   points: string;
// }[] = [
//   { key: "basic", label: "Basic", desc: "Recall & definitions", color: "emerald", points: "5 pts/q" },
//   { key: "intermediate", label: "Intermediate", desc: "Apply & connect concepts", color: "amber", points: "10 pts/q" },
//   { key: "advanced", label: "Advanced", desc: "Analyze & synthesize", color: "rose", points: "15 pts/q" },
// ];

// const FREE_LIMIT = 5;
// const MAX_QUESTIONS = 20;
// const PRO_PRICE = 15;

// function UpgradeModal({ onClose, onSubscribe }: { onClose: () => void; onSubscribe: () => void }) {
//   const [loading, setLoading] = useState(false);

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
//       <div className="relative w-full max-w-[90vw] sm:max-w-md rounded-2xl border border-violet-500/30 bg-[#0e0e1a] p-5 sm:p-8 shadow-2xl shadow-violet-900/30">
//         <div className="absolute -top-px left-1/2 -translate-x-1/2 w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

//         <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
//           <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-2xl sm:text-3xl shadow-lg shadow-violet-900/50">
//             ⚡
//           </div>
//           <div>
//             <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">Unlock Pro Features</h2>
//             <p className="text-zinc-400 text-xs sm:text-sm mt-2 leading-relaxed">
//               Get unlimited quizzes, PDF uploads, and advanced AI processing
//             </p>
//           </div>

//           <div className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 sm:p-4 space-y-2 text-sm text-left">
//             {[
//               ["✅", "Up to 20 questions per quiz"],
//               ["✅", "PDF + URL support"],
//               ["✅", "All difficulty levels"],
//               ["✅", "Priority AI processing"],
//               ["✅", "Export quizzes as PDF"],
//               ["✅", "Detailed analytics"],
//             ].map(([icon, text]) => (
//               <div key={text} className="flex items-center gap-2 sm:gap-3 text-zinc-300 text-xs sm:text-sm">
//                 <span>{icon}</span>
//                 <span>{text}</span>
//               </div>
//             ))}
//           </div>

//           <div className="text-center">
//             <div className="text-2xl sm:text-3xl font-bold text-white">${PRO_PRICE}</div>
//             <div className="text-xs text-zinc-500">per month</div>
//           </div>

//           <button
//             onClick={onSubscribe}
//             disabled={loading}
//             className="w-full py-2.5 sm:py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-violet-900/40 disabled:opacity-50"
//           >
//             {loading ? "Processing..." : "Subscribe Now →"}
//           </button>
//           <button onClick={onClose} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
//             Maybe later
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function HomePage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [tab, setTab] = useState<"url" | "pdf">("url");
//   const [url, setUrl] = useState("");
//   const [pdfFile, setPdfFile] = useState<File | null>(null);
//   const [pdfDrag, setPdfDrag] = useState(false);
//   const [difficulty, setDifficulty] = useState<Difficulty>("intermediate");
//   const [questionCount, setQuestionCount] = useState(4);
//   const [showUpgrade, setShowUpgrade] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [progress, setProgress] = useState("");
//   const [isPro, setIsPro] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const fileRef = useRef<HTMLInputElement>(null);

//   // Check subscription status
//   const checkSubscriptionStatus = async () => {
//     try {
//       const res = await fetch("/api/subscription/status");
//       const data = await res.json();
//       setIsPro(data.isPro);
//       if (data.isPro) {
//         localStorage.setItem("isPro", "true");
//       }
//     } catch {
//       const proStatus = localStorage.getItem("isPro");
//       setIsPro(proStatus === "true");
//     }
//   };

//   // Check URL params for payment success/cancel
//   useEffect(() => {
//     const success = searchParams.get("success");
//     const canceled = searchParams.get("canceled");
    
//     if (success === "true") {
//       setShowSuccess(true);
//       checkSubscriptionStatus();
//       const newUrl = window.location.pathname;
//       window.history.replaceState({}, "", newUrl);
//       setTimeout(() => setShowSuccess(false), 5000);
//     }
    
//     if (canceled === "true") {
//       setError("Payment was cancelled. You can try again anytime.");
//       const newUrl = window.location.pathname;
//       window.history.replaceState({}, "", newUrl);
//       setTimeout(() => setError(""), 5000);
//     }
//   }, [searchParams]);

//   // Check subscription on mount
//   useEffect(() => {
//     checkSubscriptionStatus();
//   }, []);

//   const handleSubscribe = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("/api/create-checkout", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           priceId: "price_pro_monthly",
//           successUrl: `${window.location.origin}/?success=true`,
//           cancelUrl: `${window.location.origin}/?canceled=true`,
//         }),
//       });

//       const { url } = await response.json();
//       window.location.href = url;
//     } catch (error) {
//       console.error("Error:", error);
//       setError("Failed to initiate checkout. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileChange = (file: File | null) => {
//     if (!file) return;
//     if (file.type !== "application/pdf") { setError("Only PDF files are supported."); return; }
//     if (file.size > 10 * 1024 * 1024) { setError("PDF must be under 10MB."); return; }
//     setError("");
//     setPdfFile(file);
//   };

//   const handleQuestionCountChange = (val: number) => {
//     if (!isPro && val > FREE_LIMIT) { 
//       setShowUpgrade(true); 
//       return; 
//     }
//     setQuestionCount(val);
//   };

//   const handleSubmit = async () => {
//     if (tab === "url" && !url.trim()) { setError("Please enter a valid URL"); return; }
//     if (tab === "pdf" && !pdfFile) { setError("Please upload a PDF file"); return; }
    
//     if (!isPro && questionCount > FREE_LIMIT) {
//       setShowUpgrade(true);
//       return;
//     }
    
//     setError("");
//     setLoading(true);
//     setProgress("Fetching content...");

//     try {
//       setTimeout(() => setProgress("Analyzing with AI..."), 1500);
//       setTimeout(() => setProgress("Crafting questions..."), 3500);

//       let res: Response;

//       if (tab === "pdf" && pdfFile) {
//         const formData = new FormData();
//         formData.append("pdf", pdfFile);
//         formData.append("difficulty", difficulty);
//         formData.append("questionCount", String(questionCount));
//         res = await fetch("/api/analyze", { method: "POST", body: formData });
//       } else {
//         res = await fetch("/api/analyze", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ url: url.trim(), difficulty, questionCount }),
//         });
//       }

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to generate quiz");

//       sessionStorage.setItem("quizSession", JSON.stringify(data.session));
//       router.push("/quiz");
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//       setLoading(false);
//     }
//   };

//   const totalPoints = (() => {
//     const pts = { basic: 5, intermediate: 10, advanced: 15 };
//     return pts[difficulty] * questionCount;
//   })();

//   return (
//     <>
//       {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} onSubscribe={handleSubscribe} />}

//       {/* Success Toast - Responsive */}
//       {showSuccess && (
//         <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top fade-in duration-300 w-[90vw] sm:w-auto">
//           <div className="bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded-xl px-4 sm:px-6 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3 shadow-xl">
//             <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
//               <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5">
//                 <polyline points="20 6 9 17 4 12"/>
//               </svg>
//             </div>
//             <div>
//               <p className="font-semibold text-emerald-400 text-sm sm:text-base">Payment Successful!</p>
//               <p className="text-xs text-emerald-300/80 hidden xs:block">You are now a Pro member!</p>
//             </div>
//           </div>
//         </div>
//       )}

//       <main className="min-h-screen bg-[#080810] text-white overflow-hidden relative">
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />
//         <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_60%,#080810_100%)]" />
//         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg5OSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

//         <div className="relative z-10 max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-20">
//           <div className="max-w-2xl mx-auto">
//             {/* Header - Fully Responsive */}
//             <div className="text-center mb-8 sm:mb-12 md:mb-16">
//               <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-[10px] sm:text-sm font-medium mb-6 sm:mb-8 tracking-wide">
//                 <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
//                 <span className="hidden xs:inline">{isPro ? "⚡ PRO PLAN ACTIVE" : "AI-POWERED QUIZ ENGINE"}</span>
//                 <span className="xs:hidden">{isPro ? "PRO" : "AI QUIZ"}</span>
//               </div>
//               <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-tight sm:leading-none mb-3 sm:mb-4">
//                 <span className="text-white">Learn</span>
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400"> Deeper</span>
//               </h1>
//               <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed px-2">
//                 Paste any link or upload a PDF.<br className="hidden xs:block" />
//                 We generate a quiz that tests your understanding.
//               </p>
//               {!isPro && (
//                 <div className="mt-3 sm:mt-4 inline-flex flex-wrap items-center justify-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-violet-500/20 text-violet-400 text-[10px] sm:text-xs">
//                   <span>⚡</span>
//                   <span>Free: {FREE_LIMIT} questions</span>
//                   <span className="hidden xs:inline">|</span>
//                   <span>Pro: ${PRO_PRICE}/month</span>
//                 </div>
//               )}
//             </div>

//             {/* Main Card - Responsive */}
//             <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-7">
              
//               {/* Tab switcher - Responsive */}
//               <div className="flex gap-1 p-1 bg-white/[0.04] rounded-xl border border-white/[0.06]">
//                 <button
//                   onClick={() => { setTab("url"); setError(""); }}
//                   className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
//                     tab === "url" ? "bg-indigo-600 text-white" : "text-zinc-500 hover:text-zinc-300"
//                   }`}
//                 >
//                   <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
//                     <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
//                   </svg>
//                   <span className="hidden xs:inline">URL / Link</span>
//                   <span className="xs:hidden">URL</span>
//                 </button>
//                 <button
//                   onClick={() => { setTab("pdf"); setError(""); }}
//                   className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
//                     tab === "pdf" ? "bg-indigo-600 text-white" : "text-zinc-500 hover:text-zinc-300"
//                   }`}
//                 >
//                   <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                     <polyline points="14 2 14 8 20 8"/>
//                     <line x1="16" y1="13" x2="8" y2="13"/>
//                     <line x1="16" y1="17" x2="8" y2="17"/>
//                   </svg>
//                   <span className="hidden xs:inline">PDF Upload</span>
//                   <span className="xs:hidden">PDF</span>
//                 </button>
//               </div>

//               {/* URL Input - Responsive */}
//               {tab === "url" && (
//                 <div>
//                   <label className="block text-[10px] sm:text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2 sm:mb-3">Source URL</label>
//                   <div className="relative">
//                     <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-zinc-500">
//                       <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                         <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
//                         <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
//                       </svg>
//                     </span>
//                     <input
//                       type="url"
//                       value={url}
//                       onChange={(e) => { setUrl(e.target.value); setError(""); }}
//                       onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//                       placeholder="https://en.wikipedia.org/wiki/..."
//                       className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3.5 text-white placeholder-zinc-600 text-xs sm:text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
//                     />
//                   </div>
//                   <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
//                     {EXAMPLE_LINKS.map((ex) => (
//                       <button
//                         key={ex.url}
//                         onClick={() => setUrl(ex.url)}
//                         className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-zinc-500 hover:text-zinc-300 hover:border-white/[0.12] transition-all"
//                       >
//                         {ex.icon} Try {ex.label}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* PDF Upload - Responsive */}
//               {tab === "pdf" && (
//                 <div>
//                   <label className="block text-[10px] sm:text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2 sm:mb-3">Upload PDF</label>
//                   <div
//                     onClick={() => fileRef.current?.click()}
//                     onDragOver={(e) => { e.preventDefault(); setPdfDrag(true); }}
//                     onDragLeave={() => setPdfDrag(false)}
//                     onDrop={(e) => { e.preventDefault(); setPdfDrag(false); handleFileChange(e.dataTransfer.files[0] ?? null); }}
//                     className={`relative flex flex-col items-center justify-center gap-2 sm:gap-3 p-6 sm:p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
//                       pdfDrag ? "border-indigo-500/70 bg-indigo-500/10"
//                       : pdfFile ? "border-emerald-500/50 bg-emerald-500/[0.05]"
//                       : "border-white/[0.10] hover:border-white/[0.20] bg-white/[0.02]"
//                     }`}
//                   >
//                     <input ref={fileRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)} />
//                     {pdfFile ? (
//                       <>
//                         <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
//                           <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
//                             <polyline points="20 6 9 17 4 12"/>
//                           </svg>
//                         </div>
//                         <div className="text-center">
//                           <p className="text-xs sm:text-sm font-semibold text-emerald-400 truncate max-w-[200px] sm:max-w-none">{pdfFile.name}</p>
//                           <p className="text-[10px] sm:text-xs text-zinc-500 mt-1">{(pdfFile.size / 1024).toFixed(1)} KB — click to change</p>
//                         </div>
//                       </>
//                     ) : (
//                       <>
//                         <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/[0.05] flex items-center justify-center">
//                           <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
//                             <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                             <polyline points="14 2 14 8 20 8"/>
//                             <line x1="12" y1="18" x2="12" y2="12"/>
//                             <line x1="9" y1="15" x2="15" y2="15"/>
//                           </svg>
//                         </div>
//                         <div className="text-center">
//                           <p className="text-xs sm:text-sm font-semibold text-zinc-300">Drop your PDF here</p>
//                           <p className="text-[10px] sm:text-xs text-zinc-600 mt-1">or click to browse — max 10MB</p>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Question Count - Responsive */}
//               <div>
//                 <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 mb-2 sm:mb-3">
//                   <label className="text-[10px] sm:text-xs font-semibold text-zinc-400 uppercase tracking-widest">
//                     Number of Questions
//                   </label>
//                   <div className="flex items-center gap-2">
//                     <span className="text-xs font-mono font-bold text-indigo-400">{questionCount} questions</span>
//                     <span className="text-xs text-zinc-600">·</span>
//                     <span className="text-xs font-mono font-bold text-zinc-500">{totalPoints} pts total</span>
//                   </div>
//                 </div>

//                 <div className="relative overflow-x-auto pb-2 sm:overflow-visible">
//                   <div className="flex gap-1 min-w-max sm:min-w-0">
//                     {Array.from({ length: MAX_QUESTIONS }, (_, i) => i + 1).map((n) => {
//                       const isSelected = n <= questionCount;
//                       const isAvailable = isPro || n <= FREE_LIMIT;
//                       return (
//                         <button
//                           key={n}
//                           onClick={() => isAvailable && handleQuestionCountChange(n)}
//                           disabled={!isAvailable}
//                           className={`relative w-7 h-7 sm:w-auto sm:flex-1 sm:h-8 rounded-md transition-all group ${
//                             isSelected && isAvailable
//                               ? "bg-indigo-500"
//                               : isSelected && !isAvailable
//                               ? "bg-violet-600"
//                               : isAvailable
//                               ? "bg-white/[0.07] hover:bg-white/[0.14]"
//                               : "bg-white/[0.04] cursor-not-allowed"
//                           }`}
//                         >
//                           {!isAvailable && (
//                             <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                               <svg className="w-1.5 h-1.5 sm:w-2 sm:h-2" viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.8)" strokeWidth="3">
//                                 <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
//                                 <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
//                               </svg>
//                             </span>
//                           )}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 <div className="flex flex-col xs:flex-row justify-between gap-1 mt-2">
//                   <div className="flex items-center gap-1.5">
//                     <span className="w-2 h-2 rounded-sm bg-indigo-500" />
//                     <span className="text-[9px] sm:text-[10px] text-zinc-500">Free (1–{FREE_LIMIT})</span>
//                   </div>
//                   <div className="flex items-center gap-1.5">
//                     <span className="w-2 h-2 rounded-sm bg-violet-600" />
//                     <span className="text-[9px] sm:text-[10px] text-zinc-500">Pro ({FREE_LIMIT + 1}–{MAX_QUESTIONS})</span>
//                     {!isPro && (
//                       <button
//                         onClick={() => setShowUpgrade(true)}
//                         className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-400 font-semibold border border-violet-500/30 hover:bg-violet-500/30 transition-all"
//                       >
//                         ⚡ Upgrade
//                       </button>
//                     )}
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-center gap-3 sm:gap-4 mt-3 sm:mt-4">
//                   <button
//                     onClick={() => handleQuestionCountChange(Math.max(1, questionCount - 1))}
//                     className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] text-zinc-300 hover:bg-white/[0.10] transition-all flex items-center justify-center text-base sm:text-lg font-bold"
//                   >
//                     −
//                   </button>
//                   <span className="text-xl sm:text-2xl font-black text-white w-10 sm:w-12 text-center tabular-nums">{questionCount}</span>
//                   <button
//                     onClick={() => handleQuestionCountChange(Math.min(MAX_QUESTIONS, questionCount + 1))}
//                     className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg border transition-all flex items-center justify-center text-base sm:text-lg font-bold ${
//                       questionCount >= FREE_LIMIT && !isPro
//                         ? "bg-violet-500/10 border-violet-500/30 text-violet-400 hover:bg-violet-500/20"
//                         : "bg-white/[0.05] border-white/[0.08] text-zinc-300 hover:bg-white/[0.10]"
//                     }`}
//                   >
//                     {questionCount >= FREE_LIMIT && !isPro ? "⚡" : "+"}
//                   </button>
//                 </div>
//               </div>

//               {/* Difficulty - Responsive Grid */}
//               <div>
//                 <label className="block text-[10px] sm:text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2 sm:mb-3">Difficulty Level</label>
//                 <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 sm:gap-3">
//                   {DIFFICULTY_CONFIG.map((d) => (
//                     <button
//                       key={d.key}
//                       onClick={() => setDifficulty(d.key)}
//                       className={`relative p-3 sm:p-4 rounded-xl border text-left transition-all ${
//                         difficulty === d.key
//                           ? d.key === "basic" ? "border-emerald-500/50 bg-emerald-500/10"
//                             : d.key === "intermediate" ? "border-amber-500/50 bg-amber-500/10"
//                             : "border-rose-500/50 bg-rose-500/10"
//                           : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
//                       }`}
//                     >
//                       <div className={`text-sm font-bold mb-0.5 sm:mb-1 ${
//                         difficulty === d.key
//                           ? d.key === "basic" ? "text-emerald-400"
//                             : d.key === "intermediate" ? "text-amber-400"
//                             : "text-rose-400"
//                           : "text-white"
//                       }`}>
//                         {d.label}
//                       </div>
//                       <div className="text-[10px] sm:text-xs text-zinc-500 leading-tight">{d.desc}</div>
//                       <div className={`text-[10px] sm:text-xs mt-1.5 sm:mt-2 font-mono font-bold ${
//                         difficulty === d.key
//                           ? d.key === "basic" ? "text-emerald-500"
//                             : d.key === "intermediate" ? "text-amber-500"
//                             : "text-rose-500"
//                           : "text-zinc-600"
//                       }`}>
//                         {d.points}
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Info bar - Responsive */}
//               <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-zinc-600 bg-white/[0.02] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 border border-white/[0.04]">
//                 <span className="flex items-center gap-1">📝 {questionCount} questions</span>
//                 <span className="hidden xs:inline w-px h-3 bg-zinc-700" />
//                 <span className="flex items-center gap-1">🎯 MCQ + MSQ mix</span>
//                 <span className="hidden xs:inline w-px h-3 bg-zinc-700" />
//                 <span className="flex items-center gap-1">🏆 {totalPoints} pts total</span>
//                 {!isPro && questionCount > FREE_LIMIT && (
//                   <>
//                     <span className="hidden xs:inline w-px h-3 bg-zinc-700" />
//                     <span className="text-violet-400">⚡ Pro required</span>
//                   </>
//                 )}
//               </div>

//               {/* Error - Responsive */}
//               {error && (
//                 <div className="flex items-start gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs sm:text-sm">
//                   <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
//                   </svg>
//                   <span>{error}</span>
//                 </div>
//               )}

//               {/* CTA Button - Responsive */}
//               <button
//                 onClick={handleSubmit}
//                 disabled={loading || (!isPro && questionCount > FREE_LIMIT)}
//                 className="w-full py-3 sm:py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm sm:text-base tracking-wide transition-all disabled:opacity-60 disabled:cursor-not-allowed group"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <svg className="animate-spin w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
//                     </svg>
//                     <span className="text-xs sm:text-sm">{progress}</span>
//                   </span>
//                 ) : (
//                   <span className="flex items-center justify-center gap-2 text-xs sm:text-sm">
//                     {!isPro && questionCount > FREE_LIMIT ? "Upgrade to Generate" : `Generate ${questionCount} Question Quiz`}
//                     <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//                       <path d="M5 12h14M12 5l7 7-7 7"/>
//                     </svg>
//                   </span>
//                 )}
//               </button>
//             </div>

//             {/* Features - Responsive Grid */}
//             <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 sm:mt-8">
//               {[
//                 { icon: "🔗", title: "Any Link", desc: "YouTube, Wikipedia, articles" },
//                 { icon: "📄", title: "PDF Upload", desc: "Notes, textbooks, docs" },
//                 { icon: "🏆", title: "Scored Results", desc: "Points, grades & explanations" },
//               ].map((f) => (
//                 <div key={f.title} className="text-center">
//                   <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{f.icon}</div>
//                   <div className="text-[10px] sm:text-xs font-semibold text-zinc-300 truncate">{f.title}</div>
//                   <div className="hidden xs:block text-[9px] sm:text-xs text-zinc-600 mt-0.5 sm:mt-1">{f.desc}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }































// "use client";
// import { useState, useRef, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Difficulty } from "@/types";

// const EXAMPLE_LINKS = [
//   { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Artificial_intelligence", icon: "📖" },
//   { label: "YouTube", url: "https://www.youtube.com/watch?v=aircAruvnKk", icon: "▶️" },
//   { label: "Black Hole", url: "https://en.wikipedia.org/wiki/Black_hole", icon: "🌑" },
// ];

// const DIFFICULTY_CONFIG: {
//   key: Difficulty;
//   label: string;
//   desc: string;
//   points: string;
// }[] = [
//   { key: "basic", label: "Basic", desc: "Recall & definitions", points: "5 pts/q" },
//   { key: "intermediate", label: "Intermediate", desc: "Apply & connect", points: "10 pts/q" },
//   { key: "advanced", label: "Advanced", desc: "Analyze & synthesize", points: "15 pts/q" },
// ];

// const FREE_LIMIT = 5;
// const MAX_QUESTIONS = 70;
// const PRO_PRICE = 15;

// function UpgradeModal({ onClose, onSubscribe }: { onClose: () => void; onSubscribe: () => void }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
//       <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
//       <div className="relative w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl border border-violet-500/30 bg-[#0e0e1a] p-6 sm:p-8 shadow-2xl shadow-violet-900/30">
//         <div className="w-10 h-1 rounded-full bg-white/10 mx-auto mb-6 sm:hidden" />
//         <div className="absolute -top-px left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent hidden sm:block" />

//         <div className="flex flex-col items-center text-center gap-4">
//           <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-2xl sm:text-3xl shadow-lg shadow-violet-900/50">
//             ⚡
//           </div>
//           <div>
//             <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">Unlock Pro Features</h2>
//             <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
//               Get unlimited quizzes, PDF uploads, and advanced AI processing
//             </p>
//           </div>

//           <div className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 space-y-2 text-sm text-left">
//             {[
//               ["✅", "Up to 20 questions per quiz"],
//               ["✅", "PDF + URL support"],
//               ["✅", "All difficulty levels"],
//               ["✅", "Priority AI processing"],
//               ["✅", "Export quizzes as PDF"],
//               ["✅", "Detailed analytics"],
//             ].map(([icon, text]) => (
//               <div key={text} className="flex items-center gap-3 text-zinc-300">
//                 <span>{icon}</span>
//                 <span>{text}</span>
//               </div>
//             ))}
//           </div>

//           <div className="text-center">
//             <div className="text-3xl font-bold text-white">${PRO_PRICE}</div>
//             <div className="text-xs text-zinc-500">per month</div>
//           </div>

//           <button
//             onClick={onSubscribe}
//             className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-violet-900/40"
//           >
//             Subscribe Now →
//           </button>
//           <button onClick={onClose} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors pb-1">
//             Maybe later
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function HomePage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [tab, setTab] = useState<"url" | "pdf">("url");
//   const [url, setUrl] = useState("");
//   const [pdfFile, setPdfFile] = useState<File | null>(null);
//   const [pdfDrag, setPdfDrag] = useState(false);
//   const [difficulty, setDifficulty] = useState<Difficulty>("intermediate");
//   const [questionCount, setQuestionCount] = useState(4);
//   const [showUpgrade, setShowUpgrade] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [progress, setProgress] = useState("");
//   const [isPro, setIsPro] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const fileRef = useRef<HTMLInputElement>(null);

//   const checkSubscriptionStatus = async () => {
//     try {
//       const res = await fetch("/api/subscription/status");
//       const data = await res.json();
//       setIsPro(data.isPro);
//       if (data.isPro) localStorage.setItem("isPro", "true");
//     } catch {
//       setIsPro(localStorage.getItem("isPro") === "true");
//     }
//   };

//   useEffect(() => {
//     const success = searchParams.get("success");
//     const canceled = searchParams.get("canceled");
//     if (success === "true") {
//       setShowSuccess(true);
//       checkSubscriptionStatus();
//       window.history.replaceState({}, "", window.location.pathname);
//       setTimeout(() => setShowSuccess(false), 5000);
//     }
//     if (canceled === "true") {
//       setError("Payment was cancelled.");
//       window.history.replaceState({}, "", window.location.pathname);
//       setTimeout(() => setError(""), 4000);
//     }
//   }, [searchParams]);

//   useEffect(() => { checkSubscriptionStatus(); }, []);

//   const handleSubscribe = async () => {
//     try {
//       const response = await fetch("/api/create-checkout", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           priceId: "price_pro_monthly",
//           successUrl: `${window.location.origin}/?success=true`,
//           cancelUrl: `${window.location.origin}/?canceled=true`,
//         }),
//       });
//       const { url: checkoutUrl } = await response.json();
//       window.location.href = checkoutUrl;
//     } catch {
//       setError("Failed to initiate checkout. Please try again.");
//     }
//   };

//   const handleFileChange = (file: File | null) => {
//     if (!file) return;
//     if (file.type !== "application/pdf") { setError("Only PDF files are supported."); return; }
//     if (file.size > 10 * 1024 * 1024) { setError("PDF must be under 10MB."); return; }
//     setError("");
//     setPdfFile(file);
//   };

//   const handleQuestionCountChange = (val: number) => {
//     if (!isPro && val > FREE_LIMIT) { setShowUpgrade(true); return; }
//     setQuestionCount(Math.min(MAX_QUESTIONS, Math.max(1, val)));
//   };

//   const handleSubmit = async () => {
//     if (tab === "url" && !url.trim()) { setError("Please enter a valid URL"); return; }
//     if (tab === "pdf" && !pdfFile) { setError("Please upload a PDF file"); return; }
//     if (!isPro && questionCount > FREE_LIMIT) { setShowUpgrade(true); return; }

//     setError("");
//     setLoading(true);
//     setProgress("Fetching content...");

//     try {
//       setTimeout(() => setProgress("Analyzing with AI..."), 1500);
//       setTimeout(() => setProgress("Crafting questions..."), 3500);

//       let res: Response;
//       if (tab === "pdf" && pdfFile) {
//         const formData = new FormData();
//         formData.append("pdf", pdfFile);
//         formData.append("difficulty", difficulty);
//         formData.append("questionCount", String(questionCount));
//         res = await fetch("/api/analyze", { method: "POST", body: formData });
//       } else {
//         res = await fetch("/api/analyze", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ url: url.trim(), difficulty, questionCount }),
//         });
//       }

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to generate quiz");
//       sessionStorage.setItem("quizSession", JSON.stringify(data.session));
//       router.push("/quiz");
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//       setLoading(false);
//     }
//   };

//   const totalPoints = { basic: 5, intermediate: 10, advanced: 15 }[difficulty] * questionCount;

//   return (
//     <>
//       {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} onSubscribe={handleSubscribe} />}

//       {/* Success Toast */}
//       {showSuccess && (
//         <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90vw] sm:w-auto">
//           <div className="bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded-xl px-4 sm:px-6 py-3 flex items-center gap-3 shadow-xl">
//             <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5">
//                 <polyline points="20 6 9 17 4 12"/>
//               </svg>
//             </div>
//             <div>
//               <p className="font-semibold text-emerald-400 text-sm">Payment Successful!</p>
//               <p className="text-xs text-emerald-300/80">You are now a Pro member!</p>
//             </div>
//           </div>
//         </div>
//       )}

//       <main className="min-h-screen bg-[#080810] text-white overflow-x-hidden relative">
//         {/* Background */}
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />
//         <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_60%,#080810_100%)]" />
//         <div className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg5OSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]" />

//         <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-20">

//           {/* Header */}
//           <div className="text-center mb-8 sm:mb-12 lg:mb-16">
//             <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs sm:text-sm font-medium mb-5 sm:mb-8 tracking-wide">
//               <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse shrink-0" />
//               {isPro ? "⚡ PRO PLAN ACTIVE" : "AI-POWERED QUIZ ENGINE"}
//             </div>

//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-none mb-3 sm:mb-4">
//               <span className="text-white">Learn</span>
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400"> Deeper</span>
//             </h1>

//             <p className="text-zinc-400 text-sm sm:text-base lg:text-lg leading-relaxed px-2">
//               Paste any link or upload a PDF.{" "}
//               <span className="hidden sm:inline"><br /></span>
//               We generate a quiz that tests your understanding.
//             </p>

//             {!isPro && (
//               <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-400 text-xs">
//                 <span>⚡</span>
//                 <span>Free: {FREE_LIMIT} questions · Pro: ${PRO_PRICE}/mo</span>
//               </div>
//             )}
//           </div>

//           {/* Main Card */}
//           <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 lg:space-y-7">

//             {/* Tab Switcher */}
//             <div className="flex gap-1 p-1 bg-white/[0.04] rounded-xl border border-white/[0.06]">
//               {[
//                 {
//                   key: "url", label: "URL / Link",
//                   icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
//                 },
//                 {
//                   key: "pdf", label: "PDF Upload",
//                   icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
//                 },
//               ].map((t) => (
//                 <button
//                   key={t.key}
//                   onClick={() => { setTab(t.key as "url" | "pdf"); setError(""); }}
//                   className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
//                     tab === t.key ? "bg-indigo-600 text-white" : "text-zinc-500 hover:text-zinc-300"
//                   }`}
//                 >
//                   {t.icon}
//                   <span>{t.label}</span>
//                 </button>
//               ))}
//             </div>

//             {/* URL Input */}
//             {tab === "url" && (
//               <div>
//                 <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2 sm:mb-3">
//                   Source URL
//                 </label>
//                 <div className="relative">
//                   <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-zinc-500">
//                     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
//                       <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
//                     </svg>
//                   </span>
//                   <input
//                     type="url"
//                     value={url}
//                     onChange={(e) => { setUrl(e.target.value); setError(""); }}
//                     onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//                     placeholder="https://en.wikipedia.org/wiki/..."
//                     className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-9 sm:pl-11 pr-4 py-3 sm:py-3.5 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
//                   />
//                 </div>
//                 <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
//                   {EXAMPLE_LINKS.map((ex) => (
//                     <button
//                       key={ex.url}
//                       onClick={() => setUrl(ex.url)}
//                       className="text-xs px-2.5 sm:px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-zinc-500 hover:text-zinc-300 hover:border-white/[0.12] transition-all"
//                     >
//                       {ex.icon} {ex.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* PDF Upload */}
//             {tab === "pdf" && (
//               <div>
//                 <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2 sm:mb-3">
//                   Upload PDF
//                 </label>
//                 <div
//                   onClick={() => fileRef.current?.click()}
//                   onDragOver={(e) => { e.preventDefault(); setPdfDrag(true); }}
//                   onDragLeave={() => setPdfDrag(false)}
//                   onDrop={(e) => { e.preventDefault(); setPdfDrag(false); handleFileChange(e.dataTransfer.files[0] ?? null); }}
//                   className={`flex flex-col items-center justify-center gap-3 p-6 sm:p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
//                     pdfDrag ? "border-indigo-500/70 bg-indigo-500/10"
//                     : pdfFile ? "border-emerald-500/50 bg-emerald-500/[0.05]"
//                     : "border-white/[0.10] hover:border-white/[0.20] bg-white/[0.02]"
//                   }`}
//                 >
//                   <input ref={fileRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)} />
//                   {pdfFile ? (
//                     <>
//                       <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
//                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-sm font-semibold text-emerald-400 truncate max-w-[200px] sm:max-w-xs">{pdfFile.name}</p>
//                         <p className="text-xs text-zinc-500 mt-1">{(pdfFile.size / 1024).toFixed(1)} KB · tap to change</p>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/[0.05] flex items-center justify-center">
//                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
//                           <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//                           <polyline points="14 2 14 8 20 8"/>
//                           <line x1="12" y1="18" x2="12" y2="12"/>
//                           <line x1="9" y1="15" x2="15" y2="15"/>
//                         </svg>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-sm font-semibold text-zinc-300">Drop your PDF here</p>
//                         <p className="text-xs text-zinc-600 mt-1">or tap to browse · max 10MB</p>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Question Count */}
//             <div>
//               <div className="flex items-center justify-between mb-2 sm:mb-3">
//                 <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
//                   Questions
//                 </label>
//                 <div className="flex items-center gap-1.5 sm:gap-2">
//                   <span className="text-xs font-mono font-bold text-indigo-400">{questionCount}q</span>
//                   <span className="text-xs text-zinc-600">·</span>
//                   <span className="text-xs font-mono font-bold text-zinc-500">{totalPoints}pts</span>
//                 </div>
//               </div>

//               {/* Grid bar */}
//               <div className="flex gap-1">
//                 {Array.from({ length: MAX_QUESTIONS }, (_, i) => i + 1).map((n) => {
//                   const isSelected = n <= questionCount;
//                   const isAvailable = isPro || n <= FREE_LIMIT;
//                   return (
//                     <button
//                       key={n}
//                       onClick={() => isAvailable ? handleQuestionCountChange(n) : setShowUpgrade(true)}
//                       className={`relative flex-1 h-6 sm:h-8 rounded transition-all ${
//                         isSelected && isAvailable ? "bg-indigo-500"
//                         : isSelected && !isAvailable ? "bg-violet-600"
//                         : isAvailable ? "bg-white/[0.07] hover:bg-white/[0.14]"
//                         : "bg-white/[0.04] hover:bg-violet-500/20"
//                       }`}
//                     />
//                   );
//                 })}
//               </div>

//               <div className="flex items-center justify-between mt-2">
//                 <div className="flex items-center gap-1.5">
//                   <span className="w-2 h-2 rounded-sm bg-indigo-500" />
//                   <span className="text-[10px] text-zinc-500">Free (1–{FREE_LIMIT})</span>
//                 </div>
//                 <div className="flex items-center gap-1.5">
//                   <span className="w-2 h-2 rounded-sm bg-violet-600" />
//                   <span className="text-[10px] text-zinc-500">Pro (6–{MAX_QUESTIONS})</span>
//                   {!isPro && (
//                     <button
//                       onClick={() => setShowUpgrade(true)}
//                       className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-400 font-semibold border border-violet-500/30 hover:bg-violet-500/30 transition-all"
//                     >
//                       ⚡ Upgrade
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* +/- controls */}
//               <div className="flex items-center justify-center gap-4 mt-3 sm:mt-4">
//                 <button
//                   onClick={() => handleQuestionCountChange(questionCount - 1)}
//                   className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] text-zinc-300 hover:bg-white/[0.10] transition-all flex items-center justify-center text-xl font-bold"
//                 >
//                   −
//                 </button>
//                 <span className="text-2xl sm:text-3xl font-black text-white w-12 text-center tabular-nums">{questionCount}</span>
//                 <button
//                   onClick={() => handleQuestionCountChange(questionCount + 1)}
//                   className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border transition-all flex items-center justify-center text-xl font-bold ${
//                     questionCount >= FREE_LIMIT && !isPro
//                       ? "bg-violet-500/10 border-violet-500/30 text-violet-400 hover:bg-violet-500/20"
//                       : "bg-white/[0.05] border-white/[0.08] text-zinc-300 hover:bg-white/[0.10]"
//                   }`}
//                 >
//                   {questionCount >= FREE_LIMIT && !isPro ? "⚡" : "+"}
//                 </button>
//               </div>
//             </div>

//             {/* Difficulty */}
//             <div>
//               <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2 sm:mb-3">
//                 Difficulty Level
//               </label>
//               <div className="grid grid-cols-3 gap-2 sm:gap-3">
//                 {DIFFICULTY_CONFIG.map((d) => (
//                   <button
//                     key={d.key}
//                     onClick={() => setDifficulty(d.key)}
//                     className={`p-3 sm:p-4 rounded-xl border text-left transition-all ${
//                       difficulty === d.key
//                         ? d.key === "basic" ? "border-emerald-500/50 bg-emerald-500/10"
//                           : d.key === "intermediate" ? "border-amber-500/50 bg-amber-500/10"
//                           : "border-rose-500/50 bg-rose-500/10"
//                         : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
//                     }`}
//                   >
//                     <div className={`text-xs sm:text-sm font-bold mb-0.5 sm:mb-1 ${
//                       difficulty === d.key
//                         ? d.key === "basic" ? "text-emerald-400"
//                           : d.key === "intermediate" ? "text-amber-400"
//                           : "text-rose-400"
//                         : "text-white"
//                     }`}>
//                       {d.label}
//                     </div>
//                     <div className="text-[10px] sm:text-xs text-zinc-500 leading-tight hidden sm:block">{d.desc}</div>
//                     <div className={`text-[10px] sm:text-xs mt-1 sm:mt-2 font-mono font-bold ${
//                       difficulty === d.key
//                         ? d.key === "basic" ? "text-emerald-500"
//                           : d.key === "intermediate" ? "text-amber-500"
//                           : "text-rose-500"
//                         : "text-zinc-600"
//                     }`}>
//                       {d.points}
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Info bar */}
//             <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-600 bg-white/[0.02] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 border border-white/[0.04]">
//               <span>📝 {questionCount} questions</span>
//               <span className="w-px h-3 bg-zinc-700 hidden sm:block" />
//               <span>🎯 MCQ + MSQ</span>
//               <span className="w-px h-3 bg-zinc-700 hidden sm:block" />
//               <span>🏆 {totalPoints} pts</span>
//               {!isPro && questionCount > FREE_LIMIT && (
//                 <span className="text-violet-400">⚡ Pro required</span>
//               )}
//             </div>

//             {/* Error */}
//             {error && (
//               <div className="flex items-start gap-3 px-3 sm:px-4 py-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs sm:text-sm">
//                 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
//                   <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
//                 </svg>
//                 {error}
//               </div>
//             )}

//             {/* CTA Button */}
//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="w-full py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm sm:text-base tracking-wide transition-all disabled:opacity-60 disabled:cursor-not-allowed group"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-2 sm:gap-3">
//                   <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
//                   </svg>
//                   {progress}
//                 </span>
//               ) : (
//                 <span className="flex items-center justify-center gap-2">
//                   {!isPro && questionCount > FREE_LIMIT
//                     ? "⚡ Upgrade to Generate"
//                     : `Generate ${questionCount} Question Quiz`}
//                   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
//                     <path d="M5 12h14M12 5l7 7-7 7"/>
//                   </svg>
//                 </span>
//               )}
//             </button>
//           </div>

//           {/* Features */}
//           <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 sm:mt-8">
//             {[
//               { icon: "🔗", title: "Any Link", desc: "YouTube, Wikipedia, articles" },
//               { icon: "📄", title: "PDF Upload", desc: "Notes, textbooks, docs" },
//               { icon: "🏆", title: "Results", desc: "Points, grades & explanations" },
//             ].map((f) => (
//               <div key={f.title} className="text-center px-1">
//                 <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{f.icon}</div>
//                 <div className="text-xs font-semibold text-zinc-300">{f.title}</div>
//                 <div className="text-[10px] sm:text-xs text-zinc-600 mt-0.5 hidden sm:block">{f.desc}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }















// "use client";
// import { useState, useRef, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useSession, signIn } from "next-auth/react";
// import { Difficulty } from "@/types";
// import { useTokens } from "@/hooks/useTokens";

// const EXAMPLE_LINKS = [
//   { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Artificial_intelligence", icon: "📖" },
//   { label: "YouTube", url: "https://www.youtube.com/watch?v=aircAruvnKk", icon: "▶️" },
//   { label: "Black Hole", url: "https://en.wikipedia.org/wiki/Black_hole", icon: "🌑" },
// ];

// const DIFFICULTY_CONFIG: {
//   key: Difficulty;
//   label: string;
//   desc: string;
//   points: string;
// }[] = [
//   { key: "basic", label: "Basic", desc: "Recall & definitions", points: "5 pts/q" },
//   { key: "intermediate", label: "Intermediate", desc: "Apply & connect", points: "10 pts/q" },
//   { key: "advanced", label: "Advanced", desc: "Analyze & synthesize", points: "15 pts/q" },
// ];

// // ── Token economy constants ──────────────────────────────────────────────────
// const FREE_LIMIT = 5;           // max questions per quiz for free (logged-out) users
// const MAX_QUESTIONS = 70;       // max for token users / pro
// const PAGE_SIZE = 35;           // bars shown per page in the grid
// const PRO_PRICE = 15;
// const QUIZ_TOKEN_COST = 11;     // tokens deducted per quiz generation
// const SIGNUP_TOKENS = 120;      // tokens awarded on first sign-in
// const PRO_TOKENS = 500;         // tokens awarded on Pro purchase
// const PERFECT_BONUS = 10;       // bonus tokens for 100% correct answers
// const COMPLETE_BONUS = 10;      // bonus tokens for answering ALL selected questions
// // ─────────────────────────────────────────────────────────────────────────────

// type UpgradeReason = "no_tokens" | "pro_limit" | "login_required";

// function TokenBadge({ tokens, cost }: { tokens: number; cost: number }) {
//   const low = tokens < cost * 2;
//   const empty = tokens < cost;
//   return (
//     <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${
//       empty
//         ? "border-rose-500/30 bg-rose-500/10 text-rose-300"
//         : low
//         ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
//         : "border-amber-500/20 bg-amber-500/[0.08] text-amber-300"
//     }`}>
//       <span>🪙</span>
//       <span className="font-mono tabular-nums">{tokens}</span>
//       <span className="text-[10px] opacity-60">tokens</span>
//       {empty && <span className="text-rose-400 text-[10px]">· not enough</span>}
//       {!empty && low && <span className="text-amber-500/70 text-[10px]">· low</span>}
//     </div>
//   );
// }

// function UpgradeModal({
//   onClose,
//   onSubscribe,
//   onSignIn,
//   reason,
//   tokens,
// }: {
//   onClose: () => void;
//   onSubscribe: () => void;
//   onSignIn: () => void;
//   reason: UpgradeReason;
//   tokens: number;
// }) {
//   const isLoginRequired = reason === "login_required";
//   const isNoTokens = reason === "no_tokens";

//   return (
//     <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
//       <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
//       <div className="relative w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl border border-violet-500/30 bg-[#0e0e1a] p-6 sm:p-8 shadow-2xl shadow-violet-900/30">
//         <div className="w-10 h-1 rounded-full bg-white/10 mx-auto mb-6 sm:hidden" />
//         <div className="absolute -top-px left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent hidden sm:block" />

//         <div className="flex flex-col items-center text-center gap-4">
//           <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg ${
//             isLoginRequired
//               ? "bg-gradient-to-br from-indigo-600 to-blue-600 shadow-indigo-900/50"
//               : isNoTokens
//               ? "bg-gradient-to-br from-rose-600 to-orange-600 shadow-rose-900/50"
//               : "bg-gradient-to-br from-violet-600 to-indigo-600 shadow-violet-900/50"
//           }`}>
//             {isLoginRequired ? "🔐" : isNoTokens ? "🪙" : "⚡"}
//           </div>

//           <div>
//             <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
//               {isLoginRequired
//                 ? "Sign in to Continue"
//                 : isNoTokens
//                 ? "Not Enough Tokens"
//                 : "Unlock Pro Features"}
//             </h2>
//             <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
//               {isLoginRequired
//                 ? `Create a free account and get 🪙 ${SIGNUP_TOKENS} tokens instantly. Each quiz costs only ${QUIZ_TOKEN_COST} tokens.`
//                 : isNoTokens
//                 ? `You have 🪙 ${tokens} tokens but need ${QUIZ_TOKEN_COST}. Upgrade to Pro for 🪙 ${PRO_TOKENS} tokens instantly.`
//                 : `Get ${PRO_TOKENS} tokens, up to ${MAX_QUESTIONS} questions per quiz, and advanced AI processing.`}
//             </p>
//           </div>

//           {/* Features list */}
//           <div className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 space-y-2 text-sm text-left">
//             {isLoginRequired ? [
//               ["🪙", `${SIGNUP_TOKENS} free tokens on signup`],
//               ["📝", `Up to ${FREE_LIMIT} questions per quiz`],
//               ["🔗", "URL & PDF support"],
//               ["🏆", `Win +${PERFECT_BONUS} bonus tokens for perfect score`],
//               ["✅", `+${COMPLETE_BONUS} tokens for answering all questions`],
//             ] : [
//               ["⚡", `${PRO_TOKENS} tokens on upgrade`],
//               ["📝", `Up to ${MAX_QUESTIONS} questions per quiz`],
//               ["🏆", `Win +${PERFECT_BONUS} bonus tokens for perfect score`],
//               ["✅", `+${COMPLETE_BONUS} tokens for answering all questions`],
//               ["📄", "PDF + URL support"],
//               ["🚀", "Priority AI processing"],
//               ["📊", "Export & analytics"],
//             ].map(([icon, text]) => (
//               <div key={String(text)} className="flex items-center gap-3 text-zinc-300">
//                 <span>{icon}</span>
//                 <span>{text}</span>
//               </div>
//             ))}
//           </div>

//           {isLoginRequired ? (
//             <>
//               <button
//                 onClick={onSignIn}
//                 className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-indigo-900/40"
//               >
//                 Sign in with Google — Free →
//               </button>
//               <button onClick={onClose} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors pb-1">
//                 Maybe later
//               </button>
//             </>
//           ) : (
//             <>
//               <div className="text-center">
//                 <div className="text-3xl font-bold text-white">${PRO_PRICE}</div>
//                 <div className="text-xs text-zinc-500">per month · includes 🪙 {PRO_TOKENS} tokens</div>
//               </div>
//               <button
//                 onClick={onSubscribe}
//                 className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-violet-900/40"
//               >
//                 Upgrade to Pro →
//               </button>
//               <button onClick={onClose} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors pb-1">
//                 Maybe later
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function HomePage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const { data: session } = useSession();
//   const { tokens, deductTokens, addTokens, refetch: refetchTokens } = useTokens();

//   const [tab, setTab] = useState<"url" | "pdf">("url");
//   const [url, setUrl] = useState("");
//   const [pdfFile, setPdfFile] = useState<File | null>(null);
//   const [pdfDrag, setPdfDrag] = useState(false);
//   const [difficulty, setDifficulty] = useState<Difficulty>("intermediate");
//   const [questionCount, setQuestionCount] = useState(4);
//   const [currentPage, setCurrentPage] = useState(0); // 0 = slots 1–35, 1 = slots 36–70
//   const [showUpgrade, setShowUpgrade] = useState(false);
//   const [upgradeReason, setUpgradeReason] = useState<UpgradeReason>("login_required");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [progress, setProgress] = useState("");
//   const [isPro, setIsPro] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   const fileRef = useRef<HTMLInputElement>(null);

//   const isLoggedIn = !!session;
//   const effectiveMax = isLoggedIn ? MAX_QUESTIONS : FREE_LIMIT;

//   const checkSubscriptionStatus = async () => {
//     try {
//       const res = await fetch("/api/subscription/status");
//       const data = await res.json();
//       setIsPro(data.isPro);
//       if (data.isPro) localStorage.setItem("isPro", "true");
//     } catch {
//       setIsPro(localStorage.getItem("isPro") === "true");
//     }
//   };

//   useEffect(() => {
//     const success = searchParams.get("success");
//     const canceled = searchParams.get("canceled");
//     if (success === "true") {
//       setShowSuccess(true);
//       checkSubscriptionStatus();
//       // Award Pro tokens
//       addTokens(PRO_TOKENS);
//       window.history.replaceState({}, "", window.location.pathname);
//       setTimeout(() => setShowSuccess(false), 5000);
//     }
//     if (canceled === "true") {
//       setError("Payment was cancelled.");
//       window.history.replaceState({}, "", window.location.pathname);
//       setTimeout(() => setError(""), 4000);
//     }
//   }, [searchParams]);

//   useEffect(() => { checkSubscriptionStatus(); }, []);

//   const handleSubscribe = async () => {
//     try {
//       const response = await fetch("/api/create-checkout", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           priceId: "price_pro_monthly",
//           successUrl: `${window.location.origin}/?success=true`,
//           cancelUrl: `${window.location.origin}/?canceled=true`,
//         }),
//       });
//       const { url: checkoutUrl } = await response.json();
//       window.location.href = checkoutUrl;
//     } catch {
//       setError("Failed to initiate checkout. Please try again.");
//     }
//   };

//   const handleFileChange = (file: File | null) => {
//     if (!file) return;
//     if (file.type !== "application/pdf") { setError("Only PDF files are supported."); return; }
//     if (file.size > 10 * 1024 * 1024) { setError("PDF must be under 10MB."); return; }
//     setError("");
//     setPdfFile(file);
//   };

//   const openUpgrade = (reason: UpgradeReason) => {
//     setUpgradeReason(reason);
//     setShowUpgrade(true);
//   };

//   const handleQuestionCountChange = (val: number) => {
//     if (!isLoggedIn && val > FREE_LIMIT) { openUpgrade("login_required"); return; }
//     const clamped = Math.min(effectiveMax, Math.max(1, val));
//     setQuestionCount(clamped);
//     setCurrentPage(clamped > PAGE_SIZE ? 1 : 0);
//   };

//   const handleSubmit = async () => {
//     if (tab === "url" && !url.trim()) { setError("Please enter a valid URL"); return; }
//     if (tab === "pdf" && !pdfFile) { setError("Please upload a PDF file"); return; }

//     // Gate: must be logged in
//     if (!isLoggedIn) { openUpgrade("login_required"); return; }

//     // Gate: must have enough tokens
//     if ((tokens ?? 0) < QUIZ_TOKEN_COST) { openUpgrade("no_tokens"); return; }

//     setError("");
//     setLoading(true);
//     setProgress("Fetching content...");

//     try {
//       setTimeout(() => setProgress("Analyzing with AI..."), 1500);
//       setTimeout(() => setProgress("Crafting questions..."), 3500);

//       let res: Response;
//       if (tab === "pdf" && pdfFile) {
//         const formData = new FormData();
//         formData.append("pdf", pdfFile);
//         formData.append("difficulty", difficulty);
//         formData.append("questionCount", String(questionCount));
//         res = await fetch("/api/analyze", { method: "POST", body: formData });
//       } else {
//         res = await fetch("/api/analyze", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ url: url.trim(), difficulty, questionCount }),
//         });
//       }

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to generate quiz");

//       // Deduct tokens after successful generation
//       await deductTokens(QUIZ_TOKEN_COST);
//       await refetchTokens();

//       sessionStorage.setItem("quizSession", JSON.stringify(data.session));
//       // Pass token reward info so quiz page can award bonuses on completion
//       sessionStorage.setItem("tokenRewards", JSON.stringify({
//         perfectBonus: PERFECT_BONUS,
//         completeBonus: COMPLETE_BONUS,
//         totalQuestions: questionCount,
//       }));

//       router.push("/quiz");
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong");
//       setLoading(false);
//     }
//   };

//   const totalPoints = { basic: 5, intermediate: 10, advanced: 15 }[difficulty] * questionCount;
//   const hasEnoughTokens = isLoggedIn && (tokens ?? 0) >= QUIZ_TOKEN_COST;

//   // Paginated bars
//   const pageStart = currentPage * PAGE_SIZE + 1;
//   const pageEnd = Math.min(pageStart + PAGE_SIZE - 1, MAX_QUESTIONS);
//   const visibleBars = Array.from({ length: pageEnd - pageStart + 1 }, (_, i) => pageStart + i);

//   return (
//     <>
//       {showUpgrade && (
//         <UpgradeModal
//           reason={upgradeReason}
//           tokens={tokens ?? 0}
//           onClose={() => setShowUpgrade(false)}
//           onSubscribe={handleSubscribe}
//           onSignIn={() => signIn("google")}
//         />
//       )}

//       {/* Success Toast */}
//       {showSuccess && (
//         <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90vw] sm:w-auto">
//           <div className="bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded-xl px-4 sm:px-6 py-3 flex items-center gap-3 shadow-xl">
//             <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5">
//                 <polyline points="20 6 9 17 4 12" />
//               </svg>
//             </div>
//             <div>
//               <p className="font-semibold text-emerald-400 text-sm">Payment Successful!</p>
//               <p className="text-xs text-emerald-300/80">🪙 {PRO_TOKENS} tokens added to your account!</p>
//             </div>
//           </div>
//         </div>
//       )}

//       <main className="min-h-screen bg-[#080810] text-white overflow-x-hidden relative">
//         {/* Background */}
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />
//         <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_60%,#080810_100%)]" />
//         <div className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg5OSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]" />

//         <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-20">

//           {/* Header */}
//           <div className="text-center mb-8 sm:mb-12 lg:mb-16">
//             <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs sm:text-sm font-medium mb-5 sm:mb-8 tracking-wide">
//               <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse shrink-0" />
//               {isPro ? "⚡ PRO PLAN ACTIVE" : isLoggedIn ? "AI-POWERED QUIZ ENGINE" : "AI-POWERED QUIZ ENGINE"}
//             </div>

//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-none mb-3 sm:mb-4">
//               <span className="text-white">Learn</span>
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400"> Deeper</span>
//             </h1>

//             <p className="text-zinc-400 text-sm sm:text-base lg:text-lg leading-relaxed px-2">
//               Paste any link or upload a PDF.{" "}
//               <span className="hidden sm:inline"><br /></span>
//               We generate a quiz that tests your understanding.
//             </p>

//             {/* Token/status badge */}
//             <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
//               {isLoggedIn ? (
//                 <TokenBadge tokens={tokens ?? 0} cost={QUIZ_TOKEN_COST} />
//               ) : (
//                 <button
//                   onClick={() => openUpgrade("login_required")}
//                   className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold hover:bg-indigo-500/25 transition-all"
//                 >
//                   <span>🪙</span>
//                   <span>Sign in to get {SIGNUP_TOKENS} free tokens</span>
//                 </button>
//               )}
//               {isPro && (
//                 <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-semibold">
//                   ⚡ Pro · up to {MAX_QUESTIONS}q
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Main Card */}
//           <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 lg:space-y-7">

//             {/* Tab Switcher */}
//             <div className="flex gap-1 p-1 bg-white/[0.04] rounded-xl border border-white/[0.06]">
//               {[
//                 {
//                   key: "url", label: "URL / Link",
//                   icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
//                 },
//                 {
//                   key: "pdf", label: "PDF Upload",
//                   icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
//                 },
//               ].map((t) => (
//                 <button
//                   key={t.key}
//                   onClick={() => { setTab(t.key as "url" | "pdf"); setError(""); }}
//                   className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${tab === t.key ? "bg-indigo-600 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
//                 >
//                   {t.icon}
//                   <span>{t.label}</span>
//                 </button>
//               ))}
//             </div>

//             {/* URL Input */}
//             {tab === "url" && (
//               <div>
//                 <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2 sm:mb-3">
//                   Source URL
//                 </label>
//                 <div className="relative">
//                   <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-zinc-500">
//                     <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
//                       <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
//                     </svg>
//                   </span>
//                   <input
//                     type="url"
//                     value={url}
//                     onChange={(e) => { setUrl(e.target.value); setError(""); }}
//                     onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//                     placeholder="https://en.wikipedia.org/wiki/..."
//                     className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-9 sm:pl-11 pr-4 py-3 sm:py-3.5 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
//                   />
//                 </div>
//                 <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
//                   {EXAMPLE_LINKS.map((ex) => (
//                     <button
//                       key={ex.url}
//                       onClick={() => setUrl(ex.url)}
//                       className="text-xs px-2.5 sm:px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-zinc-500 hover:text-zinc-300 hover:border-white/[0.12] transition-all"
//                     >
//                       {ex.icon} {ex.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* PDF Upload */}
//             {tab === "pdf" && (
//               <div>
//                 <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2 sm:mb-3">
//                   Upload PDF
//                 </label>
//                 <div
//                   onClick={() => fileRef.current?.click()}
//                   onDragOver={(e) => { e.preventDefault(); setPdfDrag(true); }}
//                   onDragLeave={() => setPdfDrag(false)}
//                   onDrop={(e) => { e.preventDefault(); setPdfDrag(false); handleFileChange(e.dataTransfer.files[0] ?? null); }}
//                   className={`flex flex-col items-center justify-center gap-3 p-6 sm:p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all ${pdfDrag ? "border-indigo-500/70 bg-indigo-500/10" : pdfFile ? "border-emerald-500/50 bg-emerald-500/[0.05]" : "border-white/[0.10] hover:border-white/[0.20] bg-white/[0.02]"}`}
//                 >
//                   <input ref={fileRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)} />
//                   {pdfFile ? (
//                     <>
//                       <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
//                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-sm font-semibold text-emerald-400 truncate max-w-[200px] sm:max-w-xs">{pdfFile.name}</p>
//                         <p className="text-xs text-zinc-500 mt-1">{(pdfFile.size / 1024).toFixed(1)} KB · tap to change</p>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/[0.05] flex items-center justify-center">
//                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
//                           <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
//                           <polyline points="14 2 14 8 20 8" />
//                           <line x1="12" y1="18" x2="12" y2="12" />
//                           <line x1="9" y1="15" x2="15" y2="15" />
//                         </svg>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-sm font-semibold text-zinc-300">Drop your PDF here</p>
//                         <p className="text-xs text-zinc-600 mt-1">or tap to browse · max 10MB</p>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Question Count */}
//             <div>
//               <div className="flex items-center justify-between mb-2 sm:mb-3">
//                 <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
//                   Questions
//                 </label>
//                 <div className="flex items-center gap-1.5 sm:gap-2">
//                   <span className="text-xs font-mono font-bold text-indigo-400">{questionCount}q</span>
//                   <span className="text-xs text-zinc-600">·</span>
//                   <span className="text-xs font-mono font-bold text-zinc-500">{totalPoints}pts</span>
//                   <span className="text-xs text-zinc-600">·</span>
//                   <span className="text-xs font-mono font-bold text-amber-500/80">🪙 {QUIZ_TOKEN_COST}</span>
//                 </div>
//               </div>

//               {/* Paginated bar grid */}
//               <div className="flex gap-[2px] sm:gap-1">
//                 {visibleBars.map((n) => {
//                   const isSelected = n <= questionCount;
//                   const isFreeRange = n <= FREE_LIMIT;
//                   const isAvailable = isLoggedIn || isFreeRange;
//                   return (
//                     <button
//                       key={n}
//                       onClick={() => {
//                         if (!isLoggedIn && n > FREE_LIMIT) { openUpgrade("login_required"); return; }
//                         handleQuestionCountChange(n);
//                       }}
//                       title={`${n} question${n > 1 ? "s" : ""}${!isLoggedIn && n > FREE_LIMIT ? " · Sign in required" : ""}`}
//                       className={`relative flex-1 h-6 sm:h-8 rounded transition-all ${
//                         isSelected && isAvailable ? "bg-indigo-500"
//                         : isSelected && !isAvailable ? "bg-violet-600"
//                         : isAvailable ? "bg-white/[0.07] hover:bg-white/[0.14]"
//                         : "bg-white/[0.04] hover:bg-violet-500/20"
//                       }`}
//                     />
//                   );
//                 })}
//               </div>

//               {/* Legend + page nav */}
//               <div className="flex items-center justify-between mt-2">
//                 <div className="flex items-center gap-3">
//                   <div className="flex items-center gap-1.5">
//                     <span className="w-2 h-2 rounded-sm bg-indigo-500" />
//                     <span className="text-[10px] text-zinc-500">Free (1–{FREE_LIMIT})</span>
//                   </div>
//                   <div className="flex items-center gap-1.5">
//                     <span className="w-2 h-2 rounded-sm bg-indigo-400/50" />
//                     <span className="text-[10px] text-zinc-500">Signed in (1–{MAX_QUESTIONS})</span>
//                   </div>
//                 </div>
//                 {/* page flip */}
//                 <div className="flex items-center gap-1">
//                   <button
//                     onClick={() => setCurrentPage(0)}
//                     disabled={currentPage === 0}
//                     className="w-6 h-6 rounded-md text-[11px] font-bold border border-white/[0.08] bg-white/[0.04] text-zinc-400 hover:bg-white/[0.10] disabled:opacity-30 disabled:cursor-default transition-all"
//                   >‹</button>
//                   <span className="text-[10px] text-zinc-600 font-mono px-1">{pageStart}–{pageEnd}</span>
//                   <button
//                     onClick={() => setCurrentPage(1)}
//                     disabled={currentPage === 1}
//                     className="w-6 h-6 rounded-md text-[11px] font-bold border border-white/[0.08] bg-white/[0.04] text-zinc-400 hover:bg-white/[0.10] disabled:opacity-30 disabled:cursor-default transition-all"
//                   >›</button>
//                 </div>
//               </div>

//               {/* +/- stepper */}
//               <div className="flex items-center justify-center gap-4 mt-3 sm:mt-4">
//                 <button
//                   onClick={() => handleQuestionCountChange(questionCount - 1)}
//                   className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] text-zinc-300 hover:bg-white/[0.10] transition-all flex items-center justify-center text-xl font-bold"
//                 >−</button>
//                 <span className="text-2xl sm:text-3xl font-black text-white w-12 text-center tabular-nums">{questionCount}</span>
//                 <button
//                   onClick={() => handleQuestionCountChange(questionCount + 1)}
//                   className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border transition-all flex items-center justify-center text-xl font-bold ${
//                     !isLoggedIn && questionCount >= FREE_LIMIT
//                       ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/20"
//                       : "bg-white/[0.05] border-white/[0.08] text-zinc-300 hover:bg-white/[0.10]"
//                   }`}
//                 >
//                   {!isLoggedIn && questionCount >= FREE_LIMIT ? "🔐" : "+"}
//                 </button>
//               </div>
//             </div>

//             {/* Difficulty */}
//             <div>
//               <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2 sm:mb-3">
//                 Difficulty Level
//               </label>
//               <div className="grid grid-cols-3 gap-2 sm:gap-3">
//                 {DIFFICULTY_CONFIG.map((d) => (
//                   <button
//                     key={d.key}
//                     onClick={() => setDifficulty(d.key)}
//                     className={`p-3 sm:p-4 rounded-xl border text-left transition-all ${difficulty === d.key
//                       ? d.key === "basic" ? "border-emerald-500/50 bg-emerald-500/10"
//                         : d.key === "intermediate" ? "border-amber-500/50 bg-amber-500/10"
//                         : "border-rose-500/50 bg-rose-500/10"
//                       : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"}`}
//                   >
//                     <div className={`text-xs sm:text-sm font-bold mb-0.5 sm:mb-1 ${difficulty === d.key
//                       ? d.key === "basic" ? "text-emerald-400"
//                         : d.key === "intermediate" ? "text-amber-400"
//                         : "text-rose-400"
//                       : "text-white"}`}>
//                       {d.label}
//                     </div>
//                     <div className="text-[10px] sm:text-xs text-zinc-500 leading-tight hidden sm:block">{d.desc}</div>
//                     <div className={`text-[10px] sm:text-xs mt-1 sm:mt-2 font-mono font-bold ${difficulty === d.key
//                       ? d.key === "basic" ? "text-emerald-500"
//                         : d.key === "intermediate" ? "text-amber-500"
//                         : "text-rose-500"
//                       : "text-zinc-600"}`}>
//                       {d.points}
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Token reward hint */}
//             {isLoggedIn && (
//               <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-600 bg-amber-500/[0.04] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 border border-amber-500/[0.08]">
//                 <span>🪙 {QUIZ_TOKEN_COST} tokens · this quiz</span>
//                 <span className="w-px h-3 bg-zinc-700 hidden sm:block" />
//                 <span className="text-emerald-600">+{PERFECT_BONUS} bonus if perfect score</span>
//                 <span className="w-px h-3 bg-zinc-700 hidden sm:block" />
//                 <span className="text-emerald-600">+{COMPLETE_BONUS} for answering all {questionCount}q</span>
//               </div>
//             )}

//             {/* Info bar */}
//             <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-600 bg-white/[0.02] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 border border-white/[0.04]">
//               <span>📝 {questionCount} questions</span>
//               <span className="w-px h-3 bg-zinc-700 hidden sm:block" />
//               <span>🎯 MCQ + MSQ</span>
//               <span className="w-px h-3 bg-zinc-700 hidden sm:block" />
//               <span>🏆 {totalPoints} pts</span>
//               {isLoggedIn && !hasEnoughTokens && (
//                 <>
//                   <span className="w-px h-3 bg-zinc-700 hidden sm:block" />
//                   <span className="text-rose-400">⚠️ Need {QUIZ_TOKEN_COST} tokens</span>
//                 </>
//               )}
//             </div>

//             {/* Error */}
//             {error && (
//               <div className="flex items-start gap-3 px-3 sm:px-4 py-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs sm:text-sm">
//                 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
//                   <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
//                 </svg>
//                 {error}
//               </div>
//             )}

//             {/* CTA Button */}
//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="w-full py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm sm:text-base tracking-wide transition-all disabled:opacity-60 disabled:cursor-not-allowed group"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-2 sm:gap-3">
//                   <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                   </svg>
//                   {progress}
//                 </span>
//               ) : (
//                 <span className="flex items-center justify-center gap-2">
//                   {!isLoggedIn
//                     ? "🔐 Sign in to Generate Quiz"
//                     : !hasEnoughTokens
//                     ? "🪙 Get More Tokens"
//                     : `Generate ${questionCount} Question Quiz · 🪙 ${QUIZ_TOKEN_COST}`}
//                   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
//                     <path d="M5 12h14M12 5l7 7-7 7" />
//                   </svg>
//                 </span>
//               )}
//             </button>
//           </div>

//           {/* Features */}
//           <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 sm:mt-8">
//             {[
//               { icon: "🔗", title: "Any Link", desc: "YouTube, Wikipedia, articles" },
//               { icon: "📄", title: "PDF Upload", desc: "Notes, textbooks, docs" },
//               { icon: "🪙", title: "Earn Tokens", desc: "Perfect score = bonus tokens" },
//             ].map((f) => (
//               <div key={f.title} className="text-center px-1">
//                 <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{f.icon}</div>
//                 <div className="text-xs font-semibold text-zinc-300">{f.title}</div>
//                 <div className="text-[10px] sm:text-xs text-zinc-600 mt-0.5 hidden sm:block">{f.desc}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }















"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { Difficulty } from "@/types";
import { useTokens } from "@/hooks/useTokens";

const EXAMPLE_LINKS = [
  { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Artificial_intelligence", icon: "📖" },
  { label: "YouTube", url: "https://www.youtube.com/watch?v=aircAruvnKk", icon: "▶️" },
  { label: "Black Hole", url: "https://en.wikipedia.org/wiki/Black_hole", icon: "🌑" },
];

const DIFFICULTY_CONFIG: {
  key: Difficulty;
  label: string;
  desc: string;
  points: string;
}[] = [
  { key: "basic", label: "Basic", desc: "Recall & definitions", points: "5 pts/q" },
  { key: "intermediate", label: "Intermediate", desc: "Apply & connect", points: "10 pts/q" },
  { key: "advanced", label: "Advanced", desc: "Analyze & synthesize", points: "15 pts/q" },
];

// ── Token economy constants ──────────────────────────────────────────────────
const FREE_LIMIT = 5;           // max questions for free users (logged-out + logged-in non-Pro)
const MAX_QUESTIONS = 70;       // max for Pro users only
const PAGE_SIZE = 35;           // bars shown per page in the grid
const PRO_PRICE = 15;
const QUIZ_TOKEN_COST = 11;     // tokens deducted per quiz generation
const SIGNUP_TOKENS = 120;      // tokens awarded on first sign-in
const PRO_TOKENS = 500;         // tokens awarded on Pro purchase
const PERFECT_BONUS = 10;       // bonus tokens for 100% correct answers
const COMPLETE_BONUS = 10;      // bonus tokens for answering ALL selected questions
// ─────────────────────────────────────────────────────────────────────────────

type UpgradeReason = "no_tokens" | "pro_limit" | "login_required";

function TokenBadge({ tokens, cost }: { tokens: number; cost: number }) {
  const low = tokens < cost * 2;
  const empty = tokens < cost;
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${
      empty
        ? "border-rose-500/30 bg-rose-500/10 text-rose-300"
        : low
        ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
        : "border-amber-500/20 bg-amber-500/[0.08] text-amber-300"
    }`}>
      <span>🪙</span>
      <span className="font-mono tabular-nums">{tokens}</span>
      <span className="text-[10px] opacity-60">tokens</span>
      {empty && <span className="text-rose-400 text-[10px]">· not enough</span>}
      {!empty && low && <span className="text-amber-500/70 text-[10px]">· low</span>}
    </div>
  );
}

function UpgradeModal({
  onClose,
  onSubscribe,
  onSignIn,
  reason,
  tokens,
}: {
  onClose: () => void;
  onSubscribe: () => void;
  onSignIn: () => void;
  reason: UpgradeReason;
  tokens: number;
}) {
  const isLoginRequired = reason === "login_required";
  const isNoTokens = reason === "no_tokens";
  const isProLimit = reason === "pro_limit";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl border border-violet-500/30 bg-[#0e0e1a] p-6 sm:p-8 shadow-2xl shadow-violet-900/30">
        <div className="w-10 h-1 rounded-full bg-white/10 mx-auto mb-6 sm:hidden" />
        <div className="absolute -top-px left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent hidden sm:block" />

        <div className="flex flex-col items-center text-center gap-4">
          <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg ${
            isLoginRequired
              ? "bg-gradient-to-br from-indigo-600 to-blue-600 shadow-indigo-900/50"
              : isNoTokens
              ? "bg-gradient-to-br from-rose-600 to-orange-600 shadow-rose-900/50"
              : "bg-gradient-to-br from-violet-600 to-indigo-600 shadow-violet-900/50"
          }`}>
            {isLoginRequired ? "🔐" : isNoTokens ? "🪙" : "⚡"}
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {isLoginRequired
                ? "Sign in to Continue"
                : isNoTokens
                ? "Not Enough Tokens"
                : "Unlock Pro Features"}
            </h2>
            <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
              {isLoginRequired
                ? `Create a free account and get 🪙 ${SIGNUP_TOKENS} tokens instantly. Each quiz costs only ${QUIZ_TOKEN_COST} tokens.`
                : isNoTokens
                ? `You have 🪙 ${tokens} tokens but need ${QUIZ_TOKEN_COST}. Upgrade to Pro for 🪙 ${PRO_TOKENS} tokens instantly.`
                : `Get ${PRO_TOKENS} tokens, up to ${MAX_QUESTIONS} questions per quiz, and advanced AI processing.`}
            </p>
          </div>

          {/* Features list */}
          <div className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 space-y-2 text-sm text-left">
            {isLoginRequired ? [
              ["🪙", `${SIGNUP_TOKENS} free tokens on signup`],
              ["📝", `Up to ${FREE_LIMIT} questions per quiz`],
              ["🔗", "URL & PDF support"],
              ["🏆", `Win +${PERFECT_BONUS} bonus tokens for perfect score`],
              ["✅", `+${COMPLETE_BONUS} tokens for answering all questions`],
            ] : [
              ["⚡", `${PRO_TOKENS} tokens on upgrade`],
              ["📝", `Up to ${MAX_QUESTIONS} questions per quiz`],
              ["🏆", `Win +${PERFECT_BONUS} bonus tokens for perfect score`],
              ["✅", `+${COMPLETE_BONUS} tokens for answering all questions`],
              ["📄", "PDF + URL support"],
              ["🚀", "Priority AI processing"],
              ["📊", "Export & analytics"],
            ].map(([icon, text]) => (
              <div key={String(text)} className="flex items-center gap-3 text-zinc-300">
                <span>{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>

          {isLoginRequired ? (
            <>
              <button
                onClick={onSignIn}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-indigo-900/40"
              >
                Sign in with Google — Free →
              </button>
              <button onClick={onClose} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors pb-1">
                Maybe later
              </button>
            </>
          ) : (
            <>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">${PRO_PRICE}</div>
                <div className="text-xs text-zinc-500">per month · includes 🪙 {PRO_TOKENS} tokens</div>
              </div>
              <button
                onClick={onSubscribe}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-violet-900/40"
              >
                Upgrade to Pro →
              </button>
              <button onClick={onClose} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors pb-1">
                Maybe later
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function HomePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const { tokens, deductTokens, addTokens, refetch: refetchTokens } = useTokens();

  const [tab, setTab] = useState<"url" | "pdf">("url");
  const [url, setUrl] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfDrag, setPdfDrag] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>("intermediate");
  const [questionCount, setQuestionCount] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState<UpgradeReason>("login_required");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState("");
  const [isPro, setIsPro] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  const isLoggedIn = !!session;
  
  // 🔥 FIX: Non-Pro logged-in users are limited to FREE_LIMIT (5 questions)
  // Only Pro users can access up to MAX_QUESTIONS (70 questions)
  const effectiveMax = isPro ? MAX_QUESTIONS : FREE_LIMIT;

  const checkSubscriptionStatus = async () => {
    try {
      const res = await fetch("/api/subscription/status");
      const data = await res.json();
      setIsPro(data.isPro);
      if (data.isPro) localStorage.setItem("isPro", "true");
    } catch {
      setIsPro(localStorage.getItem("isPro") === "true");
    }
  };

  useEffect(() => {
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");
    if (success === "true") {
      setShowSuccess(true);
      checkSubscriptionStatus();
      addTokens(PRO_TOKENS);
      window.history.replaceState({}, "", window.location.pathname);
      setTimeout(() => setShowSuccess(false), 5000);
    }
    if (canceled === "true") {
      setError("Payment was cancelled.");
      window.history.replaceState({}, "", window.location.pathname);
      setTimeout(() => setError(""), 4000);
    }
  }, [searchParams]);

  useEffect(() => { checkSubscriptionStatus(); }, []);

  const handleSubscribe = async () => {
    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: "price_pro_monthly",
          successUrl: `${window.location.origin}/?success=true`,
          cancelUrl: `${window.location.origin}/?canceled=true`,
        }),
      });
      const { url: checkoutUrl } = await response.json();
      window.location.href = checkoutUrl;
    } catch {
      setError("Failed to initiate checkout. Please try again.");
    }
  };

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    if (file.type !== "application/pdf") { setError("Only PDF files are supported."); return; }
    if (file.size > 10 * 1024 * 1024) { setError("PDF must be under 10MB."); return; }
    setError("");
    setPdfFile(file);
  };

  const openUpgrade = (reason: UpgradeReason) => {
    setUpgradeReason(reason);
    setShowUpgrade(true);
  };

  const handleQuestionCountChange = (val: number) => {
    // 🔥 FIX: Check if user is trying to exceed FREE_LIMIT without being Pro
    if (val > FREE_LIMIT && !isPro) {
      openUpgrade("pro_limit");
      return;
    }
    // Not logged in users also can't exceed FREE_LIMIT
    if (!isLoggedIn && val > FREE_LIMIT) {
      openUpgrade("login_required");
      return;
    }
    const clamped = Math.min(effectiveMax, Math.max(1, val));
    setQuestionCount(clamped);
    setCurrentPage(clamped > PAGE_SIZE ? 1 : 0);
  };

  const handleSubmit = async () => {
    if (tab === "url" && !url.trim()) { setError("Please enter a valid URL"); return; }
    if (tab === "pdf" && !pdfFile) { setError("Please upload a PDF file"); return; }

    // Gate: must be logged in
    if (!isLoggedIn) { openUpgrade("login_required"); return; }

    // Gate: must have enough tokens
    if ((tokens ?? 0) < QUIZ_TOKEN_COST) { openUpgrade("no_tokens"); return; }

    // 🔥 FIX: Check if non-Pro user is trying to generate >5 questions
    if (!isPro && questionCount > FREE_LIMIT) {
      openUpgrade("pro_limit");
      return;
    }

    setError("");
    setLoading(true);
    setProgress("Fetching content...");

    try {
      setTimeout(() => setProgress("Analyzing with AI..."), 1500);
      setTimeout(() => setProgress("Crafting questions..."), 3500);

      let res: Response;
      if (tab === "pdf" && pdfFile) {
        const formData = new FormData();
        formData.append("pdf", pdfFile);
        formData.append("difficulty", difficulty);
        formData.append("questionCount", String(questionCount));
        res = await fetch("/api/analyze", { method: "POST", body: formData });
      } else {
        res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: url.trim(), difficulty, questionCount }),
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate quiz");

      await deductTokens(QUIZ_TOKEN_COST);
      await refetchTokens();

      sessionStorage.setItem("quizSession", JSON.stringify(data.session));
      sessionStorage.setItem("tokenRewards", JSON.stringify({
        perfectBonus: PERFECT_BONUS,
        completeBonus: COMPLETE_BONUS,
        totalQuestions: questionCount,
      }));

      router.push("/quiz");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  const totalPoints = { basic: 5, intermediate: 10, advanced: 15 }[difficulty] * questionCount;
  const hasEnoughTokens = isLoggedIn && (tokens ?? 0) >= QUIZ_TOKEN_COST;

  const pageStart = currentPage * PAGE_SIZE + 1;
  const pageEnd = Math.min(pageStart + PAGE_SIZE - 1, MAX_QUESTIONS);
  const visibleBars = Array.from({ length: pageEnd - pageStart + 1 }, (_, i) => pageStart + i);

  return (
    <>
      {showUpgrade && (
        <UpgradeModal
          reason={upgradeReason}
          tokens={tokens ?? 0}
          onClose={() => setShowUpgrade(false)}
          onSubscribe={handleSubscribe}
          onSignIn={() => signIn("google")}
        />
      )}

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90vw] sm:w-auto">
          <div className="bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 rounded-xl px-4 sm:px-6 py-3 flex items-center gap-3 shadow-xl">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-emerald-400 text-sm">Payment Successful!</p>
              <p className="text-xs text-emerald-300/80">🪙 {PRO_TOKENS} tokens added to your account!</p>
            </div>
          </div>
        </div>
      )}

      <main className="min-h-screen bg-[#080810] text-white overflow-x-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_60%,#080810_100%)]" />
        <div className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg5OSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]" />

        <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-20">

          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs sm:text-sm font-medium mb-5 sm:mb-8 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse shrink-0" />
              {isPro ? "⚡ PRO PLAN ACTIVE" : isLoggedIn ? "AI-POWERED QUIZ ENGINE" : "AI-POWERED QUIZ ENGINE"}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-none mb-3 sm:mb-4">
              <span className="text-white">Learn</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400"> Deeper</span>
            </h1>

            <p className="text-zinc-400 text-sm sm:text-base lg:text-lg leading-relaxed px-2">
              Paste any link or upload a PDF.{" "}
              <span className="hidden sm:inline"><br /></span>
              We generate a quiz that tests your understanding.
            </p>

            {/* Token/status badge */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {isLoggedIn ? (
                <TokenBadge tokens={tokens ?? 0} cost={QUIZ_TOKEN_COST} />
              ) : (
                <button
                  onClick={() => openUpgrade("login_required")}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold hover:bg-indigo-500/25 transition-all"
                >
                  <span>🪙</span>
                  <span>Sign in to get {SIGNUP_TOKENS} free tokens</span>
                </button>
              )}
              {isPro && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs font-semibold">
                  ⚡ Pro · up to {MAX_QUESTIONS}q
                </span>
              )}
              {isLoggedIn && !isPro && (
                <button
                  onClick={() => openUpgrade("pro_limit")}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold hover:bg-amber-500/25 transition-all"
                >
                  ⚡ Upgrade to Pro for {MAX_QUESTIONS} questions
                </button>
              )}
            </div>
          </div>

          {/* Main Card */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 lg:space-y-7">

            {/* Tab Switcher */}
            <div className="flex gap-1 p-1 bg-white/[0.04] rounded-xl border border-white/[0.06]">
              {[
                {
                  key: "url", label: "URL / Link",
                  icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                },
                {
                  key: "pdf", label: "PDF Upload",
                  icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => { setTab(t.key as "url" | "pdf"); setError(""); }}
                  className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${tab === t.key ? "bg-indigo-600 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                >
                  {t.icon}
                  <span>{t.label}</span>
                </button>
              ))}
            </div>

            {/* URL Input */}
            {tab === "url" && (
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2 sm:mb-3">
                  Source URL
                </label>
                <div className="relative">
                  <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  </span>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => { setUrl(e.target.value); setError(""); }}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    placeholder="https://en.wikipedia.org/wiki/..."
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-9 sm:pl-11 pr-4 py-3 sm:py-3.5 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                  {EXAMPLE_LINKS.map((ex) => (
                    <button
                      key={ex.url}
                      onClick={() => setUrl(ex.url)}
                      className="text-xs px-2.5 sm:px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-zinc-500 hover:text-zinc-300 hover:border-white/[0.12] transition-all"
                    >
                      {ex.icon} {ex.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* PDF Upload */}
            {tab === "pdf" && (
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2 sm:mb-3">
                  Upload PDF
                </label>
                <div
                  onClick={() => fileRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setPdfDrag(true); }}
                  onDragLeave={() => setPdfDrag(false)}
                  onDrop={(e) => { e.preventDefault(); setPdfDrag(false); handleFileChange(e.dataTransfer.files[0] ?? null); }}
                  className={`flex flex-col items-center justify-center gap-3 p-6 sm:p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all ${pdfDrag ? "border-indigo-500/70 bg-indigo-500/10" : pdfFile ? "border-emerald-500/50 bg-emerald-500/[0.05]" : "border-white/[0.10] hover:border-white/[0.20] bg-white/[0.02]"}`}
                >
                  <input ref={fileRef} type="file" accept=".pdf,application/pdf" className="hidden" onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)} />
                  {pdfFile ? (
                    <>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-emerald-400 truncate max-w-[200px] sm:max-w-xs">{pdfFile.name}</p>
                        <p className="text-xs text-zinc-500 mt-1">{(pdfFile.size / 1024).toFixed(1)} KB · tap to change</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/[0.05] flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="12" y1="18" x2="12" y2="12" />
                          <line x1="9" y1="15" x2="15" y2="15" />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-zinc-300">Drop your PDF here</p>
                        <p className="text-xs text-zinc-600 mt-1">or tap to browse · max 10MB</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Question Count */}
            <div>
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                  Questions
                </label>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-xs font-mono font-bold text-indigo-400">{questionCount}q</span>
                  <span className="text-xs text-zinc-600">·</span>
                  <span className="text-xs font-mono font-bold text-zinc-500">{totalPoints}pts</span>
                  <span className="text-xs text-zinc-600">·</span>
                  <span className="text-xs font-mono font-bold text-amber-500/80">🪙 {QUIZ_TOKEN_COST}</span>
                </div>
              </div>

              {/* Paginated bar grid */}
              <div className="flex gap-[2px] sm:gap-1">
                {visibleBars.map((n) => {
                  const isSelected = n <= questionCount;
                  // 🔥 FIX: Pro users can select any, non-Pro only up to FREE_LIMIT
                  const isAvailable = isPro || n <= FREE_LIMIT;
                  const isFreeRange = n <= FREE_LIMIT;
                  
                  let buttonClass = "relative flex-1 h-6 sm:h-8 rounded transition-all ";
                  if (isSelected && isAvailable) {
                    buttonClass += "bg-indigo-500";
                  } else if (isSelected && !isAvailable) {
                    buttonClass += "bg-violet-600";
                  } else if (isAvailable) {
                    buttonClass += "bg-white/[0.07] hover:bg-white/[0.14]";
                  } else {
                    buttonClass += "bg-white/[0.04] opacity-40 cursor-not-allowed";
                  }
                  
                  return (
                    <button
                      key={n}
                      onClick={() => {
                        if (!isAvailable) {
                          if (n > FREE_LIMIT && !isPro) openUpgrade("pro_limit");
                          else if (!isLoggedIn) openUpgrade("login_required");
                          return;
                        }
                        handleQuestionCountChange(n);
                      }}
                      title={`${n} question${n > 1 ? "s" : ""}${!isAvailable ? " · Upgrade to Pro required" : ""}`}
                      className={buttonClass}
                    />
                  );
                })}
              </div>

              {/* Legend + page nav */}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-sm bg-indigo-500" />
                    <span className="text-[10px] text-zinc-500">Free (1–{FREE_LIMIT})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-sm bg-violet-600" />
                    <span className="text-[10px] text-zinc-500">Pro ({FREE_LIMIT + 1}–{MAX_QUESTIONS})</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(0)}
                    disabled={currentPage === 0}
                    className="w-6 h-6 rounded-md text-[11px] font-bold border border-white/[0.08] bg-white/[0.04] text-zinc-400 hover:bg-white/[0.10] disabled:opacity-30 disabled:cursor-default transition-all"
                  >‹</button>
                  <span className="text-[10px] text-zinc-600 font-mono px-1">{pageStart}–{pageEnd}</span>
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="w-6 h-6 rounded-md text-[11px] font-bold border border-white/[0.08] bg-white/[0.04] text-zinc-400 hover:bg-white/[0.10] disabled:opacity-30 disabled:cursor-default transition-all"
                  >›</button>
                </div>
              </div>

              {/* +/- stepper */}
              <div className="flex items-center justify-center gap-4 mt-3 sm:mt-4">
                <button
                  onClick={() => handleQuestionCountChange(questionCount - 1)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] text-zinc-300 hover:bg-white/[0.10] transition-all flex items-center justify-center text-xl font-bold"
                >−</button>
                <span className="text-2xl sm:text-3xl font-black text-white w-12 text-center tabular-nums">{questionCount}</span>
                <button
                  onClick={() => handleQuestionCountChange(questionCount + 1)}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border transition-all flex items-center justify-center text-xl font-bold ${
                    !isPro && questionCount >= FREE_LIMIT
                      ? "bg-violet-500/10 border-violet-500/30 text-violet-400 hover:bg-violet-500/20"
                      : "bg-white/[0.05] border-white/[0.08] text-zinc-300 hover:bg-white/[0.10]"
                  }`}
                >
                  {!isPro && questionCount >= FREE_LIMIT ? "⚡" : "+"}
                </button>
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2 sm:mb-3">
                Difficulty Level
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {DIFFICULTY_CONFIG.map((d) => (
                  <button
                    key={d.key}
                    onClick={() => setDifficulty(d.key)}
                    className={`p-3 sm:p-4 rounded-xl border text-left transition-all ${difficulty === d.key
                      ? d.key === "basic" ? "border-emerald-500/50 bg-emerald-500/10"
                        : d.key === "intermediate" ? "border-amber-500/50 bg-amber-500/10"
                        : "border-rose-500/50 bg-rose-500/10"
                      : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"}`}
                  >
                    <div className={`text-xs sm:text-sm font-bold mb-0.5 sm:mb-1 ${difficulty === d.key
                      ? d.key === "basic" ? "text-emerald-400"
                        : d.key === "intermediate" ? "text-amber-400"
                        : "text-rose-400"
                      : "text-white"}`}>
                      {d.label}
                    </div>
                    <div className="text-[10px] sm:text-xs text-zinc-500 leading-tight hidden sm:block">{d.desc}</div>
                    <div className={`text-[10px] sm:text-xs mt-1 sm:mt-2 font-mono font-bold ${difficulty === d.key
                      ? d.key === "basic" ? "text-emerald-500"
                        : d.key === "intermediate" ? "text-amber-500"
                        : "text-rose-500"
                      : "text-zinc-600"}`}>
                      {d.points}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Token reward hint */}
            {isLoggedIn && (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-600 bg-amber-500/[0.04] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 border border-amber-500/[0.08]">
                <span>🪙 {QUIZ_TOKEN_COST} tokens · this quiz</span>
                <span className="w-px h-3 bg-zinc-700 hidden sm:block" />
                <span className="text-emerald-600">+{PERFECT_BONUS} bonus if perfect score</span>
                <span className="w-px h-3 bg-zinc-700 hidden sm:block" />
                <span className="text-emerald-600">+{COMPLETE_BONUS} for answering all {questionCount}q</span>
              </div>
            )}

            {/* Info bar */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-600 bg-white/[0.02] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 border border-white/[0.04]">
              <span>📝 {questionCount} questions</span>
              <span className="w-px h-3 bg-zinc-700 hidden sm:block" />
              <span>🎯 MCQ + MSQ</span>
              <span className="w-px h-3 bg-zinc-700 hidden sm:block" />
              <span>🏆 {totalPoints} pts</span>
              {isLoggedIn && !hasEnoughTokens && (
                <>
                  <span className="w-px h-3 bg-zinc-700 hidden sm:block" />
                  <span className="text-rose-400">⚠️ Need {QUIZ_TOKEN_COST} tokens</span>
                </>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 px-3 sm:px-4 py-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs sm:text-sm">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            {/* CTA Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm sm:text-base tracking-wide transition-all disabled:opacity-60 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2 sm:gap-3">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {progress}
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {!isLoggedIn
                    ? "🔐 Sign in to Generate Quiz"
                    : !hasEnoughTokens
                    ? "🪙 Get More Tokens"
                    : !isPro && questionCount > FREE_LIMIT
                    ? "⚡ Upgrade to Pro"
                    : `Generate ${questionCount} Question Quiz · 🪙 ${QUIZ_TOKEN_COST}`}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              )}
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 sm:mt-8">
            {[
              { icon: "🔗", title: "Any Link", desc: "YouTube, Wikipedia, articles" },
              { icon: "📄", title: "PDF Upload", desc: "Notes, textbooks, docs" },
              { icon: "🪙", title: "Earn Tokens", desc: "Perfect score = bonus tokens" },
            ].map((f) => (
              <div key={f.title} className="text-center px-1">
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{f.icon}</div>
                <div className="text-xs font-semibold text-zinc-300">{f.title}</div>
                <div className="text-[10px] sm:text-xs text-zinc-600 mt-0.5 hidden sm:block">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomePageContent />
    </Suspense>
  );
}














