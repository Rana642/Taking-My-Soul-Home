// TEMPORARY placeholder to verify the Next.js + Tailwind v4 + fonts toolchain.
// Replaced by the real HomePage once components are ported (plan Step 5).
export default function Page() {
  return (
    <main className="animate-fadeIn flex-1 flex items-center justify-center px-6 py-24">
      <div className="text-center space-y-4 max-w-lg">
        <span className="inline-block px-3.5 py-1.5 rounded-full bg-brand-teal-dark/10 border border-brand-teal-dark/25 text-brand-teal-dark text-xs font-semibold uppercase tracking-wider">
          Next.js migration — toolchain check
        </span>
        <h1 className="font-serif-heading text-4xl sm:text-5xl font-bold text-brand-teal-dark">
          Taking My Soul Home
        </h1>
        <p className="text-ink/70 leading-relaxed">
          Next.js 16 App Router is live. Tailwind v4 theme, Higuen headings, and
          Open Sans body are all rendering. Component port is next.
        </p>
        <p className="font-arabic text-2xl text-brand-teal-dark pt-2" dir="rtl">
          أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ
        </p>
      </div>
    </main>
  );
}
