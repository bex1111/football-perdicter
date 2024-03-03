import * as https from "https";
import { writeFile, readFile } from "../file/FileGateway";

export class ApiFootballInput {
  private _input: any;

  constructor() {
    //this._input = this.downloadData();
    this._input = JSON.parse(readFile("downloadedData.json"));
    console.log(this._input);
  }

  private loadfromFile() {}

  private downloadData(): any {
    let data = "";
    let startDate = this.formatDate(new Date("2023-08-11"));
    let endDate = this.formatDate(new Date("2024-05-20"));
    let premierLeagueId = 152;

    //TODO await response
    //TODO write test
    //TODO finish file cache
    const request = https.get(
      `https://apiv3.apifootball.com/?action=get_events&
        from=${startDate}&
        to=${endDate}&
        league_id=${premierLeagueId}&   
        APIkey=${process.env.API_KEY}`,
      function (response) {
        response
          .on("data", (append) => (data += append))
          .on("error", (e) => console.error(e))
          .on("end", () => writeFile("downloadedData.json", data));
      }
    );

    return data;
  }

  private formatDate(date: Date): string {
    return date.toISOString().slice(0, 10);
  }
}
