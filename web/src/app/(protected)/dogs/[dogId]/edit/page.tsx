import { notFound } from "next/navigation";

import { DogRegisterForm } from "@/features/dogs/components/dog-register-form";

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
    <section className="flex w-full max-w-[900px] flex-col items-center gap-lg">
      <div className="flex w-full max-w-[560px] flex-col gap-md">
        <h1 className="text-2xl font-semibold text-foreground">
          강아지 정보 수정
        </h1>
        <p className="text-sm text-muted-foreground">
          기존 강아지 정보를 수정해 주세요.
        </p>
      </div>

      <DogRegisterForm />
    </section>
  );
}