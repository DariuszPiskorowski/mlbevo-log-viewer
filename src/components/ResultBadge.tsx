import { getResultVariant } from '@/lib/logParser';
import { cn } from '@/lib/utils';

interface ResultBadgeProps {
  value: string;
  className?: string;
}

const variantStyles = {
  pass: 'bg-pass-muted text-pass border border-pass/20',
  fail: 'bg-fail-muted text-fail border border-fail/20',
  warn: 'bg-warn-muted text-warn border border-warn/20',
};

export function ResultBadge({ value, className }: ResultBadgeProps) {
  const variant = getResultVariant(value);
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold font-mono',
        variantStyles[variant],
        className
      )}
    >
      {value}
    </span>
  );
}
