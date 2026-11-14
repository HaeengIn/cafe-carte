import Loading from "@/app/Loading";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{ member: string }>;
}

export async function BuildDetail({ params }: PageProps) {
  const { member } = await params;

  return <div>{/* 콘텐츠 */}</div>;
}

export default async function MemberDetail({ params }: PageProps) {
  return (
    <Suspense fallback={<Loading />}>
      <BuildDetail params={params} />
    </Suspense>
  );
}
