import {PredictionType} from './PredictionType'

export type PredictionResultType = PredictionType & {
    isMatch: boolean,
}