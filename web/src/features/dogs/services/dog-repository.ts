import type { DogDetail, MyDogSummary, RecentDogSummary } from "../types/dog";
import type { DogFormPayload } from "../types/dog-payload";

export interface DogRepository {
  createDog(payload: DogFormPayload): Promise<{ dogId: number }>;
  getMyDogs(): Promise<MyDogSummary[]>;
  getRecentDogs(limit?: number): Promise<RecentDogSummary[]>;
  getDogDetail(dogId: number): Promise<DogDetail>;
  updateDog(dogId: number, payload: DogFormPayload): Promise<void>;
  deleteDog(dogId: number): Promise<void>;
  completeDog(dogId: number): Promise<void>;
}
