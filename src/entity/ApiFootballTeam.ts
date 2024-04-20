import ApiFootballResult from "./ApiFootballResult";

export default class ApiFootballTeam {
    private readonly _name: string;
    private _lastPlayedRound: number;

    private readonly _homeResults: ApiFootballResult[];
    private readonly _awayResults: ApiFootballResult[];
    private _lastHomeResult: ApiFootballResult | null;
    private _lastAwayResult: ApiFootballResult | null;

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

    public get lastHomeResult(): ApiFootballResult {
        return this._lastHomeResult!
    }


    public get lastAwayResult(): ApiFootballResult {
        return this._lastHomeResult!
    }

    constructor(name: string) {
        this._lastPlayedRound = 0;
        this._name = name;
        this._homeResults = [];
        this._awayResults = [];
        this._lastHomeResult = null;
        this._lastAwayResult = null;
    }

    public addHomeResult(result: ApiFootballResult, roundNumber: number) {
        if (this._lastPlayedRound < roundNumber) {
            this._lastHomeResult = result;
            this._lastPlayedRound = roundNumber;
        }
        this._homeResults.push(result);
    }

    public addAwayResult(result: ApiFootballResult, roundNumber: number) {
        if (this._lastPlayedRound < roundNumber) {
            this._lastAwayResult = result;
            this._lastPlayedRound = roundNumber;
        }
        this._awayResults.push(result);
    }
}
