import {get} from "https";
import { writeFile, readFile, isFileExist } from "../file/FileGateway";
import { DateGateway } from "../DateGateway";

export class ApiFootballInput {
  private readonly _input: any;
  private readonly _dateGateway: DateGateway;  

  get input() {
    return this._input;
  }

  constructor(dateGateway: DateGateway) {
    this._dateGateway = dateGateway;
    this._input = this.loadInput();
    console.log(this._input);
  }

  private loadInput() {
    let data;
    if (isFileExist(this.generateFileName())) {
      data = readFile(this.generateFileName());
    } else {
      data = this.downloadData();
    }
    return JSON.parse(data);
  }

  private downloadData(): any {
    let data = "";
    let startDate = this.formatDate(new Date("2023-08-11"));
    let endDate = this.formatDate(new Date("2024-05-20"));
    let premierLeagueId = 152;

   get(
      `https://apiv3.apifootball.com/?action=get_events&
        from=${startDate}&
        to=${endDate}&
        league_id=${premierLeagueId}&   
        APIkey=${process.env.API_KEY}`,
      (response) => {
        response
          .on("data", (append) => (data += append))
          .on("error", (e) => console.error(e))
          .on("end", () => writeFile(this.generateFileName(), data));
      }
    );   

    return data;
  }

  private generateFileName() {
    return `cached-data-${this.formatDate(this._dateGateway.now())}.json`;
  }

  private formatDate(date: Date): string {
    return date.toISOString().slice(0, 10);
  }
}
