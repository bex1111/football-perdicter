import {League} from './League'
import {assert, expect} from 'chai'
import {TeamNotFoundExceptions} from '../exception/TeamNotFoundException'

describe('football', function () {

    const playedRound: any[] =
        [{
            HomeTeamScore: 0, AwayTeamScore: 3,
            HomeTeam: 'Team1', AwayTeam: 'Team2',
        },
            {
                HomeTeamScore: 1, AwayTeamScore: 2,
                HomeTeam: 'Team2', AwayTeam: 'Team1',
            },
            {
                HomeTeamScore: 5, AwayTeamScore: 0,
                HomeTeam: 'Team3', AwayTeam: 'Team2',
            },
            {
                HomeTeamScore: 0, AwayTeamScore: 0,
                HomeTeam: 'Team2', AwayTeam: 'Team3',
            }]

    let league: League
    beforeEach(function () {
        league = new League(playedRound)
    })

    it('teams getter', function () {
        expect(league.teams).to.length(3)
        expect(league.teams).to.deep.equals([{
            _name: 'Team1', _homeScores: [0], _awayScores: [2],
        },
            {
                _name: 'Team2', _homeScores: [1, 0], _awayScores: [3, 0],
            }, {
                _name: 'Team3', _homeScores: [5], _awayScores: [0],
            }])
    })
    it('get football team', function () {
        expect(league.getFootballTeam('Team2')).to.deep.equals({
            _name: 'Team2', _homeScores: [1, 0], _awayScores: [3, 0],
        })
    })

    it('get not exist football team', function () {
        assert.throw(() => league.getFootballTeam('TeamNotExist'),
            TeamNotFoundExceptions)
    })

})