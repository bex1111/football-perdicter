import {expect} from 'chai'
import {WeightedAveragePredictor} from './WeightedAveragePredictor'
import {FootballTeam} from '../entity/FootballTeam'
import {instance, mock, when} from 'ts-mockito'

describe('weightedAveragePredictor', function () {

    it('get prediction', function () {
        let homeFootballTeam = mock(FootballTeam)
        let awayFootballTeam = mock(FootballTeam)
        when(homeFootballTeam.homeScores).thenReturn([2, 3])
        when(awayFootballTeam.awayScores).thenReturn([0, 1, 1, 5])
        let weightedAveragePredictor =
            new WeightedAveragePredictor(
                instance(homeFootballTeam),
                instance(awayFootballTeam))

        let prediction = weightedAveragePredictor.getPrediction()
        expect(prediction.homeScore).to.equals(3)
        expect(prediction.awayScore).to.equals(3)
        expect(prediction.algorithm).to.equals('WeightedAveragePredictor')
    })
})