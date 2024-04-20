import {Predictor} from './predicor/Predictor'
import {InputType} from '../type/InputType'
import {PredictionResultType} from '../type/PredictionResultType'
import {PredictionType} from '../type/PredictionType'
import ApiFootballMatch from '../entity/ApiFootballMatch'

export class Prediction {

    
    private readonly _apiFootballMatch: ApiFootballMatch;
    private readonly _predictionResult: PredictionResultType[]

    constructor(apiFootballMatch:ApiFootballMatch, ...predictors: Predictor[]) {
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
        return [this._apiFootballMatch, this.playedMatch.AwayTeamScore]
                .filter((x): x is number => x !== null)
                .reduce((x, y) => x + y, 0) ===
            prediction.homeScore + prediction.awayScore
    }
}