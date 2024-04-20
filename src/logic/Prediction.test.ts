import {expect} from 'chai'
import {Prediction} from './Predicition'
import {Predictor} from './predicor/Predictor'
import {instance, mock, when} from 'ts-mockito'
import ApiFootballMatch from "../entity/ApiFootballMatch";

describe('Prediction', function () {

    const input: ApiFootballMatch = new ApiFootballMatch('finished', 'home', '1', 'away', '2', '1');


    let predictor: Predictor = mock<Predictor>()
    let prediction: Prediction
    let score: number

    beforeEach(() => {
        score = 1
    })


    it('check prediction when home score change ', function () {
        when(predictor.getPrediction()).thenCall(() => {
            return {
                homeScore: score++, awayScore: 2,
                algorithm: 'algorithm',
            }
        })
        let predictorInstance = instance(predictor)
        prediction = new Prediction(input, predictorInstance, predictorInstance)
        let predictions = prediction.predictions
        expect(predictions).to.be.exist
        expect(predictions).to.deep.equals([{
            homeScore: 1, awayScore: 2,
            algorithm: 'algorithm',
            isMatch: true,
        }, {
            homeScore: 2, awayScore: 2,
            algorithm: 'algorithm',
            isMatch: false,
        }])
    })

    it('check prediction when home score change ', function () {
        when(predictor.getPrediction()).thenCall(() => {
            return {
                homeScore: 1, awayScore: score++,
                algorithm: 'algorithm',
            }
        })
        let predictorInstance = instance(predictor)
        prediction = new Prediction(input, predictorInstance, predictorInstance)
        let predictions = prediction.predictions
        expect(predictions).to.be.exist
        expect(predictions).to.deep.equals([{
            homeScore: 1, awayScore: 1,
            algorithm: 'algorithm',
            isMatch: false,
        }, {
            homeScore: 1, awayScore: 2,
            algorithm: 'algorithm',
            isMatch: true,
        }])
    })
})