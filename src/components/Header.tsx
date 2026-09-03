import { Link } from 'react-router';
import BrandName from './BrandName';
import PhoneIcon from './PhoneIcon';
import { CONTACT } from '../constants/site';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <BrandName className="font-display text-xl font-700 tracking-wide text-zinc-950 leading-none" />
        </Link>

        {/* Desktop phone */}
        <a
          href={CONTACT.phoneHref}
          className="hidden sm:flex items-center gap-2 font-display text-base font-600 text-zinc-950 hover:text-orange-500 transition-colors"
        >
          <PhoneIcon />
          {CONTACT.phone}
        </a>

        {/* Mobile call button */}
        <a
          href={CONTACT.phoneHref}
          className="sm:hidden flex items-center gap-1.5 bg-orange-500 text-white font-display text-sm font-600 px-3 py-1.5 rounded"
        >
          <PhoneIcon />
          Позвонить
        </a>
      </div>
    </header>
  );
}
