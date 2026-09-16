import { Link } from 'react-router';
import { buttonVariants } from '@/hypotheses/plenka/components/ui/button';
import { cn } from '@/hypotheses/plenka/lib/utils';
import { plenkaPath } from '@/hypotheses/plenka/paths';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">404</p>
      <h1 className="font-heading mt-3 text-3xl">Такой серии в прайсе нет</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Вернитесь к каталогу плёнки — там агросерии, ГОСТ и мульча для клубники.
      </p>
      <Link to={plenkaPath()} className={cn(buttonVariants(), 'mt-6 h-10 px-4')}>
        К прайсу
      </Link>
    </div>
  );
}
