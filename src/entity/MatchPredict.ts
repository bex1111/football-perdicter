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
      this.getPredictedHomeScore +
        this.getPredictedAwayScore
    );
  }

  get getPredictedHomeScore() {
    return this.calculatePredictedScore(this._homeTeam.homeScores);
  }

  get getPredictedAwayScore() {
    return this.calculatePredictedScore(this._awayTeam.awayScores);
  }

  public calculatePredictedScore(scores: number[]) {
    let sum = 0;
    let divider = 0;
    for (let i = 0; i < scores.length; i++) {
      divider += i;
      sum += scores[i] * i;
    }
    return Math.round(sum / divider);
  }

}
