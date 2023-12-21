import {League} from './entity/League'
import {Input, input2023and24} from './data/Input'
import {Output, output2021and22} from './data/Output'
import {MatchPredict} from './entity/MatchPredict'

let input = new Input(input2023and24)
let output = new Output(output2021and22)
let counter = 0

for (let i = 1; i < input.calculateLastPlayedRoundNumber(); i++) {
    let league = new League()
    input.getPlayedRounds(i).forEach((x) => {
        league.addAwayInput(x.AwayTeam, x.AwayTeamScore)
        league.addHomeInput(x.HomeTeam, x.HomeTeamScore)
    })

    counter += output
        .getRound(i+1)
        .filter((x) =>
            new MatchPredict(x.AwayTeam, x.HomeTeam, league).isMatch(
                x.HomeTeamScore,
                x.AwayTeamScore,
            ),
        ).length
}

let succesrateInPercent = (counter / input.countPlayedMatch()) * 100

console.log(
    `All match:${input.countPlayedMatch()} succes rate: ${succesrateInPercent}`,
)
