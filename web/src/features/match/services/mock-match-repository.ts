import type { MatchRepository } from "./match-repository";
import type { MatchRecommendation } from "../types/match";

const mockRecommendations: MatchRecommendation[] = [
  {
    dogId: 1,
    name: "초코",
    breed: "믹스",
    gender: "FEMALE",
    regionSido: "서울특별시",
    size: "MEDIUM",
    weight: 8.2,
    traits: ["ACTIVE", "AFFECTIONATE"],
    walkAmount: "1H",
    isToiletTrained: true,
    barkingLevel: "LOW",
    canLiveInApartment: true,
    canLiveWithChild: true,
    canLiveWithDog: true,
    canLiveWithCat: false,
    fosterNote: "사람을 좋아하고 산책을 즐기는 밝은 아이예요.",
    imageUrls: ["/mock/dogs/choco-1.jpg", "/mock/dogs/choco-2.jpg"],
    matchScore: 87,
    matchReasons: ["아파트 생활 가능", "선호하는 성격과 잘 맞음"],
    cautionReasons: ["하루 1시간 정도 산책 시간이 필요해요"],
    posts: [{ postId: 1, thumbnailUrl: "/mock/posts/choco-walk-1.jpg" }],
  },
];

export function createMockMatchRepository(): MatchRepository {
  return {
    async getRecommendation(lastDogId) {
      const nextRecommendation =
        mockRecommendations.find((item) => item.dogId !== lastDogId) ?? mockRecommendations[0];

      return nextRecommendation;
    },
  };
}
