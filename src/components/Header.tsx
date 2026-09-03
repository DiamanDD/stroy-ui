import { Link } from 'react-router';

const PHONE = '+7 (86159) 3-45-67';
const PHONE_HREF = 'tel:+78615934567';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="font-display text-xl font-700 tracking-wide text-zinc-950 leading-none">
            СТРОЙ<span className="text-orange-500">МАРКЕТ</span>
          </span>
        </Link>

        {/* Desktop phone */}
        <a
          href={PHONE_HREF}
          className="hidden sm:flex items-center gap-2 font-display text-base font-600 text-zinc-950 hover:text-orange-500 transition-colors"
        >
          <PhoneIcon />
          {PHONE}
        </a>

        {/* Mobile call button */}
        <a
          href={PHONE_HREF}
          className="sm:hidden flex items-center gap-1.5 bg-orange-500 text-white font-display text-sm font-600 px-3 py-1.5 rounded"
        >
          <PhoneIcon />
          Позвонить
        </a>
      </div>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.45 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 5.55 5.55l.62-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}
