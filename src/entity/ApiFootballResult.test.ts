import {assert, expect} from 'chai'
import {FootballTeam} from './FootballTeam'
import ApiFootballResult from './ApiFootballResult'

describe('api football result', function () {

    it('genearate training set', function () {
        let apiFootballResult=new ApiFootballResult(0,1,2,3,4,5,6,7,
            8,9,10,11,"12%",13,14,15,16)
        expect(Array.from(Array(17).keys()))
        .deep.equal(apiFootballResult.genearateTrainingSet())
    })
})