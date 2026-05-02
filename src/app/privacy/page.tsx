export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#080810] text-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="mb-10">
          <p className="text-xs text-indigo-400 font-semibold uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl font-black tracking-tight text-white mb-4">Privacy Policy</h1>
          <p className="text-zinc-500 text-sm">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>

        <div className="space-y-8 text-zinc-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-white font-bold text-base mb-2">1. Information We Collect</h2>
            <p>When you sign in via Google or GitHub, we collect your name, email address, and profile picture provided by those services. We do not collect passwords or payment information directly.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-base mb-2">2. How We Use Your Information</h2>
            <p>Your information is used solely to authenticate your account, personalize your experience, and display your profile within the app. We do not sell or share your data with third parties.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-base mb-2">3. URLs and PDF Content</h2>
            <p>URLs and PDF content you submit are processed temporarily to generate quiz questions using AI. We do not store this content after your session ends.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-base mb-2">4. Cookies</h2>
            <p>We use session cookies to keep you signed in. These cookies are strictly necessary for the service to function and are not used for advertising or tracking.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-base mb-2">5. Data Retention</h2>
            <p>Account data is retained as long as your account is active. You may request deletion of your account and all associated data at any time by contacting us.</p>
          </section>
          <section>
            <h2 className="text-white font-bold text-base mb-2">6. Contact</h2>
            <p>For privacy-related questions, please contact us at <a href="mailto:hello@knowlix.app?subject=Support Request&body=Hi Knowlix Team," className="text-indigo-400 hover:text-indigo-300 transition-colors">privacy@knowlix.app</a>.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
