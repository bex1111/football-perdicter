import {Predictor} from './Predictor'
import {InputType} from '../type/InputType'
import {PredictionResultType} from '../type/PredictionResultType'
import {PredictionType} from '../type/PredictionType'

export class Prediction {

    private readonly _inputType: InputType
    private readonly _predictors: Predictor[]

    constructor(playedInputType: InputType, ...predictors: Predictor[]) {
        this._inputType = playedInputType
        this._predictors = predictors
    }

    get inputType(): InputType {
        return this._inputType
    }

    get predictions(): PredictionResultType[] {
        return this._predictors.map(x => this.mapPredictionToResult(x))
    }

    private mapPredictionToResult(x: Predictor): PredictionResultType {
        let prediction = x.getPrediction()
        return Object.assign(prediction, {
            isMatch: this.isMatch(prediction),
        })
    }

    private isMatch(prediction: PredictionType) {
        return (this.inputType.HomeTeamScore || -1) + (this.inputType.AwayTeamScore || -1) ===
            prediction.homeScore + prediction.awayScore
    }
}