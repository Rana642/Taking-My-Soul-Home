import { LegalPage } from '@/src/components/pages/LegalPage';

export default async function Page({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  return <LegalPage type={type} />;
}
