import type { BarkingLevel, DogSize, DogTrait, Gender, WalkAmount } from "@/features/dogs/types/dog";
import type { DogPostSummary } from "@/features/posts/types/post";

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
  posts: DogPostSummary[];
};

export type RecentMatchLog = {
  dogId: number;
  name: string;
  breed: string;
  thumbnailUrl: string;
  matchScore: number;
  viewedAt: string;
};
