import {TeamNotFoundExceptions} from '../exception/TeamNotFoundException'
import {FootballTeam} from './FootballTeam'
import {PlayedInputType} from '../type/InputType'

export class League {
    private readonly _teams: FootballTeam[]

    constructor(playedRound: PlayedInputType[]) {
        this._teams = this.findTeamByName(playedRound)
        playedRound.forEach(x => this.addHomeInput(x))
        playedRound.forEach(x => this.addAwayInput(x))
    }

    private findTeamByName(playedRound: PlayedInputType[]): FootballTeam[] {
        let teamsName = playedRound.map(x => x.HomeTeam)
        teamsName = teamsName.concat(playedRound.map(x => x.AwayTeam))
        return Array.from(
            new Set(teamsName)
                .values())
            .map(x => new FootballTeam(x))
    }

    public get teams() {
        return this._teams
    }

    private addHomeInput(playedMatch: PlayedInputType) {
        let footballTeam = this._teams.find((x) => x.name === playedMatch.HomeTeam)
        if (footballTeam) {
            footballTeam.addPredictedHomeScore = playedMatch.HomeTeamScore
        }
    }

    private addAwayInput(playedMatch: PlayedInputType) {
        let footballTeam = this._teams.find((x) => x.name === playedMatch.AwayTeam)
        if (footballTeam) {
            footballTeam.addPredictedAwayScore = playedMatch.AwayTeamScore
        }
    }

    public getFootballTeam(name: string): FootballTeam {
        let team = this._teams.find((x) => x.name===name)
        if (team) {
            return team
        }
        throw new TeamNotFoundExceptions(name)
    }
}
