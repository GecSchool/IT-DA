"use client";

import { useRouter } from "next/navigation";

import { useMyDogsQuery } from "@/features/dogs/queries";

export function useMyDogsSection() {
  const router = useRouter();
  const myDogsQuery = useMyDogsQuery();

  const handleCreateDog = () => {
    router.push("/dogs/new");
  };

  const handleSelectDog = (dogId: number) => {
    router.push(`/dogs/${dogId}`);
  };

  return {
    dogs: myDogsQuery.data ?? [],
    isLoading: myDogsQuery.isLoading,
    isError: myDogsQuery.isError,
    handleCreateDog,
    handleSelectDog,
  };
}
