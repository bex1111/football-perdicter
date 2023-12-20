export class FootballTeam {
  private _name: string;
  private _homeScores: number[];
  private _awayScores: number[];

  public set getPredictedHomeScore(score: number) {
    this._homeScores.push(score);
  }

  public set getPredictedAwayScore(score: number) {
    this._awayScores.push(score);
  }

  get homeScores(): number[] {
    return this._homeScores
  }

  get awayScores(): number[] {
    return this._awayScores
  }

  get name() {
    return this._name;
  }

  constructor(name: string, initScoreHome: number, initScoreAway: number) {
    this._name = name;
    this._homeScores = [initScoreHome];
    this._awayScores = [initScoreAway];
  }
}
