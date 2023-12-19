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

  get name() {
    return this._name;
  }

  get getPredictedHomeScore() {
    return this.calculatePredictedScore(this._homeScores);
  }

  private calculatePredictedScore(scores: number[]) {
    let sum = 0;
    let divider = 0;
    for (let i = 0; i < scores.length; i++) {
      divider += i;
      sum += scores[i] * i;
    }
    return Math.round(sum / divider);
  }

  get getPredictedAwayScore() {
    return this.calculatePredictedScore(this._awayScores);
  }

  constructor(name: string, initScoreHome: number, initScoreAway: number) {
    this._name = name;
    this._homeScores = [initScoreHome];
    this._awayScores = [initScoreAway];
  }
}
