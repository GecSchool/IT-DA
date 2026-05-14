import { notFound } from "next/navigation";

import { DogEditSection } from "@/features/dogs/components/dog-edit-section";

type DogEditPageProps = {
  params: Promise<{
    dogId: string;
  }>;
};

export default async function DogEditPage({ params }: DogEditPageProps) {
  const { dogId } = await params;
  const numericDogId = Number(dogId);

  if (!Number.isInteger(numericDogId) || numericDogId <= 0) {
    notFound();
  }

  return (
    <section className="flex w-full max-w-[900px] justify-center">
      <DogEditSection />
    </section>
  );
}