import type { BarkingLevel, DogSize, DogTrait, Gender, WalkAmount } from "@/features/dogs/types/dog";

export type MatchRecommendation = {
  dogId: number;
  name: string;
  breed: string;
  gender: Gender;
  regionSido: string;
  size: DogSize;
  weight: number;
  traits: DogTrait[];
  walkAmount: WalkAmount;
  isToiletTrained: boolean;
  barkingLevel: BarkingLevel;
  canLiveInApartment: boolean;
  canLiveWithChild: boolean;
  canLiveWithDog: boolean;
  canLiveWithCat: boolean;
  fosterNote: string;
  imageUrls: string[];
  matchScore: number;
  matchReasons: string[];
  cautionReasons: string[];
  posts: {
    postId: number;
    thumbnailUrl: string;
  }[];
};
