import {StatisticType} from '../type/StatisticType'
import {PredictionResultType} from '../type/PredictionResultType'

export class Statistic {

    private readonly _statistic: StatisticType


    constructor(predictionResult: PredictionResultType[]) {
        this._statistic = {}
        this._statistic = predictionResult.reduce(this.countSuccessPrediction(), this._statistic)
        this.calculatePercentage(predictionResult)
    }

    private calculatePercentage(predictionResult: PredictionResultType[]) {
        for (let statisticKey in this._statistic) {
            let statisticElement = this._statistic[statisticKey]
            statisticElement.percentage = statisticElement.matchCounter / predictionResult.length
        }
    }

    private countSuccessPrediction() {
        return (x: StatisticType, y: PredictionResultType) => {
            if (x[y.algorithm]) {
                x[y.algorithm].matchCounter++
                return x
            } else {
                return Object.assign(x, {algorithmName: y.algorithm, matchCounter: +y.isMatch})
            }
        }
    }
}