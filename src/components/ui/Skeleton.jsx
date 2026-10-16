function BookCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl p-2" aria-hidden="true">
      <div className="aspect-[2/3] w-full rounded-2xl bg-sand/80 dark:bg-pk-900/60" />
      <div className="mt-3 h-4 w-3/4 rounded-md bg-sand/80 dark:bg-pk-900/60" />
      <div className="mt-2 h-3 w-1/2 rounded-md bg-sand/80 dark:bg-pk-900/60" />
    </div>
  );
}

export default function BookGridSkeleton({ count = 8 }) {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">Loading books...</span>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 2xl:grid-cols-5">
        {Array.from({ length: count }, (_, index) => (
          <BookCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
