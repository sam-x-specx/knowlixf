export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#080810] text-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="mb-10">
          <p className="text-xs text-indigo-400 font-semibold uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl font-black tracking-tight text-white mb-4">Terms of Service</h1>
          <p className="text-zinc-500 text-sm">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>

        <div className="space-y-8 text-zinc-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-white font-bold text-base mb-2">1. Acceptance of Terms</h2>
            <p>By accessing or using Knowlix, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-base mb-2">2. Use of the Service</h2>
            <p>Knowlix is provided for personal and educational use. You agree not to misuse the service, attempt to reverse engineer it, or use it for any unlawful purpose.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-base mb-2">3. Free and Pro Plans</h2>
            <p>Free accounts may generate quizzes with up to 5 questions. Pro accounts unlock additional features including up to 20 questions per quiz. Subscription fees are billed monthly and are non-refundable unless required by law.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-base mb-2">4. Content You Submit</h2>
            <p>You are responsible for any URLs or PDFs you submit. Do not submit content that is confidential, illegal, or infringes on third-party rights. We process submitted content only to generate quiz questions.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-base mb-2">5. Intellectual Property</h2>
            <p>All content, branding, and code within Knowlix is owned by Knowlix and may not be reproduced without permission. Quiz questions generated are provided for your personal use only.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-base mb-2">6. Limitation of Liability</h2>
            <p>Knowlix is provided as-is without warranties of any kind. We are not liable for any damages arising from use of the service, including inaccuracies in AI-generated quiz content.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-base mb-2">7. Changes to Terms</h2>
            <p>We may update these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
