import Icon from '../ui/Icon.jsx';

export default function StatCard({ icon, label, value, tone = 'bg-pk-100 text-pk-900' }) {
  return (
    <div className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-xs ring-1 ring-sand/80 transition-all hover:shadow-md dark:bg-[#0d1a13] dark:ring-pk-800">
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-xs ${tone}`}>
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <div>
        <p className="text-3xl font-extrabold leading-none text-pk-900 dark:text-cream">{value}</p>
        <p className="mt-1.5 text-xs font-semibold text-ink-soft dark:text-pk-100/70">{label}</p>
      </div>
    </div>
  );
}
