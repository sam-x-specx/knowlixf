// "use client";
// import { useState } from "react";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

//   const handleSignIn = (provider: "google" | "github") => {
//     setLoadingProvider(provider);
//     // Replace with your actual auth logic e.g. signIn(provider) from next-auth
//     setTimeout(() => setLoadingProvider(null), 2000);
//   };

//   return (
//     <>
//       <nav className="fixed top-0 left-0 right-0 z-40 border-b border-white/[0.06] bg-[#030712]/0 backdrop-blur-md">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6">
//           <div className="flex items-center justify-between h-14 sm:h-16">

//             {/* Logo */}
//             <div className="flex items-center gap-2.5">
//               <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-900/40">
//                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M12 2L2 7l10 5 10-5-10-5z"/>
//                   <path d="M2 17l10 5 10-5"/>
//                   <path d="M2 12l10 5 10-5"/>
//                 </svg>
//               </div>
//               <span className="text-base sm:text-lg font-black tracking-tight text-white">
//                 Know<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">lix</span>
//               </span>
//             </div>

//             {/* Desktop Auth Buttons */}
//             <div className="hidden sm:flex items-center gap-2">
//               <button
//                 onClick={() => handleSignIn("github")}
//                 disabled={loadingProvider !== null}
//                 className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white text-sm font-medium transition-all disabled:opacity-50"
//               >
//                 {loadingProvider === "github" ? (
//                   <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
//                   </svg>
//                 ) : (
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//                     <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
//                   </svg>
//                 )}
//                 GitHub
//               </button>

//               <button
//                 onClick={() => handleSignIn("google")}
//                 disabled={loadingProvider !== null}
//                 className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-900/30 disabled:opacity-50"
//               >
//                 {loadingProvider === "google" ? (
//                   <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
//                   </svg>
//                 ) : (
//                   <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
//                     <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
//                     <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
//                     <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
//                     <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
//                   </svg>
//                 )}
//                 Sign in with Google
//               </button>
//             </div>

//             {/* Mobile Hamburger */}
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="sm:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-zinc-400 hover:text-white transition-all"
//             >
//               {menuOpen ? (
//                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//                   <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
//                 </svg>
//               ) : (
//                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//                   <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {menuOpen && (
//           <div className="sm:hidden border-t border-white/[0.06] bg-[#080810]/95 backdrop-blur-md px-4 py-4 space-y-2.5">
//             <button
//               onClick={() => { handleSignIn("github"); setMenuOpen(false); }}
//               disabled={loadingProvider !== null}
//               className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 text-sm font-medium transition-all disabled:opacity-50"
//             >
//               <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
//               </svg>
//               Continue with GitHub
//             </button>

//             <button
//               onClick={() => { handleSignIn("google"); setMenuOpen(false); }}
//               disabled={loadingProvider !== null}
//               className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-900/30 disabled:opacity-50"
//             >
//               <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                 <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
//                 <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
//                 <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
//                 <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
//               </svg>
//               Continue with Google
//             </button>
//           </div>
//         )}
//       </nav>

//       {/* Spacer so content doesn't hide under fixed navbar */}
//       <div className="h-14 sm:h-16" />
//     </>
//   );
// }


"use client";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useTokens } from "@/hooks/useTokens"; // you'll create this hook

