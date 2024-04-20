import {RequestOptions} from "https";
import {isFileExist, readFile, writeFile} from "../file/FileGateway";
import {DateGateway} from "../DateGateway";
import {ClientRequest, IncomingMessage} from "http";
import {ApiFootballError} from "../../exception/ApiFootballError";

export class ApiFootballInput {
    private readonly _dateGateway: DateGateway;
    private readonly _get: (
        options: RequestOptions | string | URL,
        callback?: (res: IncomingMessage) => void
    ) => ClientRequest;

    constructor(
        dateGateway: DateGateway,
        get: (
            options: RequestOptions | string | URL,
            callback?: (res: IncomingMessage) => void
        ) => ClientRequest
    ) {
        this._dateGateway = dateGateway;
        this._get = get;
    }

    public async loadInput() {
        let data;
        if (isFileExist(this.generateFileName())) {
            data = readFile(this.generateFileName());
        } else {
            data = await this.downloadData()
        }
        return JSON.parse(data);
    }

    private async downloadData() {
        let data = "";
        let startDate = this.formatDate(new Date("2023-08-11"));
        let endDate = this.formatDate(this._dateGateway.now());
        let premierLeagueId = 152;

        await this.generateCall(startDate, endDate, premierLeagueId, data)
            .then((x) => data = x)
            .catch((e) => {
                throw new ApiFootballError(e)
            });
        return data;
    }

    private async generateCall(startDate: string, endDate: string, premierLeagueId: number, data: string): Promise<string> {
        return new Promise<string>((resolve, reject) => this._get(
                this.generateUrl(startDate, endDate, premierLeagueId),
                (response) => {
                    response
                        .on("data", (append) => (data += append))
                        .on("error", (e) => {
                            reject(e)
                        })
                        .on("end", () => {
                            writeFile(this.generateFileName(), data)
                            resolve(data)
                        });
                }
            )
        );
    }

    private generateUrl(startDate: string, endDate: string, premierLeagueId: number) {
        return [
            `https://apiv3.apifootball.com/?action=get_events&`,
            `from=${startDate}&`,
            `to=${endDate}&`,
            `league_id=${premierLeagueId}&`,
            `APIkey=${process.env.API_KEY}`,
        ].join("");
    }

    private generateFileName() {
        return `cached-data-${this.formatDate(this._dateGateway.now())}.json`;
    }

    private formatDate(date: Date): string {
        return date.toISOString().slice(0, 10);
    }
}
