import {Predictor} from './predicor/Predictor'
import {InputType} from '../type/InputType'
import {PredictionResultType} from '../type/PredictionResultType'
import {PredictionType} from '../type/PredictionType'

export class Prediction {

    private readonly _playedMatch: InputType
    private readonly _predictionResult: PredictionResultType[]

    constructor(playedMatch: InputType, ...predictors: Predictor[]) {
        this._playedMatch = playedMatch
        this._predictionResult = predictors.map(x => this.mapPredictionToResult(x))
    }

    get playedMatch(): InputType {
        return this._playedMatch
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
        return [this.playedMatch.HomeTeamScore, this.playedMatch.AwayTeamScore]
                .filter((x): x is number => x !== null)
                .reduce((x, y) => x + y, 0) ===
            prediction.homeScore + prediction.awayScore
    }
}