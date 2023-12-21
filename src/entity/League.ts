import { TeamNotFoundExceptions } from "../exception/TeamNotFoundException";
import { FootballTeam } from "./FootballTeam";

export class League {
  private _teams: FootballTeam[];

  constructor() {
    this._teams = [];
  }

  public get teams() {
    return this._teams;
  }

  public addHomeInput(teamName: string, score: number) {
    let footballTeam = this._teams.find((x) => x.name === teamName);
    if (footballTeam) {
      footballTeam.addPredictedHomeScore = score;
    } else {
      this._teams.push(new FootballTeam(teamName, score, 0));
    }
  }

  public addAwayInput(teamName: string, score: number) {
    let footballTeam = this._teams.find((x) => x.name === teamName);
    if (footballTeam) {
      footballTeam.addPredictedAwayScore = score;
    } else {
      this._teams.push(new FootballTeam(teamName, score, 0));
    }
  }

  getFootballTeam(name: string): FootballTeam {
    let team = this._teams.find((x) => x.name);
    if (team) {
      return team;
    }
    throw new TeamNotFoundExceptions(name);
  }
}
