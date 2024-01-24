import {expect} from 'chai'
import {Prediction} from './Predicition'
import {InputType} from '../type/InputType'
import {Predictor} from './predicor/Predictor'
import {instance, mock, when} from 'ts-mockito'

describe('Prediction', function () {

    const input: InputType =
        {AwayTeam: '', DateUtc: '', Group: null, HomeTeam: '', Location: '', MatchNumber: 0, HomeTeamScore: 1, AwayTeamScore: 2, RoundNumber: 5}

    let predictor: Predictor = mock<Predictor>()
    let prediction: Prediction
    let score: number

    beforeEach(function () {
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