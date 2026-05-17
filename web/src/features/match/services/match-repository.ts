import type { MatchRecommendation, RecentMatchLog } from "../types/match";

export interface MatchRepository {
  getRecommendation(lastDogId?: number): Promise<MatchRecommendation>;
  getRecentMatchLogs(limit?: number): Promise<RecentMatchLog[]>;
}
