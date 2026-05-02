import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#080810] mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-2.5">
            {/* <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div> */}
            <span className="text-sm font-black tracking-tight text-white">
              Know<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">lix</span>
            </span>
          </div>

          <div className="flex items-center gap-5 sm:gap-6">
            <Link href="/privacy" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Terms</Link>
            <Link href="/contact" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Contact</Link>
          </div>

          <p className="text-xs text-zinc-700">
            {`\u00A9 ${new Date().getFullYear()} Knowlix. All rights reserved.`}
          </p>

        </div>
      </div>
    </footer>
  );
}
