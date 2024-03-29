import {TeamNotFoundExceptions} from '../exception/TeamNotFoundException'
import {FootballTeam} from './FootballTeam'
import {PlayedInputType} from '../type/InputType'
import { ApiFootballInputType } from '../type/ApiFootballInputType'
import ApiFootballResult from './ApiFootballResult'
import { StatisticType } from '../type/StatisticType'
import { ApiFootballStatisticType } from '../type/ApiFootballStatisticType'
import { StatisticNotFoundError } from '../exception/StatisticNotFoundError'
import { ApiFootballTeam } from './ApiFootballTeam'

export class League {
    private readonly _teams: ApiFootballTeam[]
   

    constructor(playedRounds: ApiFootballInputType[]) {
        this._teams=[]
        playedRounds.forEach(x => this.addHomeInput(x))
        playedRounds.forEach(x => this.addAwayInput(x))
    }

    public get teams() {
        return this._teams
    }

    private addHomeInput(playedMatch: ApiFootballInputType) {
        let footballTeam = this._teams.find((x) => x.name === playedMatch.match_hometeam_name)
        if (!footballTeam) {
            footballTeam=new ApiFootballTeam(playedMatch.match_hometeam_name);
            this._teams.push(footballTeam)
        }
        footballTeam.addPredictedHomeResult(ApiFootballResult.generateHomeResult(playedMatch),playedMatch.match_round)
    }

    private addAwayInput(playedMatch: ApiFootballInputType) {
        let footballTeam = this._teams.find((x) => x.name === playedMatch.match_awayteam_name)
        if (footballTeam) {
            footballTeam.addPredictedAwayResult(ApiFootballResult.generateAwayResult(playedMatch),playedMatch.match_round)
        }
    }

    public getFootballTeam(name: string): ApiFootballTeam {
        let team = this._teams.find((x) => x.name===name)
        if (team) {
            return team
        }
        throw new TeamNotFoundExceptions(name)
    }
}


