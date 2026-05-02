export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#080810] text-white">
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="mb-10">
          <p className="text-xs text-indigo-400 font-semibold uppercase tracking-widest mb-3">Support</p>
          <h1 className="text-4xl font-black tracking-tight text-white mb-4">Contact Us</h1>
          <p className="text-zinc-400 text-sm leading-relaxed">Have a question, bug report, or feedback? We would love to hear from you.</p>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 flex items-start gap-4">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-white mb-1">Email</p>
<a 
  href="mailto:hello@knowlix.app?subject=Support Request&body=Hi Knowlix Team," 
  className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
>
  hello@knowlix.app
</a>
              <p className="text-xs text-zinc-600 mt-1">We reply within 24 hours</p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
            <p className="text-sm font-semibold text-white mb-1">Response Time</p>
            <p className="text-sm text-zinc-400 leading-relaxed">Our team is small but responsive. Most queries are answered within one business day. For urgent issues please include your account email in the message.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
