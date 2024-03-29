import { ApiFootballStatisticType } from "./ApiFootballStatisticType";

export type ApiFootballInputType = {
  match_id: number;
  match_round: number;
  match_date: string;
  match_hometeam_name: string;
  match_awayteam_name: string;
  match_hometeam_score: number ;
  match_hometeam_halftime_score: number;
  match_awayteam_score: number ;
  match_awayteam_halftime_score: number ;
  statistics: ApiFootballStatisticType[];
};