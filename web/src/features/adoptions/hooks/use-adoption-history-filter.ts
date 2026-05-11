"use client";

import { useState } from "react";

import type { AdoptionStatus } from "@/features/adoptions/types/adoption";

export type AdoptionHistoryFilter =
  | "ALL"
  | Extract<AdoptionStatus, "PENDING" | "ACCEPTED" | "REJECTED">;

export function useAdoptionHistoryFilter() {
  const [selectedStatus, setSelectedStatus] = useState<AdoptionHistoryFilter>("ALL");

  return {
    selectedStatus,
    selectStatus: setSelectedStatus,
  };
}
