import { Prediction } from "../logic/Predicition";
import { writeFile } from "../gateway/file/FileWriter";

export class PredictionView {
  private readonly _predictions: Prediction[];

  constructor(predictions: Prediction[]) {
    this._predictions = predictions;
  }

  public generate() {
    writeFile("prediction.html", this.generateFullHtml(this.generateBody()));
  }

  private generateBody() {
    return (
      "<table>" +
      this._predictions
        .map(
          (x) =>
            "<tr>" +
            this.generateRound(x) +
            this.generateTeamColumn(x) +
            this.generateMatchReault(x) +
            this.generatePredictions(x) +
            "</tr>"
        )
        .join("\n") +
      "</table>"
    );
  }

  private generatePredictions(x: Prediction) {
    return x.predictions
      .map(
        (z) =>
          `<th>${z.algorithm}</th><th>${z.isMatch}</th><th>${z.homeScore}-${z.awayScore}</th>`
      )
      .join("");
  }

  private generateMatchReault(x: Prediction) {
    return `<th>${x.playedMatch.HomeTeamScore}-${x.playedMatch.AwayTeamScore}</th>`;
  }

  private generateTeamColumn(x: Prediction) {
    return `<th>${x.playedMatch.HomeTeam}-${x.playedMatch.AwayTeam}</th>`;
  }

  private generateRound(x: Prediction) {
    return `<th>${x.playedMatch.RoundNumber}</th>`;
  }

  private generateFullHtml(body: string): string {
    return `<!DOCTYPE html>
         <html lang="en">
         <head>
           <meta charset="UTF-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <title>Football predictor</title>
           <style>
             table {
               border-collapse: collapse;
               width: 100%;
             }

             table, th, td {
               border: 1px solid black;
             }

             tr:nth-child(even) {
               background-color: #f2f2f2;
             }
           </style>
         </head>
         <body>
         ${body}
         </body>
         </html>`;
  }
}
