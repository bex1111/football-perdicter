import {Predictor} from "./Predictor";
import {PredictionType} from "../../type/PredictionType";
import {RandomForestRegression} from "ml-random-forest";
import ApiFootballTeam from "../../entity/ApiFootballTeam";

export class RandomForestPredictor implements Predictor {
    private readonly _homeTeam: ApiFootballTeam;
    private readonly _awayTeam: ApiFootballTeam;
    private readonly _randomForestRegression: RandomForestRegression;

    constructor(
        _homeTeam: ApiFootballTeam,
        _awayTeam: ApiFootballTeam,
        randomForestRegression: RandomForestRegression
    ) {
        this._homeTeam = _homeTeam;
        this._awayTeam = _awayTeam;
        this._randomForestRegression = randomForestRegression;
    }

    private get getPredictedHomeScore() {
        return this.calculatePredictedScore(
            this._homeTeam.homeResults.map(x => x.generateTrainingSet()),
            this._homeTeam.homeResults.map(x => x.generateResultSet()),
            [this._homeTeam.lastHomeResult.generateTrainingSet()]
        );
    }

    private get getPredictedAwayScore() {
        return this.calculatePredictedScore(
            this._awayTeam.awayResults.map(x => x.generateTrainingSet()),
            this._awayTeam.awayResults.map(x => x.generateResultSet()),
            [this._awayTeam.lastAwayResult.generateTrainingSet()]
        )
    }

    getPrediction(): PredictionType {
        return {
            homeScore: this.getPredictedHomeScore,
            awayScore: this.getPredictedAwayScore,
            algorithm: this.constructor.name,
        };
    }

    private calculatePredictedScore(
        trainingSet: number[][],
        trainingResults: number[],
        setForPrediction: number[][]
    ): number {
        this._randomForestRegression.train(trainingSet, trainingResults);
        return this._randomForestRegression.predict(setForPrediction)[0];
    }
}
