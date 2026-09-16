import { Link } from 'react-router';
import { hypotheses } from './hypotheses';

export default function Hub() {
  return (
    <div className="min-h-full bg-zinc-950 text-white">
      <div className="max-w-2xl mx-auto px-4 py-16 md:py-24">
        <p className="font-display text-xs font-600 tracking-widest text-orange-500 uppercase mb-3">
          Стенд гипотез
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-700 tracking-tight uppercase leading-none mb-3">
          Тестирование
        </h1>
        <p className="text-gray-400 text-base leading-relaxed mb-12 max-w-md">
          Выберите гипотезу — откроется отдельный сценарий для проверки.
        </p>

        <ol className="space-y-3">
          {hypotheses.map((item) => {
            const content = (
              <>
                <span className="font-display text-2xl font-700 text-orange-500 tabular-nums w-8 shrink-0">
                  {String(item.id).padStart(2, '0')}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="font-display text-lg sm:text-xl font-600 uppercase tracking-tight block group-hover:text-orange-500 transition-colors">
                    {item.title}
                  </span>
                  <span className="text-sm text-gray-500 mt-1 block leading-snug">{item.description}</span>
                </span>
                {item.status === 'active' ? (
                  <span className="text-orange-500 shrink-0 self-center" aria-hidden>
                    →
                  </span>
                ) : (
                  <span className="text-xs uppercase tracking-wider text-zinc-600 shrink-0 self-center">
                    скоро
                  </span>
                )}
              </>
            );

            if (item.status === 'soon') {
              return (
                <li
                  key={item.id}
                  className="flex items-start gap-4 border border-zinc-800 px-4 py-5 opacity-50"
                >
                  {content}
                </li>
              );
            }

            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className="group flex items-start gap-4 border border-zinc-700 hover:border-orange-500 px-4 py-5 transition-colors"
                >
                  {content}
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
