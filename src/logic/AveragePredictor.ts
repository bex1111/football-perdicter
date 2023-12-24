import {FootballTeam} from '../entity/FootballTeam'
import {Predictor} from './Predictor'
import {PredictionType} from '../type/PredictionType'

export class AveragePredictor implements Predictor {
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
        return Math.round(
            scores.reduce((x, y) => x + y, 0) /
            scores.length)
    }

}
