export default class ApiFootballMatch {
  private readonly _isFinished: boolean;
  private readonly _homeTeamName: string;
  private readonly _homeTeamGoalNumber: number;
  private readonly _awayTeamName: string;
  private readonly _awayTeamGoalNumber: number;

  private readonly _roundNumber: number;

  public get isFinished() {
    return this._isFinished;
  }

  public get roundNumber() {
    return this._roundNumber;
  }

  public get homeTeamName() {
    return this._homeTeamName;
  }

  public get homeTeamGoalNumber() {
    return this._homeTeamGoalNumber;
  }

  public get awayTeamName() {
    return this._awayTeamName;
  }

  public get awayTeamGoalNumber() {
    return this._awayTeamGoalNumber;
  }

  constructor(
    isFinished: string,
    homeTeamName: string,
    homeTeamGoalNumber: string,
    awayTeamName: string,
    awayTeamGoalNumber: string,
    roundNumber: string
  ) {
    this._isFinished = isFinished === "Finished";
    this._homeTeamName = homeTeamName;
    this._homeTeamGoalNumber = Number(homeTeamGoalNumber);
    this._awayTeamName = awayTeamName;
    this._awayTeamGoalNumber = Number(awayTeamGoalNumber);
    this._roundNumber = Number(roundNumber);
  }
}
