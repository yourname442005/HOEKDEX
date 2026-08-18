import { PersonDetailView } from '@/features/people/PersonDetailView';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PersonDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <PersonDetailView personId={resolvedParams.id} />;
}
