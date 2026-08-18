import { Suspense } from 'react';
import { TimelineFeed } from '@/features/timeline/TimelineFeed';

export default function TimelinePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-zinc-500">Loading timeline...</div>}>
      <TimelineFeed />
    </Suspense>
  );
}
