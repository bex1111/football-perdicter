/**
 * @deprecated
 */

export class FootballTeam {
  private readonly _name: string;
  private readonly _homeScores: number[];
  private readonly _awayScores: number[];

  public set addPredictedHomeScore(score: number) {
    this._homeScores.push(score);
  }

  public set addPredictedAwayScore(score: number) {
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

  constructor(name: string) {
    this._name = name;
    this._homeScores = [];
    this._awayScores = [];
  }
}
