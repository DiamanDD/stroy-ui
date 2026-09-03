import BrandName from './BrandName';
import { CONTACT, LOCATION, SITE, WORKING_HOURS } from '../constants/site';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <BrandName className="font-display text-2xl font-700 tracking-wide mb-3" />
          <p className="text-gray-400 text-sm leading-relaxed">{SITE.description}</p>
        </div>

        {/* Contacts */}
        <div>
          <h3 className="font-display text-sm font-600 tracking-widest text-orange-500 uppercase mb-3">Контакты</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href={CONTACT.phoneHref} className="hover:text-orange-400 transition-colors">
                {CONTACT.phone}
              </a>
            </li>
            <li>{LOCATION.full}</li>
            <li>
              <a href={CONTACT.emailHref} className="hover:text-orange-400 transition-colors">
                {CONTACT.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h3 className="font-display text-sm font-600 tracking-widest text-orange-500 uppercase mb-3">Режим работы</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            {WORKING_HOURS.map(({ days, hours }) => (
              <li key={days} className="flex justify-between gap-4">
                <span>{days}</span>
                <span className="text-white font-500">{hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center text-xs text-gray-600">
          © {SITE.copyrightYear} {SITE.name}. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
