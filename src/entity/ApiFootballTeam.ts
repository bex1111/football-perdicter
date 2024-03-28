import ApiFootballResult from "./ApiFootballResult";

export class ApiFootballTeam {
  private readonly _name: string;
  private lastPlayedRound: number;
  private readonly _homeResults: ApiFootballResult[];
  private readonly _awayResults: ApiFootballResult[];

  get homeResults(): ApiFootballResult[] {
    return this._homeResults;
  }

  get awayResults(): ApiFootballResult[] {
    return this._awayResults;
  }

  get name() {
    return this._name;
  }

  constructor(name: string) {
    this.lastPlayedRound = 0;
    this._name = name;
    this._homeResults = [];
    this._awayResults = [];
  }

  public addPredictedHomeResult(
    result: ApiFootballResult,
    roundNumber: number
  ) {
    this.lastPlayedRound = roundNumber;
    this._homeResults.push(result);
  }

  public addPredictedAwayResult(
    result: ApiFootballResult,
    roundNumber: number
  ) {
    this.lastPlayedRound = roundNumber;
    this._awayResults.push(result);
  }
}
