'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { LoadingState } from '@/components/loading-state';
import { ErrorState } from '@/components/error-state';

export function AgentsView() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return <div>{JSON.stringify(data, null, 2)}</div>;
}

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title='Loading agents'
      description='This may take few seconds'
    />
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title='Failed to load agents'
      description="It's not you, it's us. Please try again later."
    />
  );
};
