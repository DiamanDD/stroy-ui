const PHONE = '+7 (86159) 3-45-67';
const PHONE_HREF = 'tel:+78615934567';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="font-display text-2xl font-700 tracking-wide mb-3">
            СТРОЙ<span className="text-orange-500">МАРКЕТ</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Строительные материалы, инструменты и всё для ремонта. Быстрая помощь в подборе и доставка по региону.
          </p>
        </div>

        {/* Contacts */}
        <div>
          <h3 className="font-display text-sm font-600 tracking-widest text-orange-500 uppercase mb-3">Контакты</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href={PHONE_HREF} className="hover:text-orange-400 transition-colors">
                {PHONE}
              </a>
            </li>
            <li>Краснодарский край, г. Горячий Ключ</li>
            <li>
              <a href="mailto:info@stroymarket.ru" className="hover:text-orange-400 transition-colors">
                info@stroymarket.ru
              </a>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h3 className="font-display text-sm font-600 tracking-widest text-orange-500 uppercase mb-3">Режим работы</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li className="flex justify-between gap-4">
              <span>Понедельник–пятница</span>
              <span className="text-white font-500">8:00–19:00</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Суббота</span>
              <span className="text-white font-500">8:00–18:00</span>
            </li>
            <li className="flex justify-between gap-4">
              <span>Воскресенье</span>
              <span className="text-white font-500">9:00–16:00</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-4 text-center text-xs text-gray-600">
          © 2024 СТРОЙМАРКЕТ. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
