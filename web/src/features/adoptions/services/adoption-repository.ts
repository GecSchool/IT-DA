import type { AdoptionApplicant, AdoptionStatusUpdate, MyAdoption } from "../types/adoption";
import type { AdoptionCreatePayload } from "../types/adoption-payload";

export interface AdoptionRepository {
  createAdoption(payload: AdoptionCreatePayload): Promise<{ adoptionId: number }>;
  getApplicants(): Promise<AdoptionApplicant[]>;
  updateAdoptionStatus(adoptionId: number, status: AdoptionStatusUpdate): Promise<void>;
  getMyAdoptions(): Promise<MyAdoption[]>;
}
