import {RandomForestPredictor} from './RandomForestPredictor'
import {deepEqual, instance, mock, verify, when} from 'ts-mockito'
import FootballTeam from '../../entity/FootballTeam'
import {RandomForestRegression} from 'ml-random-forest'
import {expect} from 'chai'


describe('random forest predictor', function () {

    it('get prediction', function () {

        let randomForestRegression = mock(RandomForestRegression)
        let footBallTeams: FootballTeam[] = generateFootballTeams(10, 6)
        when(randomForestRegression.predict(generatePredictionInput(footBallTeams[0].homeScores))).thenReturn([1])
        when(randomForestRegression.predict(generatePredictionInput(footBallTeams[1].awayScores))).thenReturn([2])
        let randomForestPredictor = new RandomForestPredictor(footBallTeams[0], footBallTeams[1], footBallTeams, instance(randomForestRegression))

        expect({
            homeScore: 1,
            awayScore: 2,
            algorithm: 'RandomForestPredictor',
        }).deep.equals(randomForestPredictor.getPrediction())

        verifyHomeScoreTrainingInput(randomForestRegression)
        verifyAwayScoreTrainingInput(randomForestRegression)
        verify(randomForestRegression.predict(generatePredictionInput(footBallTeams[0].homeScores))).once()
        verify(randomForestRegression.predict(generatePredictionInput(footBallTeams[1].awayScores))).once()
    })

    function generatePredictionInput(scores: number[]) {
        return deepEqual([scores.slice(scores.length - 4, scores.length)])
    }

    function generateFootballTeams(times: number, scoreCount: number) {
        let footballTeams: FootballTeam[] = []
        for (let i = 1; i <= times; i++) {
            let footballTeam = mock(FootballTeam)
            let scores: number[] = []
            for (let j = 1; j <= scoreCount; j++) {
                scores.push(i * j)
            }
            when(footballTeam.homeScores).thenReturn(scores)
            when(footballTeam.awayScores).thenReturn(scores.slice().reverse())
            footballTeams.push(instance(footballTeam))
        }
        return footballTeams
    }

    function verifyHomeScoreTrainingInput(randomForestRegression: RandomForestRegression) {
        let trainingSet = [
            [1, 2, 3, 4],
            [2, 3, 4, 5],
            [2, 4, 6, 8],
            [4, 6, 8, 10],
            [3, 6, 9, 12],
            [6, 9, 12, 15],
            [4, 8, 12, 16],
            [8, 12, 16, 20],
            [5, 10, 15, 20],
            [10, 15, 20, 25],
            [6, 12, 18, 24],
            [12, 18, 24, 30],
            [7, 14, 21, 28],
            [14, 21, 28, 35],
            [8, 16, 24, 32],
            [16, 24, 32, 40],
            [9, 18, 27, 36],
            [18, 27, 36, 45],
            [10, 20, 30, 40],
            [20, 30, 40, 50],
        ]
        let trainingResult = [5, 6, 10, 12, 15, 18, 20, 24, 25, 30, 30, 36, 35, 42, 40, 48, 45, 54, 50, 60]
        verify(randomForestRegression.train(deepEqual(trainingSet), deepEqual(trainingResult))).once()
    }

    function verifyAwayScoreTrainingInput(randomForestRegression: RandomForestRegression) {
        let trainingSet = [
            [6, 5, 4, 3],
            [5, 4, 3, 2],
            [12, 10, 8, 6],
            [10, 8, 6, 4],
            [18, 15, 12, 9],
            [15, 12, 9, 6],
            [24, 20, 16, 12],
            [20, 16, 12, 8],
            [30, 25, 20, 15],
            [25, 20, 15, 10],
            [36, 30, 24, 18],
            [30, 24, 18, 12],
            [42, 35, 28, 21],
            [35, 28, 21, 14],
            [48, 40, 32, 24],
            [40, 32, 24, 16],
            [54, 45, 36, 27],
            [45, 36, 27, 18],
            [60, 50, 40, 30],
            [50, 40, 30, 20],
        ]
        let trainingResult = [2, 1, 4, 2, 6, 3, 8, 4, 10, 5, 12, 6, 14, 7, 16, 8, 18, 9, 20, 10]
        verify(randomForestRegression.train(deepEqual(trainingSet), deepEqual(trainingResult))).once()
    }
})