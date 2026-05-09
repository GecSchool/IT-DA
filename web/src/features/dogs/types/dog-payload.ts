import type { BarkingLevel, DogTrait, Gender, WalkAmount } from "./dog";

export type DogFormPayload = {
  name: string;
  gender: Gender;
  breed: string;
  regionSido: string;
  regionSigungu: string;
  weight: number;
  traits: DogTrait[];
  walkAmount: WalkAmount;
  isToiletTrained: boolean;
  barkingLevel: BarkingLevel;
  isSeparationAnxiety: boolean;
  canLiveInApartment: boolean;
  canLiveWithChild: boolean;
  canLiveWithDog: boolean;
  canLiveWithCat: boolean;
  isNeutered: boolean;
  isVaccinated: boolean;
  hasDisease: boolean;
  diseaseDescription: string | null;
  fosterNote: string;
  imageUrls: string[];
};
