import { League } from "./entity/League";
import { Input, input2023and24 } from "./gateway/data/Input";
import { WeightedAveragePredictor } from "./logic/predicor/WeightedAveragePredictor";
import { Prediction } from "./logic/Predicition";
import { PredictionView } from "./view/PredictionView";
import { AveragePredictor } from "./logic/predicor/AveragePredictor";
import { MainPageView } from "./view/MainPageView";
import { Statistic } from "./logic/Statistic";
import { StatisticView } from "./view/StatisticView";
import { FixPredictor } from "./logic/predicor/FixPredictor";
import { RandomForestPredictor } from "./logic/predicor/RandomForestPredictor";
import {
  RandomForestBaseOptions,
  RandomForestRegression,
} from "ml-random-forest";

let input = new Input(input2023and24);
let prediction: Prediction[] = [];

const options: Partial<RandomForestBaseOptions> = {
  seed: 2,
  maxFeatures: 2,
  replacement: false,
  nEstimators: 500,
};

for (let i = 10; i < input.calculateLastPlayedRoundNumber(); i++) {
  let league = new League(input.getPlayedRounds(i));

  prediction = prediction.concat(
    input.getRound(i + 1).map(
      (x) =>
        new Prediction(
          x,
          // new WeightedAveragePredictor(
          //   league.getFootballTeam(x.AwayTeam),
          //   league.getFootballTeam(x.HomeTeam)
          // ),
          // new AveragePredictor(
          //   league.getFootballTeam(x.AwayTeam),
          //   league.getFootballTeam(x.HomeTeam)
          // ),
          new RandomForestPredictor(
            league.getFootballTeam(x.AwayTeam),
            league.getFootballTeam(x.HomeTeam),
            league.teams,
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
