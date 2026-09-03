import { Link } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { categories } from '../data/categories';

const PHONE_HREF = 'tel:+78615934567';
const PHONE = '+7 (86159) 3-45-67';

export default function Home() {
  return (
    <div className="min-h-full flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-zinc-950 text-white overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-4 py-14 md:py-20 grid md:grid-cols-2 gap-8 items-center">
          <div>
            {/* Label */}
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-8 h-0.5 bg-orange-500 block" />
              <span className="font-display text-xs font-600 tracking-widest text-orange-500 uppercase">
                Краснодарский край
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-700 leading-none tracking-tight mb-4">
              СТРОЙ<span className="text-orange-500 block">МАРКЕТ</span>
            </h1>

            <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 max-w-sm">
              Строительные материалы, инструменты и всё необходимое для ремонта — в одном месте.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-display text-base font-600 px-6 py-3 transition-colors"
              >
                <PhoneIcon />
                {PHONE}
              </a>
              <a
                href="#categories"
                className="inline-flex items-center justify-center gap-2 border border-zinc-700 hover:border-orange-500 text-gray-300 hover:text-white font-display text-base font-600 px-6 py-3 transition-colors"
              >
                Смотреть каталог
                <ArrowDownIcon />
              </a>
            </div>

            {/* Info strips */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-zinc-800 pt-8">
              <div>
                <div className="font-display text-2xl font-700 text-orange-500">8+</div>
                <div className="text-xs text-gray-500 mt-0.5">категорий товаров</div>
              </div>
              <div>
                <div className="font-display text-2xl font-700 text-orange-500">1000+</div>
                <div className="text-xs text-gray-500 mt-0.5">наименований</div>
              </div>
              <div>
                <div className="font-display text-2xl font-700 text-orange-500">6 дн</div>
                <div className="text-xs text-gray-500 mt-0.5">в неделю</div>
              </div>
            </div>
          </div>

          {/* Right side — abstract grid of category images */}
          <div className="hidden md:grid grid-cols-2 gap-2 h-80">
            {categories.slice(0, 4).map((cat) => (
              <div key={cat.slug} className="relative overflow-hidden bg-zinc-900">
                <img
                  src={cat.image}
                  alt={cat.titleShort}
                  className="w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity duration-300"
                />
                <div className="absolute bottom-2 left-2">
                  <span className="font-display text-xs font-600 text-white uppercase tracking-wider bg-black/50 px-1.5 py-0.5">
                    {cat.titleShort}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom orange accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500" />
      </section>

      {/* Categories */}
      <section id="categories" className="bg-white flex-1">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-6 h-0.5 bg-orange-500 block shrink-0" />
            <h2 className="font-display text-2xl sm:text-3xl font-700 text-zinc-950 tracking-tight uppercase">
              Категории товаров
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className="group block bg-white border border-gray-200 hover:border-orange-500 transition-all duration-200 overflow-hidden"
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={cat.image}
                    alt={cat.titleShort}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4">
                  <h3 className="font-display text-base sm:text-lg font-600 text-zinc-950 leading-tight tracking-tight uppercase group-hover:text-orange-500 transition-colors">
                    {cat.titleShort}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 leading-snug line-clamp-2">
                    {cat.subtitle}
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-orange-500 text-xs font-600">
                    <span>Подробнее</span>
                    <ArrowRightIcon />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-orange-500">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-display text-xl sm:text-2xl font-700 text-white uppercase tracking-tight">
              Нужна консультация?
            </p>
            <p className="text-orange-100 text-sm mt-0.5">
              Перезвоним в течение 15 минут
            </p>
          </div>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 font-display text-base font-700 px-6 py-3 transition-colors whitespace-nowrap"
          >
            <PhoneIcon />
            Позвонить сейчас
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.45 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 5.55 5.55l.62-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
