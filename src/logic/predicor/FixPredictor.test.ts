import {expect} from 'chai'
import {FixPredictor} from './FixPredictor'

describe('fix predictor', function () {

    it('get prediction', function () {
        let fixPredictor = new FixPredictor()

        let prediction = fixPredictor.getPrediction()
        expect(prediction.homeScore).to.equals(2)
        expect(prediction.awayScore).to.equals(1)
        expect(prediction.algorithm).to.equals('FixPredictor')
    })
})