import { Link } from 'react-router-dom';

const VARIANTS = {
  primary: 'bg-pk-700 text-white hover:bg-pk-900 shadow-xs dark:bg-pk-600 dark:hover:bg-pk-500',
  gold: 'bg-gold-500 text-ink hover:bg-gold-400 font-bold shadow-xs',
  secondary: 'bg-white text-pk-700 ring-1 ring-inset ring-pk-700/30 hover:bg-pk-50 dark:bg-pk-950 dark:text-cream dark:ring-pk-800 dark:hover:bg-pk-900',
  ghost: 'text-pk-700 hover:bg-pk-50 dark:text-gold-400 dark:hover:bg-white/10',
  danger: 'bg-truck-500 text-white hover:bg-truck-700',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  children,
  ...rest
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
