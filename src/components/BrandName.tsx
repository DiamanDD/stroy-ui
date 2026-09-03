import { SITE } from '../constants/site';

interface BrandNameProps {
  className?: string;
  accentClassName?: string;
}

export default function BrandName({
  className,
  accentClassName = 'text-orange-500',
}: BrandNameProps) {
  return (
    <span className={className}>
      {SITE.namePrimary}
      <span className={accentClassName}>{SITE.nameAccent}</span>
    </span>
  );
}
