import {assert, expect} from 'chai'
import {Input} from './Input'

describe('input', function () {

    let inputArray: any[] = []
    let input:Input;
    beforeEach(function () {
        inputArray = [{HomeTeamScore: 0, AwayTeamScore: 3, RoundNumber: 5},
            {HomeTeamScore: 1, AwayTeamScore: 2, RoundNumber: 1},
            {HomeTeamScore:5, AwayTeamScore:0 , RoundNumber: 2},
            {HomeTeamScore:3, AwayTeamScore:1 , RoundNumber: 5},
            {HomeTeamScore: null, AwayTeamScore: null, RoundNumber: 7}]
        input=new Input(inputArray);
    })

    it('count empty inputArray', function () {
        expect(0).equals(new Input([]).countPlayedMatch())
    })
    it('count played inputArray', function () {
        expect(4).equals(input
            .countPlayedMatch())
    })
    it('calculate last played round number', function () {
        expect(5).equals(input
            .calculateLastPlayedRoundNumber())
    })
    it('get played rounds', function () {
        assert.deepEqual([inputArray[1],inputArray[2]],
            input.getPlayedRounds(2))
    })
    it('get round', function () {
        assert.deepEqual([inputArray[0], inputArray[3]],
            input.getRound(5))
    })
})