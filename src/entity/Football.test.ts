import {assert, expect} from 'chai'
import {FootballTeam} from './FootballTeam'

describe('football', function () {

    const name = 'testTeam'
    const initHomeScore = 0
    const initAwayScore = 5
    let footballTeam: FootballTeam
    beforeEach(function () {
        footballTeam = new FootballTeam(name, initHomeScore, initAwayScore)
    })

    it('name getter', function () {
        expect(name).equals(footballTeam.name)
    })

    it('homeScores getter setter', function () {
        let score = 2
        footballTeam.addPredictedHomeScore = score
        assert.deepEqual([initHomeScore, score], footballTeam.homeScores)
    })

    it('awayScores getter setter', function () {
        let score = 1
        footballTeam.addPredictedAwayScore = score
        assert.deepEqual([initAwayScore, score], footballTeam.awayScores)
    })
})