import type { MatchRecommendation } from "../types/match";

export interface MatchRepository {
  getRecommendation(lastDogId?: number): Promise<MatchRecommendation>;
}
