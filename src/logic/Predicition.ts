import {Predictor} from './predicor/Predictor'
import {PredictionResultType} from '../type/PredictionResultType'
import {PredictionType} from '../type/PredictionType'
import ApiFootballMatch from '../entity/ApiFootballMatch'

export class Prediction {
    get apiFootballMatch(): ApiFootballMatch {
        return this._apiFootballMatch;
    }


    private readonly _apiFootballMatch: ApiFootballMatch;
    private readonly _predictionResult: PredictionResultType[]

    constructor(apiFootballMatch: ApiFootballMatch, ...predictors: Predictor[]) {
        this._apiFootballMatch = apiFootballMatch;
        this._predictionResult = predictors.map(x => this.mapPredictionToResult(x))
    }

    get predictions(): PredictionResultType[] {
        return this._predictionResult
    }

    private mapPredictionToResult(x: Predictor): PredictionResultType {
        let prediction = x.getPrediction()
        return Object.assign(prediction, {
            isMatch: this.isMatch(prediction),
        })
    }

    private isMatch(prediction: PredictionType) {
        return this._apiFootballMatch.awayTeamGoalNumber + this._apiFootballMatch.homeTeamGoalNumber ===
            prediction.homeScore + prediction.awayScore
    }
}