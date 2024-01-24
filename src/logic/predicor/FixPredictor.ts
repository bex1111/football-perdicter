import {Predictor} from './Predictor'
import {PredictionType} from '../../type/PredictionType'

export class FixPredictor implements Predictor {

    getPrediction(): PredictionType {
        return {
            homeScore: 2,
            awayScore: 1,
            algorithm: this.constructor.name,
        }
    }
}
