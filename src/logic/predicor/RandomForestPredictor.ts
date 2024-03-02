import { FootballTeam } from "../../entity/FootballTeam";
import { Predictor } from "./Predictor";
import { PredictionType } from "../../type/PredictionType";
import { RandomForestRegression } from "ml-random-forest";

export class RandomForestPredictor implements Predictor {
  private readonly numberOfRoundHistory = 4;
  private readonly _homeTeam: FootballTeam;
  private readonly _awayTeam: FootballTeam;
  private readonly _footBallTeams: FootballTeam[];
  private readonly _randomForestRegression: RandomForestRegression;

  constructor(
    _homeTeam: FootballTeam,
    _awayTeam: FootballTeam,
    _footBallTeams: FootballTeam[],
    randomForestRegression: RandomForestRegression
  ) {
    this._homeTeam = _homeTeam;
    this._awayTeam = _awayTeam;
    this._footBallTeams = _footBallTeams;
    this._randomForestRegression = randomForestRegression;
  }

  private get getPredictedHomeScore() {
    return this.calculatePredictedScore(
      this._footBallTeams.map((x) => x.homeScores),
      this._homeTeam.homeScores
    );
  }

  private get getPredictedAwayScore() {
    return this.calculatePredictedScore(
      this._footBallTeams.map((x) => x.awayScores),
      this._awayTeam.awayScores
    );
  }

  getPrediction(): PredictionType {
    return {
      homeScore: this.getPredictedHomeScore,
      awayScore: this.getPredictedAwayScore,
      algorithm: this.constructor.name,
    };
  }

  private calculatePredictedScore(
    scores: number[][],
    currentTeamScore: number[]
  ) {
    let trainingSet: number[][] = this.generateTrainingSet(scores);
    let trainingResults: number[] = this.generateResultSet(scores);
    let predictionSet = this.generatePredictionSet(
      currentTeamScore,
      this.numberOfRoundHistory
    );

    this._randomForestRegression.train(trainingSet, trainingResults);
    return Math.round(this._randomForestRegression.predict(predictionSet)[0]);
  }

  private generateTrainingSet(scores: number[][]) {
    let trainingSet: number[][] = [];
    for (let i = 0; i < scores.length; i++) {
      let currentTeamTrainingSet: number[][] = [];
      for (let j = 0; j < scores[i].length - this.numberOfRoundHistory; j++) {
        currentTeamTrainingSet[j] = scores[i].slice(
          j,
          j + this.numberOfRoundHistory
        );
      }
      trainingSet = trainingSet.concat(currentTeamTrainingSet);
    }
    return trainingSet;
  }

  private generateResultSet(scores: number[][]) {
    let trainingResults: number[] = [];
    for (let i = 0; i < scores.length; i++) {
      let currentTeamTrainingResult: number[] = [];
      for (let j = 0; j < scores[i].length - this.numberOfRoundHistory; j++) {
        currentTeamTrainingResult[j] = scores[i][j + this.numberOfRoundHistory];
      }
      trainingResults = trainingResults.concat(currentTeamTrainingResult);
    }
    return trainingResults;
  }

  private generatePredictionSet(
    currentTeamScore: number[],
    numberOfRoundHistory: number
  ) {
    return [
      currentTeamScore.slice(
        currentTeamScore.length - numberOfRoundHistory,
        currentTeamScore.length
      ),
    ];
  }
}
