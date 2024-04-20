import NotParsedStatisticException from "../exception/NotParsedStatisticException";
import {ApiFootballInputType} from "../type/ApiFootballInputType";

export default class ApiFootballResult {
    private readonly matchId: number;
    private readonly matchTeamScore: number;
    private readonly matchTeamHalftimeScore: number;
    private readonly shotsTotal: number;
    private readonly shotsOnGoal: number;
    private readonly shotsOffGoal: number;
    private readonly shotsBlocked: number;
    private readonly shotsInsideBox: number;
    private readonly shotsOutsideBox: number;
    private readonly fouls: number;
    private readonly corners: number;
    private readonly offsides: number;
    private readonly ballPossession: number;
    private readonly redCards: number;
    private readonly saves: number;
    private readonly passesTotal: number;
    private readonly passesAccurate: number;

    private readonly firstHalfShotsTotal: number;
    private readonly firstHalfShotsOnGoal: number;
    private readonly firstHalfShotsOffGoal: number;
    private readonly firstHalfShotsBlocked: number;
    private readonly firstHalfShotsInsideBox: number;
    private readonly firstHalfShotsOutsideBox: number;
    private readonly firstHalfFouls: number;
    private readonly firstHalfCorners: number;
    private readonly firstHalfOffsides: number;
    private readonly firstHalfBallPossession: number;
    private readonly firstHalfRedCards: number;
    private readonly firstHalfSaves: number;
    private readonly firstHalfPassesTotal: number;
    private readonly firstHalfPassesAccurate: number;

    private constructor(statistics: number[]) {
        let index = -1;
        this.matchId = statistics[++index];
        this.matchTeamScore = statistics[++index];
        this.matchTeamHalftimeScore = statistics[++index];

        this.shotsTotal = statistics[++index];
        this.shotsOnGoal = statistics[++index];
        this.shotsOffGoal = statistics[++index];
        this.shotsBlocked = statistics[++index];
        this.shotsInsideBox = statistics[++index];
        this.shotsOutsideBox = statistics[++index];
        this.fouls = statistics[++index];
        this.corners = statistics[++index];
        this.offsides = statistics[++index];
        this.ballPossession = statistics[++index];
        this.redCards = statistics[++index];
        this.saves = statistics[++index];
        this.passesTotal = statistics[++index];
        this.passesAccurate = statistics[++index];

        this.firstHalfShotsTotal = statistics[++index];
        this.firstHalfShotsOnGoal = statistics[++index];
        this.firstHalfShotsOffGoal = statistics[++index];
        this.firstHalfShotsBlocked = statistics[++index];
        this.firstHalfShotsInsideBox = statistics[++index];
        this.firstHalfShotsOutsideBox = statistics[++index];
        this.firstHalfFouls = statistics[++index];
        this.firstHalfCorners = statistics[++index];
        this.firstHalfOffsides = statistics[++index];
        this.firstHalfBallPossession = statistics[++index];
        this.firstHalfRedCards = statistics[++index];
        this.firstHalfSaves = statistics[++index];
        this.firstHalfPassesTotal = statistics[++index];
        this.firstHalfPassesAccurate = statistics[++index];
    }

    public generateTrainingSet(): number[] {
        return [
            this.matchId,
            this.matchTeamScore,
            this.matchTeamHalftimeScore,

            this.shotsTotal,
            this.shotsOnGoal,
            this.shotsOffGoal,
            this.shotsBlocked,
            this.shotsInsideBox,
            this.shotsOutsideBox,
            this.fouls,
            this.corners,
            this.offsides,
            this.ballPossession,
            this.redCards,
            this.saves,
            this.passesTotal,
            this.passesAccurate,

            this.firstHalfShotsTotal,
            this.firstHalfShotsOnGoal,
            this.firstHalfShotsOffGoal,
            this.firstHalfShotsBlocked,
            this.firstHalfShotsInsideBox,
            this.firstHalfShotsOutsideBox,
            this.firstHalfFouls,
            this.firstHalfCorners,
            this.firstHalfOffsides,
            this.firstHalfBallPossession,
            this.firstHalfRedCards,
            this.firstHalfSaves,
            this.firstHalfPassesTotal,
            this.firstHalfPassesAccurate,
        ];
    }


    //FIXME test me
    public generateResultSet(): number {
        return this.matchTeamScore;
    }

    public static generateHomeResult(
        apiFootballInputType: ApiFootballInputType
    ): ApiFootballResult {
        let homeStatisticMap = new Map<string, number>(
            apiFootballInputType.statistics.map((i) => [i.type, this.convert(i.home)])
        );
        let homeFirstHalfStatisticMap = new Map<string, number>(
            apiFootballInputType.statistics_1half.map((i) => [
                i.type,
                this.convert(i.home),
            ])
        );
        return new ApiFootballResult([
            Number(apiFootballInputType.match_id),
            Number(apiFootballInputType.match_hometeam_score),
            Number(apiFootballInputType.match_hometeam_halftime_score),
            ...this.mapStatisticToArray(homeStatisticMap),
            ...this.mapStatisticToArray(homeFirstHalfStatisticMap),
        ]);
    }

    private static mapStatisticToArray(
        statisticsMap: Map<string, number>
    ): number[] {
        let keyMap = [
            "Shots Total",
            "Shots On Goal",
            "Shots Off Goal",
            "Shots Blocked",
            "Shots Inside Box",
            "Shots Outside Box",
            "Fouls",
            "Corners",
            "Offsides",
            "Ball Possession",
            "Yellow Cards",
            "Red Cards",
            "Saves",
            "Passes Total",
            "Passes Accurate",
        ];
        let difference = this.calculateDifference(
            Array.from(statisticsMap.keys()),
            keyMap
        );
        if (difference.length != 0) {
            throw new NotParsedStatisticException(difference.join(","));
        }
        return keyMap.map((x) => this.getValueOrDefault(statisticsMap, x));
    }

    private static getValueOrDefault(
        homeStatisticMap: Map<string, number>,
        key: string
    ): number {
        return homeStatisticMap.get(key) || 0;
    }

    public static generateAwayResult(
        apiFootballInputType: ApiFootballInputType
    ): ApiFootballResult {
        let awayStatisticMap = new Map<string, number>(
            apiFootballInputType.statistics.map((i) => [i.type, this.convert(i.away)])
        );
        let awayFirstHalfStatisticMap = new Map<string, number>(
            apiFootballInputType.statistics_1half.map((i) => [
                i.type,
                this.convert(i.away),
            ])
        );
        return new ApiFootballResult([
            Number(apiFootballInputType.match_id),
            Number(apiFootballInputType.match_hometeam_score),
            Number(apiFootballInputType.match_hometeam_halftime_score),
            ...this.mapStatisticToArray(awayStatisticMap),
            ...this.mapStatisticToArray(awayFirstHalfStatisticMap),
        ]);
    }

    private static removePercentage(ballPossession: string): string {
        return ballPossession.replace("%", "");
    }

    private static convert(statisticString: string): number {
        return Number(this.removePercentage(statisticString));
    }

    private static calculateDifference(array1: string[], array2: string[]) {
        return array1.filter((x) => !array2.includes(x));
    }
}
