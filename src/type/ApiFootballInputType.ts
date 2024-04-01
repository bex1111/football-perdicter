import { ApiFootballStatisticType } from "./ApiFootballStatisticType";

export type ApiFootballInputType = {
  match_id: string;
  match_round: string;
  match_status: string
  match_date: string;
  match_hometeam_name: string;
  match_awayteam_name: string;
  match_hometeam_score: string ;
  match_hometeam_halftime_score: string;
  match_awayteam_score: string ;
  match_awayteam_halftime_score: string ;
  statistics: ApiFootballStatisticType[];
  statistics_1half: ApiFootballStatisticType[];
};