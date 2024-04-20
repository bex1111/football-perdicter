import TeamNotFoundExceptions from "../exception/TeamNotFoundException";
import { ApiFootballInputType } from "../type/ApiFootballInputType";
import ApiFootballMatch from "./ApiFootballMatch";
import ApiFootballResult from "./ApiFootballResult";
import ApiFootballTeam from "./ApiFootballTeam";

export default class ApiFootballLeague {
  private readonly _teams: ApiFootballTeam[];
  private readonly _matches: ApiFootballMatch[];

  constructor(playedRounds: ApiFootballInputType[]) {
    this._teams = [];
    playedRounds.forEach((x) => this.addHomeInput(x));
    playedRounds.forEach((x) => this.addAwayInput(x));
    this._matches = playedRounds.map(this.createApiFootballMatch);
  }

  private createApiFootballMatch(apiFootballInputType: ApiFootballInputType) {
    return new ApiFootballMatch(
      apiFootballInputType.match_status,
      apiFootballInputType.match_hometeam_name,
      apiFootballInputType.match_hometeam_score,
      apiFootballInputType.match_awayteam_name,
      apiFootballInputType.match_awayteam_score,
      apiFootballInputType.match_round
    );
  }

  public get teams() {
    return this._teams;
  }

  private addHomeInput(playedMatch: ApiFootballInputType) {
    let footballTeam = this._teams.find(
      (x) => x.name === playedMatch.match_hometeam_name
    );
    if (!footballTeam) {
      footballTeam = new ApiFootballTeam(playedMatch.match_hometeam_name);
      this._teams.push(footballTeam);
    }
    footballTeam.addHomeResult(
      ApiFootballResult.generateHomeResult(playedMatch),
      Number(playedMatch.match_round)
    );
  }

  private addAwayInput(playedMatch: ApiFootballInputType) {
    let footballTeam = this._teams.find(
      (x) => x.name === playedMatch.match_awayteam_name
    );
    if (footballTeam) {
      footballTeam.addAwayResult(
        ApiFootballResult.generateAwayResult(playedMatch),
        Number(playedMatch.match_round)
      );
    }
  }

  public getFootballTeam(name: string): ApiFootballTeam {
    let team = this._teams.find((x) => x.name === name);
    if (team) {
      return team;
    }
    throw new TeamNotFoundExceptions(name);
  }

  public calculateLastPlayedRoundNumber(): number {
    return Math.max.apply(
      null,
      this._matches.filter((x) => x.isFinished).map((x) => x.roundNumber)
    );
  }

  public getRound(roundNumber: number): ApiFootballMatch[] {
    return this._matches.filter((x) => x.roundNumber === roundNumber);
  }
}
