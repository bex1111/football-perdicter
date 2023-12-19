import { FootballTeam } from "./FootballTeam";
import { League } from "./League";

export class MatchPredict {
  private _homeTeam: FootballTeam;
  private _awayTeam: FootballTeam;

  constructor(_homeTeamName: string, _awayTeamName: string, league: League) {
    this._homeTeam = league.getFootballTeam(_homeTeamName);
    this._awayTeam = league.getFootballTeam(_awayTeamName);
  }

  isMatch(homeScore: number, awayScore: number): boolean {
    return (
      homeScore + awayScore ===
      this._homeTeam.getPredictedHomeScore +
        this._awayTeam.getPredictedAwayScore
    );
  }
}
