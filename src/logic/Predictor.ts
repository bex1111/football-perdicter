import {PredictionType} from '../type/PredictionType'

export interface Predictor {
    getPrediction(): PredictionType;
}