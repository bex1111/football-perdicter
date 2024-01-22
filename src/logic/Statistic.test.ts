import {expect} from 'chai'
import {Statistic} from './Statistic'
import {PredictionResultType} from '../type/PredictionResultType'

describe('football', function () {

    const predictionResults: PredictionResultType[] =
        [{
            homeScore: 0, awayScore: 3,
            algorithm: 'algorithm1', isMatch: false,
        },
            {
                homeScore: 0, awayScore: 1,
                algorithm: 'algorithm2', isMatch: false,
            },
            {
                homeScore: 1, awayScore: 1,
                algorithm: 'algorithm1', isMatch: true,
            },
            {
                homeScore: 2, awayScore: 0,
                algorithm: 'algorithm1', isMatch: true,
            },
            {
                homeScore: 1, awayScore: 1,
                algorithm: 'algorithm2', isMatch: false,
            },
            {
                homeScore: 4, awayScore: 0,
                algorithm: 'algorithm1', isMatch: true,
            },
            {
                homeScore: 3, awayScore: 0,
                algorithm: 'algorithm2', isMatch: true,
            },
            {
                homeScore: 0, awayScore: 0,
                algorithm: 'algorithm2', isMatch: true,
            },
        ]

    let statistic: Statistic
    beforeEach(function () {
        statistic = new Statistic(predictionResults)
    })

    it('calculate algorithm1 statistic', function () {
        let algorithmName = 'algorithm1'
        let algorithm = statistic.statistic.find(x => x.algorithmName === algorithmName)
        expect(algorithm).to.be.exist
        expect(algorithm).to.deep.equals({
            algorithmName: algorithmName, percentage: 0.75, successCounter: 3, counter: 4,
        })
    })

    it('calculate algorithm2 statistic', function () {
        let algorithmName = 'algorithm2'
        let algorithm = statistic.statistic.find(x => x.algorithmName === algorithmName)
        expect(algorithm).to.be.exist
        expect(algorithm).to.deep.equals({
            algorithmName: algorithmName, percentage: 0.5, successCounter: 2, counter: 4,
        })
    })
})