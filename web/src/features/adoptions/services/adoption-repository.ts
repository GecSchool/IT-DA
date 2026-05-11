import type { AdoptionApplicant, AdoptionStatusUpdate, MyAdoption } from "../types/adoption";
import type { AdoptionCreatePayload, AdoptionUpdatePayload } from "../types/adoption-payload";

export interface AdoptionRepository {
  createAdoption(payload: AdoptionCreatePayload): Promise<{ adoptionId: number }>;
  updateAdoption(adoptionId: number, payload: AdoptionUpdatePayload): Promise<void>;
  deleteAdoption(adoptionId: number): Promise<void>;
  getApplicants(): Promise<AdoptionApplicant[]>;
  updateAdoptionStatus(adoptionId: number, status: AdoptionStatusUpdate): Promise<void>;
  getMyAdoptions(): Promise<MyAdoption[]>;
}