export default function Navbar() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const { tokens } = useTokens(); // reads from DB/localStorage

  const handleSignIn = async (provider: "google" | "github") => {
    setLoadingProvider(provider);
    await signIn(provider);
    setLoadingProvider(null);
  };

  const isLoading = status === "loading";

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 border-b border-white/[0.06] bg-[#080810]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">

            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-900/40">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="text-base sm:text-lg font-black tracking-tight text-white">
                Know<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">lix</span>
              </span>
            </div>

            {/* Center — Token pill (visible when signed in on desktop) */}
            {session && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/10 backdrop-blur-sm">
                <span className="text-amber-400 text-sm">🪙</span>
                <span className="text-amber-300 text-xs font-bold font-mono tabular-nums">{tokens ?? "—"}</span>
                <span className="text-amber-500/60 text-[10px] font-medium">tokens</span>
              </div>
            )}

            {/* Desktop — Signed In */}
            {session && (
              <div className="hidden sm:flex items-center gap-2.5">
                {/* Avatar + name */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04]">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="avatar"
                      width={22}
                      height={22}
                      className="rounded-full ring-1 ring-white/10"
                    />
                  ) : (
                    <div className="w-[22px] h-[22px] rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-[10px] font-bold">
                      {session.user?.name?.[0] ?? "?"}
                    </div>
                  )}
                  <span className="text-sm text-zinc-300 font-medium max-w-[120px] truncate">
                    {session.user?.name?.split(" ")[0] || session.user?.email}
                  </span>
                </div>

                {/* Sign out */}
                <button
                  onClick={() => signOut()}
                  title="Sign out"
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] hover:bg-rose-500/10 hover:border-rose-500/30 text-zinc-500 hover:text-rose-400 transition-all"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                </button>
              </div>
            )}

            {/* Desktop — Signed Out */}
            {!session && !isLoading && (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => handleSignIn("github")}
                  disabled={loadingProvider !== null}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white text-sm font-medium transition-all disabled:opacity-50"
                >
                  {loadingProvider === "github" ? (
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  )}
                  GitHub
                </button>

                <button
                  onClick={() => handleSignIn("google")}
                  disabled={loadingProvider !== null}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-900/30 disabled:opacity-50"
                >
                  {loadingProvider === "google" ? (
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  )}
                  Sign in with Google
                </button>
              </div>
            )}

            {/* Loading skeleton */}
            {isLoading && (
              <div className="hidden sm:flex items-center gap-2">
                <div className="h-8 w-20 rounded-full bg-white/[0.04] animate-pulse" />
                <div className="h-9 w-24 rounded-xl bg-white/[0.04] animate-pulse" />
                <div className="h-9 w-9 rounded-xl bg-white/[0.04] animate-pulse" />
              </div>
            )}

            {/* Mobile right side */}
            <div className="flex sm:hidden items-center gap-2">
              {/* Token pill — mobile */}
              {session && (
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-amber-500/25 bg-amber-500/10">
                  <span className="text-amber-400 text-xs">🪙</span>
                  <span className="text-amber-300 text-xs font-bold font-mono tabular-nums">{tokens ?? "—"}</span>
                </div>
              )}

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-9 h-9 flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-zinc-400 hover:text-white transition-all"
              >
                {menuOpen ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="sm:hidden border-t border-white/[0.06] bg-[#080810]/95 backdrop-blur-md px-4 py-4 space-y-2.5">
            {session ? (
              <>
                {/* User card */}
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.03]">
                  {session.user?.image ? (
                    <Image src={session.user.image} alt="avatar" width={38} height={38} className="rounded-full ring-1 ring-white/10" />
                  ) : (
                    <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-sm font-bold">
                      {session.user?.name?.[0] ?? "?"}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{session.user?.name}</p>
                    <p className="text-xs text-zinc-500 truncate">{session.user?.email}</p>
                  </div>
                </div>

                {/* Token summary */}
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-amber-500/20 bg-amber-500/[0.06]">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-base">🪙</div>
                  <div>
                    <p className="text-amber-300 text-sm font-bold font-mono">{tokens ?? "—"} tokens</p>
                    <p className="text-amber-500/60 text-[10px]">Each quiz costs 11 tokens</p>
                  </div>
                </div>

                <button
                  onClick={() => { signOut(); setMenuOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] hover:bg-rose-500/10 hover:border-rose-500/20 text-zinc-300 hover:text-rose-400 text-sm font-medium transition-all"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <div className="px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-center mb-1">
                  <p className="text-xs text-zinc-500">Sign in to get <span className="text-amber-400 font-bold">🪙 120 tokens</span> free</p>
                </div>
                <button
                  onClick={() => { handleSignIn("github"); setMenuOpen(false); }}
                  disabled={loadingProvider !== null}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 text-sm font-medium transition-all disabled:opacity-50"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  Continue with GitHub
                </button>
                <button
                  onClick={() => { handleSignIn("google"); setMenuOpen(false); }}
                  disabled={loadingProvider !== null}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-900/30 disabled:opacity-50"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button>
              </>
            )}
          </div>
        )}
      </nav>
      <div className="h-14 sm:h-16" />
    </>
  );
}
