import {Prediction} from "./logic/Predicition";
import {PredictionView} from "./view/PredictionView";
import {MainPageView} from "./view/MainPageView";
import {Statistic} from "./logic/Statistic";
import {StatisticView} from "./view/StatisticView";
import {FixPredictor} from "./logic/predicor/FixPredictor";
import {RandomForestPredictor} from "./logic/predicor/RandomForestPredictor";
import {RandomForestBaseOptions, RandomForestRegression,} from "ml-random-forest";
import {ApiFootballInput} from "./gateway/data/ApiFootballInput";
import {DateGateway} from "./gateway/DateGateway";
import {get} from "https";
import ApiFootballLeague from "./entity/ApiFootballLeague";

let apiFootballInput = new ApiFootballInput(new DateGateway(), get);
let prediction: Prediction[] = [];

const options: Partial<RandomForestBaseOptions> = {
    seed: 2,
    maxFeatures: 2,
    replacement: false,
    nEstimators: 500,
};


let apiFootballLeague = new ApiFootballLeague(await apiFootballInput.loadInput())

for (let i = 10; i < apiFootballLeague.calculateLastPlayedRoundNumber(); i++) {
    prediction = prediction.concat(
        apiFootballLeague.getRound(i + 1).map(
            (x) =>
                new Prediction(
                    x,
                    new RandomForestPredictor(
                        apiFootballLeague.getFootballTeam(x.homeTeamName),
                        apiFootballLeague.getFootballTeam(x.awayTeamName),
                        new RandomForestRegression(options)
                    ),
                    new FixPredictor()
                )
        )
    );
}
let statistic = new Statistic(prediction.map((x) => x.predictions).flat());

new PredictionView(prediction).generate();
new StatisticView(statistic.statistic).generate();
new MainPageView().generate();
