import {FootballTeam} from '../../entity/FootballTeam'
import {Predictor} from './Predictor'
import {PredictionType} from '../../type/PredictionType'
import {RandomForestBaseOptions, RandomForestRegression} from 'ml-random-forest'

export class RandomForestPredictor implements Predictor {

    private readonly options: Partial<RandomForestBaseOptions> = {
        seed: 30,
        maxFeatures: 0.70,
        replacement: true,
        nEstimators: 500,
        selectionMethod: 'median',
    }
    private readonly _homeTeam: FootballTeam
    private readonly _awayTeam: FootballTeam
    private readonly _footBallTeams: FootballTeam[]

    constructor(_homeTeam: FootballTeam, _awayTeam: FootballTeam, _footBallTeams: FootballTeam[]) {
        this._homeTeam = _homeTeam
        this._awayTeam = _awayTeam
        this._footBallTeams = _footBallTeams
    }

    private get getPredictedHomeScore() {
        return this.calculatePredictedScore(this._footBallTeams.map(x => x.homeScores), this._homeTeam.homeScores)
    }

    private get getPredictedAwayScore() {
        return this.calculatePredictedScore(this._footBallTeams.map(x => x.awayScores), this._homeTeam.awayScores)
    }

    getPrediction(): PredictionType {
        return {
            homeScore: this.getPredictedHomeScore,
            awayScore: this.getPredictedAwayScore,
            algorithm: this.constructor.name,
        }
    }

    private calculatePredictedScore(scores: number[][], currentTeamScore: number[]) {
        let scoreArrayLength = scores.length
        let numberOfRoundHistory = 4
        let trainingSet: number[][] = []
        let predictions: number[] = []
        for (let i = 0; i < scores.length; i++) {
            let currentTeamTrainingSet: number[][] = []
            let currentTeamPrediction: number[] = []
            for (let j = 0; j < scores[i].length - numberOfRoundHistory; j++) {
                currentTeamTrainingSet[j] = scores[i].slice(j, j + numberOfRoundHistory)
                currentTeamPrediction[j] = scores[i][j + numberOfRoundHistory]
            }
            trainingSet = trainingSet.concat(currentTeamTrainingSet)
            predictions = predictions.concat(currentTeamPrediction)
        }

        let regression = new RandomForestRegression(this.options)
        regression.train(trainingSet, predictions)
        return Math.round(regression.predict([currentTeamScore.slice(currentTeamScore.length - numberOfRoundHistory, scoreArrayLength - 1)])[0])
    }

}
