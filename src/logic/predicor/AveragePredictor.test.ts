import {expect} from 'chai'
import FootballTeam from '../../entity/FootballTeam'
import {instance, mock, when} from 'ts-mockito'
import {AveragePredictor} from './AveragePredictor'

describe('averagePredictor', function () {

    it('get prediction', function () {
        let homeFootballTeam = mock(FootballTeam)
        let awayFootballTeam = mock(FootballTeam)
        when(homeFootballTeam.homeScores).thenReturn([2, 3])
        when(awayFootballTeam.awayScores).thenReturn([0, 1, 1, 5])
        let averagePredictor =
            new AveragePredictor(
                instance(homeFootballTeam),
                instance(awayFootballTeam))

        let prediction = averagePredictor.getPrediction()
        expect(prediction.homeScore).to.equals(3)
        expect(prediction.awayScore).to.equals(2)
        expect(prediction.algorithm).to.equals('AveragePredictor')
    })
})