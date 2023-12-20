import {assert, expect} from 'chai'
import {Input} from './Input'

describe('input', function () {

    let input: any[] = []
    beforeEach(function () {
        input = [{HomeTeamScore: 0, AwayTeamScore: 3, RoundNumber: 5},
            {HomeTeamScore: 1, AwayTeamScore: 2, RoundNumber: 1},
            {HomeTeamScore: null, AwayTeamScore: null, RoundNumber: 7}]
    })

    it('count empty input', function () {
        expect(0).equals(new Input([]).countPlayedMatch())
    })
    it('count played input', function () {
        expect(2).equals(new Input(input)
            .countPlayedMatch())
    })
    it('calculate last played round number', function () {
        expect(5).equals(new Input(input)
            .calculateLastPlayedRoundNumber())
    })
    it('get played rounds', function () {
        assert.deepEqual([input[1]],
            new Input(input).getPlayedRounds(2))
    })
})