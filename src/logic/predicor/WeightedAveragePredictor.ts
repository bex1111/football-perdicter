import {FootballTeam} from '../../entity/FootballTeam'
import {Predictor} from './Predictor'
import {PredictionType} from '../../type/PredictionType'

export class WeightedAveragePredictor implements Predictor {
    private _homeTeam: FootballTeam
    private _awayTeam: FootballTeam

    constructor(_homeTeam: FootballTeam, _awayTeam: FootballTeam) {
        this._homeTeam = _homeTeam
        this._awayTeam = _awayTeam
    }

    private get getPredictedHomeScore() {
        return this.calculatePredictedScore(this._homeTeam.homeScores)
    }

    private get getPredictedAwayScore() {
        return this.calculatePredictedScore(this._awayTeam.awayScores)
    }

    getPrediction(): PredictionType {
        return {
            homeScore: this.getPredictedHomeScore,
            awayScore: this.getPredictedAwayScore,
            algorithm: this.constructor.name,
        }
    }

    private calculatePredictedScore(scores: number[]) {
        let sum = 0
        let divider = 0
        for (let i = 0; i < scores.length; i++) {
            divider += i
            sum += scores[i] * i
        }
        return Math.round(sum / divider)
    }

}
