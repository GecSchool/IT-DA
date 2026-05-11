"use client";

import { useMemo, useState } from "react";

import type { MyAdoption } from "@/features/adoptions/types/adoption";

type AdoptionFormMode = "create" | "edit";

export function useAdoptionHistoryModal(adoptions: MyAdoption[]) {
  const [selectedAdoptionId, setSelectedAdoptionId] = useState<number | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [formMode, setFormMode] = useState<AdoptionFormMode>("edit");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const selectedAdoption = useMemo(
    () => adoptions.find((adoption) => adoption.adoptionId === selectedAdoptionId) ?? null,
    [adoptions, selectedAdoptionId]
  );

  const openDetail = (adoption: MyAdoption) => {
    setSelectedAdoptionId(adoption.adoptionId);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
  };

  const openEditForm = () => {
    setFormMode("edit");
    setIsDetailOpen(false);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return {
    selectedAdoption,
    formMode,
    isDetailOpen,
    isFormOpen,
    openDetail,
    closeDetail,
    openEditForm,
    closeForm,
  };
}
