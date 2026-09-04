import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PhoneIcon from '../components/PhoneIcon';
import { CALLBACK, CONTACT } from '../constants/site';
import { getCategoryBySlug } from '../data/categories';
import { normalizeFio, sanitizeFioInput, validateFio } from '../lib/fioValidation';
import { isCompletePhone, phoneMaskOnChange, phoneMaskOnFocus, phoneToE164 } from '../lib/phoneMask';
import { reachGoal, YM_GOALS } from '../lib/metrika';
import { submitLead } from '../lib/submitLead';

interface FormState {
  name: string;
  phone: string;
  message: string;
  website: string;
}

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getCategoryBySlug(slug) : undefined;

  const [form, setForm] = useState<FormState>({ name: '', phone: '', message: '', website: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<Partial<FormState>>({});

  if (!category) return <Navigate to="/" replace />;

  function validate(): boolean {
    const next: Partial<FormState> = {};
    const nameError = validateFio(form.name);
    if (nameError) next.name = nameError;
    if (!form.phone.trim()) next.phone = 'Введите телефон';
    else if (!isCompletePhone(form.phone)) next.phone = 'Введите номер полностью';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError('');
    if (!validate() || !category) return;
    setSubmitting(true);
    try {
      await submitLead({
        name: normalizeFio(form.name),
        phone: phoneToE164(form.phone),
        message: form.message.trim(),
        category: category.title,
        website: form.website,
      });
      reachGoal(YM_GOALS.leadSubmit, { category: category.title });
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Не удалось отправить заявку');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-full flex flex-col">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-orange-500 transition-colors">Главная</Link>
          <span>/</span>
          <span className="text-zinc-950 font-500">{category.titleShort}</span>
        </div>
      </div>

      {/* Category hero */}
      <div className="relative bg-zinc-900 overflow-hidden">
        <img
          src={category.image}
          alt={category.title}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-16">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white text-sm mb-6 transition-colors"
          >
            <BackIcon />
            Все категории
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-700 text-white leading-none tracking-tight uppercase">
            {category.title}
          </h1>
          <div className="mt-3 w-16 h-1 bg-orange-500" />
          <p className="mt-4 text-gray-300 text-base sm:text-lg max-w-xl">
            {category.description}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-white pb-20 md:pb-0">
        <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10 lg:gap-16">

          {/* Products list */}
          <div>
            <h2 className="font-display text-xl font-700 text-zinc-950 uppercase tracking-tight mb-5 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-orange-500 block shrink-0" />
              Ассортимент
            </h2>
            <ul className="space-y-0 divide-y divide-gray-100">
              {category.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 py-3">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                  <span className="text-zinc-800 text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>

            {/* Desktop call CTA */}
            <div className="hidden md:block mt-8 p-5 bg-zinc-950 text-white">
              <p className="font-display text-lg font-700 uppercase tracking-tight mb-1">
                Уточнить наличие и цену
              </p>
              <p className="text-gray-400 text-sm mb-4">
                Позвоните нам — ответим на любые вопросы
              </p>
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-display text-base font-600 px-5 py-3 transition-colors"
              >
                <PhoneIcon />
                {CONTACT.phone}
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="font-display text-xl font-700 text-zinc-950 uppercase tracking-tight mb-5 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-orange-500 block shrink-0" />
              Оставить заявку
            </h2>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 p-6 text-center">
                <div className="text-3xl mb-3">✓</div>
                <p className="font-display text-lg font-600 text-zinc-950 uppercase">Заявка принята!</p>
                <p className="text-gray-600 text-sm mt-2">{CALLBACK.successMessage}</p>
                <button
                  onClick={() => { setSubmitted(false); setSubmitError(''); setForm({ name: '', phone: '', message: '', website: '' }); }}
                  className="mt-4 text-sm text-orange-500 hover:text-orange-600 underline"
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4 relative">
                <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="website">Сайт</label>
                  <input
                    id="website"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-600 text-zinc-600 uppercase tracking-wider mb-1.5">
                    Имя и отчество <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    autoComplete="name"
                    spellCheck={false}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: sanitizeFioInput(e.target.value) })}
                    onBlur={() => {
                      if (form.name.trim()) {
                        setForm({ ...form, name: normalizeFio(form.name) });
                      }
                    }}
                    placeholder="Иван Иванович"
                    className={`w-full border px-3 py-2.5 text-sm text-zinc-900 placeholder-gray-400 outline-none focus:border-orange-500 transition-colors ${
                      errors.name ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-600 text-zinc-600 uppercase tracking-wider mb-1.5">
                    Телефон <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onFocus={() => {
                      const masked = phoneMaskOnFocus(form.phone);
                      if (masked !== form.phone) {
                        setForm({ ...form, phone: masked });
                      }
                    }}
                    onChange={(e) => setForm({ ...form, phone: phoneMaskOnChange(e.target.value) })}
                    placeholder={CONTACT.phonePlaceholder}
                    className={`w-full border px-3 py-2.5 text-sm text-zinc-900 placeholder-gray-400 outline-none focus:border-orange-500 transition-colors ${
                      errors.phone ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-600 text-zinc-600 uppercase tracking-wider mb-1.5">
                    Комментарий
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Уточните, что вас интересует..."
                    rows={4}
                    className="w-full border border-gray-300 px-3 py-2.5 text-sm text-zinc-900 placeholder-gray-400 outline-none focus:border-orange-500 transition-colors resize-none"
                  />
                </div>

                {submitError && <p className="text-sm text-red-500">{submitError}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-display text-base font-600 py-3 uppercase tracking-wide transition-colors"
                >
                  {submitting ? 'Отправка...' : 'Отправить заявку'}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                </p>
              </form>
            )}

            {/* Or call divider */}
            <div className="mt-6 flex items-center gap-3">
              <span className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">или позвоните нам</span>
              <span className="flex-1 h-px bg-gray-200" />
            </div>

            <a
              href={CONTACT.phoneHref}
              className="mt-4 flex items-center justify-center gap-2 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-display text-base font-600 py-3 uppercase tracking-wide transition-colors"
            >
              <PhoneIcon />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Mobile sticky call bar */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-white border-t border-gray-200 p-3 flex gap-2">
        <a
          href={CONTACT.phoneHref}
          className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-display text-base font-600 py-3 transition-colors"
        >
          <PhoneIcon />
          Позвонить
        </a>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' }); }}
          className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-zinc-950 font-display text-sm font-600 py-3 transition-colors"
        >
          Оставить заявку
        </a>
      </div>

      <Footer />
    </div>
  );
}

function BackIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}
