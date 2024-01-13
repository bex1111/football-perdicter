import {writeFile} from '../gateway/file/FileWriter'
import {StatisticType} from '../type/StatisticType'

export class PredictionView {
    private readonly _statistic: StatisticType

    constructor(statistic: StatisticType) {
        this._statistic = statistic
    }

    public generate() {
        writeFile('dist/statistic.html',
            this.generateFullHtml(this.generateBody()))
    }

    private generateBody() {
        let tableBody: string = ''
        for (let statisticKey in this._statistic) {
            tableBody += '<tr>' + this.generateData(statisticKey, this._statistic[statisticKey]) + '</tr>'
        }
        return '<table>' + tableBody + '</table>'
    }

    private generateData(statisticKey: string, statisticElement: { percentage: number; matchCounter: number }) {
        return `<th>${statisticKey}</th>
                <th>${statisticElement.percentage}</th>
                <th>${statisticElement.matchCounter}</th>`
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
         </html>`
    }
}