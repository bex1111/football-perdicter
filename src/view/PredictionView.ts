import {Prediction} from "../logic/Predicition";
import {writeFile} from "../gateway/file/FileGateway";
import ApiFootballMatch from "../entity/ApiFootballMatch";

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
                        this.generateRound(x.apiFootballMatch) +
                        this.generateTeamColumn(x.apiFootballMatch) +
                        this.generateMatchResult(x.apiFootballMatch) +
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

    private generateMatchResult(x: ApiFootballMatch) {
        return `<th>${x.homeTeamGoalNumber}-${x.awayTeamGoalNumber}</th>`;
    }

    private generateTeamColumn(x: ApiFootballMatch) {
        return `<th>${x.homeTeamName}-${x.awayTeamName}</th>`;
    }

    private generateRound(x: ApiFootballMatch) {
        return `<th>${x.roundNumber}</th>`;
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
