import { useQuery } from "@tanstack/react-query";

import { adoptionRepository } from "../services";
import { adoptionQueryKeys } from "./adoption-query-keys";

export function useApplicantsQuery() {
  return useQuery({
    queryKey: adoptionQueryKeys.applicants(),
    queryFn: () => adoptionRepository.getApplicants(),
  });
}

export function useMyAdoptionsQuery() {
  return useQuery({
    queryKey: adoptionQueryKeys.mine(),
    queryFn: () => adoptionRepository.getMyAdoptions(),
  });
}
