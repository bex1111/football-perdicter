import {League} from './entity/League'
import {Input, input2023and24} from './gateway/data/Input'
import {WeightedAveragePredictor} from './logic/WeightedAveragePredictor'
import {Prediction} from './logic/Predicition'
import {PredictionView} from './view/PredictionView'
import {AveragePredictor} from './logic/AveragePredictor'
import {MainPageView} from './view/MainPageView'

let input = new Input(input2023and24)
let prediction: Prediction[] = []

for (let i = 5; i < input.calculateLastPlayedRoundNumber(); i++) {
    let league = new League(input.getPlayedRounds(i))

    prediction = prediction.concat(input
        .getRound(i + 1)
        .map(x =>
            new Prediction(x,
                new WeightedAveragePredictor(
                    league.getFootballTeam(x.AwayTeam),
                    league.getFootballTeam(x.HomeTeam),
                ),
                new AveragePredictor(
                    league.getFootballTeam(x.AwayTeam),
                    league.getFootballTeam(x.HomeTeam),
                ),
            ),
        ),
    )

}

new PredictionView(prediction).generate()
new MainPageView().generate()