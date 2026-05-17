import type { MatchRepository } from "./match-repository";
import type { MatchRecommendation, RecentMatchLog } from "../types/match";

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
    posts: [
      {
        postId: 1,
        thumbnailUrl: "/mock/posts/choco-walk-1.jpg",
        caption: "햇살 좋은 날 산책을 다녀왔어요.",
        likeCount: 24,
        commentCount: 5,
        createdAt: "2026-05-04T10:00:00.000Z",
      },
    ],
  },
  {
    dogId: 3,
    name: "보리",
    breed: "시바 믹스",
    gender: "MALE",
    regionSido: "인천광역시",
    size: "MEDIUM",
    weight: 11.6,
    traits: ["INDEPENDENT", "PLAYFUL"],
    walkAmount: "OVER_2H",
    isToiletTrained: true,
    barkingLevel: "MEDIUM",
    canLiveInApartment: false,
    canLiveWithChild: true,
    canLiveWithDog: true,
    canLiveWithCat: false,
    fosterNote: "처음에는 조심스럽지만 산책을 나가면 표정이 밝아지는 아이예요.",
    imageUrls: ["/mock/dogs/bori-1.jpg", "/mock/dogs/bori-2.jpg", "/mock/dogs/bori-3.jpg"],
    matchScore: 74,
    matchReasons: ["아이와 생활 가능", "활동적인 생활 패턴과 잘 맞음"],
    cautionReasons: ["아파트보다는 마당이 있는 집에서 더 편할 수 있어요"],
    posts: [
      {
        postId: 2,
        thumbnailUrl: "/mock/dogs/bori-1.jpg",
        caption: "보리는 산책길에서 표정이 가장 밝아져요.",
        likeCount: 18,
        commentCount: 3,
        createdAt: "2026-05-03T09:30:00.000Z",
      },
    ],
  },
];

const mockRecentMatchLogs: RecentMatchLog[] = mockRecommendations.map((recommendation, index) => ({
  dogId: recommendation.dogId,
  name: recommendation.name,
  breed: recommendation.breed,
  thumbnailUrl: recommendation.imageUrls[0] ?? "",
  matchScore: recommendation.matchScore,
  viewedAt: new Date(Date.now() - index * 1000 * 60 * 30).toISOString(),
}));

export function createMockMatchRepository(): MatchRepository {
  return {
    async getRecommendation(lastDogId) {
      const nextRecommendation =
        mockRecommendations.find((item) => item.dogId !== lastDogId) ?? mockRecommendations[0];

      return nextRecommendation;
    },

    async getRecentMatchLogs(limit = 3) {
      return mockRecentMatchLogs.slice(0, limit);
    },
  };
}
