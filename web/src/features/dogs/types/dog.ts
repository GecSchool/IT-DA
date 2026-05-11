export type Gender = "MALE" | "FEMALE";
export type DogSize = "SMALL" | "MEDIUM" | "LARGE";
export type DogTrait =
  | "ACTIVE"
  | "CALM"
  | "AFFECTIONATE"
  | "INDEPENDENT"
  | "SEPARATION_ANXIETY"
  | "FRIENDLY_TO_STRANGERS"
  | "TIMID"
  | "PLAYFUL";
export type WalkAmount = "UNDER_30M" | "1H" | "OVER_2H";
export type BarkingLevel = "LOW" | "MEDIUM" | "HIGH";
export type DogStatus = "AVAILABLE" | "ADOPTED";
export type ViewerAdoptionStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETE";

export type ViewerAdoption = {
  adoptionId: number;
  status: ViewerAdoptionStatus;
};

export type DogDetail = {
  dogId: number;
  isMine: boolean;
  viewerAdoption: ViewerAdoption | null;
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
  size: DogSize;
  status: DogStatus;
  applicationCount: number;
};

export type MyDogSummary = {
  dogId: number;
  name: string;
  thumbnailUrl: string;
  status: DogStatus;
  applicationCount: number;
};

export type RecentDogSummary = {
  dogId: number;
  name: string;
  thumbnailUrl: string;
};
