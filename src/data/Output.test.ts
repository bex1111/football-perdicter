import {assert} from 'chai'
import {Output} from './Output'

describe('output', function () {

    let output: any[] = []
    beforeEach(function () {
        output = [{HomeTeamScore: 0, AwayTeamScore: 3, RoundNumber: 5},
            {HomeTeamScore: 1, AwayTeamScore: 2, RoundNumber: 2},
            {HomeTeamScore: 5, AwayTeamScore: 0, RoundNumber: 2},
            {HomeTeamScore: null, AwayTeamScore: null, RoundNumber: 7}]
    })

    it('count empty input', function () {
        assert.deepEqual([output[1], output[2]],
            new Output(output).getRound(2))
    })
})