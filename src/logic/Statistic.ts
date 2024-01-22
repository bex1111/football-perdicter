import {PredictionResultType} from '../type/PredictionResultType'
import {StatisticType} from '../type/StatisticType'


export class Statistic {
    private readonly _statistic: StatisticType[]

    constructor(predictionResult: PredictionResultType[]) {
        let algorithm = this.collectAlgorithmName(predictionResult)
        this._statistic = algorithm.map(x => this.generateStatisticFromPrediction(predictionResult, x))

        this.calculatePercentage(predictionResult)
    }

    get statistic(): StatisticType[] {
        return this._statistic
    }

    private collectAlgorithmName(predictionResult: PredictionResultType[]) {
        return predictionResult.map(x => x.algorithm).filter((x, i, a) => a.indexOf(x) === i)
    }

    private generateStatisticFromPrediction(predictionResult: PredictionResultType[], algorithm: string) {
        return {
            algorithmName: algorithm,
            successCounter: this.countSuccessPrediction(predictionResult, algorithm),
            percentage: this.calculateSuccessRate(predictionResult, algorithm),
            counter: this.filterAlgorithm(predictionResult, algorithm).length,
        }
    }

    private calculatePercentage(predictionResult: PredictionResultType[]) {
        for (let statisticKey in this._statistic) {
            let statisticElement = this._statistic.find(x => x.algorithmName = statisticKey)
            if (statisticElement) {
                statisticElement.percentage = statisticElement.successCounter / predictionResult.length
            }
        }
    }

    private countSuccessPrediction(predictionResult: PredictionResultType[], algorithm: string): number {
        return this.filterAlgorithm(predictionResult, algorithm).filter(x => x.isMatch).length
    }

    private calculateSuccessRate(predictionResult: PredictionResultType[], algorithm: string): number {
        return this.countSuccessPrediction(predictionResult, algorithm) / this.filterAlgorithm(predictionResult, algorithm).length
    }

    private filterAlgorithm(predictionResult: PredictionResultType[], algorith: string): PredictionResultType[] {
        return predictionResult.filter(x => algorith === x.algorithm)
    }
}