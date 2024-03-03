import { writeFile } from "../gateway/file/FileGateway";
import { StatisticType } from "../type/StatisticType";

export class StatisticView {
  private readonly _statistic: StatisticType[];

  constructor(statistic: StatisticType[]) {
    this._statistic = statistic;
  }

  public generate() {
    writeFile("statistic.html", this.generateFullHtml(this.generateBody()));
  }

  private generateBody() {
    let tableBody: string =
      this.generateHeader() +
      this._statistic
        .map((x) => "<tr>" + this.generateData(x) + "</tr>")
        .join("");
    return "<table>" + tableBody + "</table>";
  }

  private generateData(statistic: StatisticType) {
    return `<th>${statistic.algorithmName}</th>
                <th>${statistic.percentage * 100} %</th>
                <th>${statistic.successCounter}</th>
                <th>${statistic.counter}</th>`;
  }

  private generateHeader() {
    return `<th>Name</th>
                <th>Succesrate</th>
                <th>Succes counter</th>
                <th>Counter</th>`;
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
