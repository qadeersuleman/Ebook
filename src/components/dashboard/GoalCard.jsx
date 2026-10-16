import ProgressBar from '../ui/ProgressBar.jsx';
import Icon from '../ui/Icon.jsx';
import { useLibrary } from '../../context/useLibrary.js';

export default function GoalCard() {
  const { stats, setGoal } = useLibrary();
  const year = stats.year;
  const isGoalReached = stats.goalPercent >= 100;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pk-800 to-pk-900 p-6 text-white shadow-md ring-1 ring-gold-400/20">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-extrabold">
          <Icon name="flame" className="h-5 w-5 text-gold-400" />
          <span>{year} Reading Goal</span>
        </h2>
        <span className="rounded-full bg-gold-400 px-2.5 py-0.5 text-xs font-black text-ink shadow-xs">
          {stats.goalPercent}%
        </span>
      </div>

      <p className="mt-1 text-sm text-pk-100">
        {stats.finishedThisYear} of {stats.goal} books finished
      </p>

      {isGoalReached && (
        <div className="mt-3 flex items-center gap-1.5 rounded-xl bg-gold-400/20 px-3 py-1 text-xs font-bold text-gold-300">
          <Icon name="sparkles" className="h-4 w-4" />
          <span>Mubarak! You reached your {year} reading goal!</span>
        </div>
      )}

      <div className="mt-4">
        <ProgressBar
          value={stats.goalPercent}
          label={`Progress towards your ${year} reading goal`}
          trackClassName="bg-white/20"
          barClassName="bg-gold-400"
        />
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="text-xs font-bold uppercase tracking-wider text-pk-100/80">
          Yearly Target
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setGoal(Math.max(1, stats.goal - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15 text-white transition-colors hover:bg-white/25"
            aria-label="Decrease goal"
          >
            <Icon name="minus" className="h-4 w-4" />
          </button>
          <span className="min-w-8 text-center text-sm font-black text-gold-400">
            {stats.goal}
          </span>
          <button
            type="button"
            onClick={() => setGoal(stats.goal + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15 text-white transition-colors hover:bg-white/25"
            aria-label="Increase goal"
          >
            <Icon name="plus" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
