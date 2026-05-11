"use client";

import { Dog, Plus } from "lucide-react";

import { MyDogCard } from "@/features/dogs/components/my-dog-card";
import { useMyDogsSection } from "@/features/dogs/hooks/use-my-dogs-section";
import { Button, EmptyState, Heading, Spinner, Text } from "@/shared/ui";

export function MyDogListSection() {
  const { dogs, isLoading, isError, handleCreateDog, handleSelectDog } = useMyDogsSection();

  return (
    <section className="flex w-full flex-col gap-lg">
      <header className="flex w-full items-center justify-between gap-md">
        <Heading as="h1" size="lg">
          내 강아지 목록
        </Heading>
        <Button leftIcon={<Plus className="size-4" aria-hidden />} onClick={handleCreateDog}>
          새 강아지 등록
        </Button>
      </header>

      {isLoading ? (
        <div className="flex min-h-56 w-full flex-col items-center justify-center gap-md">
          <Spinner size="lg" />
          <Text weight="medium">강아지 목록을 불러오고 있어요</Text>
        </div>
      ) : null}

      {isError ? (
        <EmptyState title="강아지 목록을 불러오지 못했어요" description="잠시 후 다시 시도해주세요." />
      ) : null}

      {!isLoading && !isError && dogs.length === 0 ? (
        <EmptyState
          title="등록한 강아지가 없어요"
          description="임시보호 중인 강아지를 등록하고 입양 신청을 받아보세요."
          icon={<Dog className="size-8" aria-hidden />}
          action={
            <Button leftIcon={<Plus className="size-4" aria-hidden />} onClick={handleCreateDog}>
              새 강아지 등록
            </Button>
          }
        />
      ) : null}

      {!isLoading && !isError && dogs.length > 0 ? (
        <div className="grid min-h-[460px] w-full auto-rows-max grid-cols-1 content-start gap-lg sm:grid-cols-2 lg:grid-cols-4">
          {dogs.map((dog) => (
            <MyDogCard key={dog.dogId} dog={dog} onClick={handleSelectDog} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
