import ApiFootballResult from "./ApiFootballResult";

export class ApiFootballTeam {
  private readonly _name: string;
  private _lastPlayedRound: number;
  
  private readonly _homeResults: ApiFootballResult[];
  private readonly _awayResults: ApiFootballResult[];
  
  public get homeResults(): ApiFootballResult[] {
    return this._homeResults;
  }
  
  public get awayResults(): ApiFootballResult[] {
    return this._awayResults;
  }
  
  public get name() {
    return this._name;
  }
  
  public get lastPlayedRound(): number {
    return this._lastPlayedRound;
  }

  constructor(name: string) {
    this._lastPlayedRound = 0;
    this._name = name;
    this._homeResults = [];
    this._awayResults = [];
  }

  public addPredictedHomeResult(
    result: ApiFootballResult,
    roundNumber: number
  ) {
    this._lastPlayedRound = this.calculateLastPlayedRound(roundNumber);
    this._homeResults.push(result);
  }

  public addPredictedAwayResult(
    result: ApiFootballResult,
    roundNumber: number
  ) {
    this._lastPlayedRound = this.calculateLastPlayedRound(roundNumber);
    this._awayResults.push(result);
  }

  private calculateLastPlayedRound(roundNumber: number): number {
    return this._lastPlayedRound < roundNumber
      ? roundNumber
      : this._lastPlayedRound;
  }
}
