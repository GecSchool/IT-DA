import { notFound } from "next/navigation";

import { DogDetailSection } from "@/features/dogs/components/dog-detail-section";
import { DogPostGridSection } from "@/features/posts/components/dog-post-grid-section";

type DogDetailPageProps = {
  params: Promise<{
    dogId: string;
  }>;
};

export default async function DogDetailPage({ params }: DogDetailPageProps) {
  const { dogId } = await params;
  const numericDogId = Number(dogId);

  if (!Number.isInteger(numericDogId) || numericDogId <= 0) {
    notFound();
  }

  return (
    <section className="flex w-full max-w-[900px] flex-col gap-lg">
      <DogDetailSection dogId={numericDogId} />
      <DogPostGridSection dogId={numericDogId} />
    </section>
  );
}
