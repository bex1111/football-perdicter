export type ApiFootballInputType = {
  match_id: number;
  match_round: number;
  match_date: string;
  match_hometeam_name: string;
  match_awayteam_name: string;
  match_hometeam_score: number | null;
  match_hometeam_halftime_score: number | null;
  match_awayteam_score: number | null;
  match_awayteam_halftime_score: number | null;
  statistics: Statistic[];
};

type Statistic = {
  type: string;
  home: string;
  away: string;
};
