import { ApiFootballInputType } from "../type/ApiFootballInputType";
import { ApiFootballStatisticType } from "../type/ApiFootballStatisticType";

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

  constructor(
    matchId: number,
    matchTeamScore: number,
    matchTeamHalftimeScore: number,
    shotsTotal: number,
    shotsOnGoal: number,
    shotsOffGoal: number,
    shotsBlocked: number,
    shotsInsideBox: number,
    shotsOutsideBox: number,
    fouls: number,
    corners: number,
    offsides: number,
    ballPossession: number,
    redCards: number,
    saves: number,
    passesTotal: number,
    passesAccurate: number
  ) {
    this.matchId = matchId;
    this.matchTeamScore = matchTeamScore;
    this.matchTeamHalftimeScore = matchTeamHalftimeScore;
    this.shotsTotal = shotsTotal;
    this.shotsOnGoal = shotsOnGoal;
    this.shotsOffGoal = shotsOffGoal;
    this.shotsBlocked = shotsBlocked;
    this.shotsInsideBox = shotsInsideBox;
    this.shotsOutsideBox = shotsOutsideBox;
    this.fouls = fouls;
    this.corners = corners;
    this.offsides = offsides;
    this.ballPossession = ballPossession;
    this.redCards = redCards;
    this.saves = saves;
    this.passesTotal = passesTotal;
    this.passesAccurate = passesAccurate;
  }

  public genearateTrainingSet(): number[] {
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
    ];
  }

  public static generateHomeResult(
    apiFootballInputType: ApiFootballInputType
  ): ApiFootballResult {

    return new ApiFootballResult(
      apiFootballInputType.match_id,
      apiFootballInputType.match_hometeam_score,
      apiFootballInputType.match_hometeam_halftime_score,
      this.findNumberInStatistic(
        apiFootballInputType.statistics,
        "Shots Total",
        this.findHomeScore
      ),
      this.findNumberInStatistic(
        apiFootballInputType.statistics,
        "Shots On Goal",
        this.findHomeScore
      ),
      this.findNumberInStatistic(
        apiFootballInputType.statistics,
        "Shots Off Goal",
        this.findHomeScore
      ),
      this.findNumberInStatistic(
        apiFootballInputType.statistics,
        "Shots Blocked",
        this.findHomeScore
      ),
      this.findNumberInStatistic(
        apiFootballInputType.statistics,
        "Shots Inside Box",
        this.findHomeScore
      ),
      this.findNumberInStatistic(
        apiFootballInputType.statistics,
        "Shots Outside Box",
        this.findHomeScore
      ),
      this.findNumberInStatistic(
        apiFootballInputType.statistics,
        "Fouls",
        this.findHomeScore
      ),
      this.findNumberInStatistic(
        apiFootballInputType.statistics,
        "Corners",
        this.findHomeScore
      ),
      this.findNumberInStatistic(
        apiFootballInputType.statistics,
        "Offsides",
        this.findHomeScore
      ),
      this.findNumberInStatistic(
        apiFootballInputType.statistics,
        "Ball Possession",
        this.findHomeScore,
        this.removePercentage
      ),
      this.findNumberInStatistic(
        apiFootballInputType.statistics,
        "Yellow Cards",
        this.findHomeScore
      ),
      this.findNumberInStatistic(
        apiFootballInputType.statistics,
        "Saves",
        this.findHomeScore
      ),
      this.findNumberInStatistic(
        apiFootballInputType.statistics,
        "Passes Total",
        this.findHomeScore
      ),
      this.findNumberInStatistic(
        apiFootballInputType.statistics,
        "Passes Accurate",
        this.findHomeScore
      )
    );
  }

  public static generateAwayResult(
    apiFootballInputType: ApiFootballInputType
  ): ApiFootballResult {

    return new ApiFootballResult(
      apiFootballInputType.match_id,
      apiFootballInputType.match_awayteam_score,
      apiFootballInputType.match_awayteam_halftime_score,
      this.findNumberInStatistic(
        apiFootballInputType.statistics,
        "Shots Total",
        this.findAwayScore
      ),
      this.findNumberInStatistic(
        apiFootballInputType.statistics,
        "Shots On Goal",
        this.findAwayScore
      ),
      this.findNumberInStatistic(
        apiFootballInputType.statistics,
        "Shots Off Goal",
        this.findAwayScore
      ),
      this.findNumberInStatistic(
        apiFootballInputType.statistics,
        "Shots Blocked",
        this.findAwayScore
      ),
      this.findNumberInStatistic(
        apiFootballInputType.statistics,
        "Shots Inside Box",
        this.findAwayScore
      ),
      this.findNumberInStatistic(
        apiFootballInputType.statistics,
        "Shots Outside Box",
        this.findAwayScore
      ),
      this.findNumberInStatistic(
        apiFootballInputType.statistics,
        "Fouls",
        this.findAwayScore
      ),
      this.findNumberInStatistic(
        apiFootballInputType.statistics,
        "Corners",
        this.findAwayScore
      ),
      this.findNumberInStatistic(
        apiFootballInputType.statistics,
        "Offsides",
        this.findAwayScore
      ),
      this.findNumberInStatistic(
        apiFootballInputType.statistics,
        "Ball Possession",
        this.findAwayScore,
        this.removePercentage
      ),
      this.findNumberInStatistic(
        apiFootballInputType.statistics,
        "Yellow Cards",
        this.findAwayScore
      ),
      this.findNumberInStatistic(
        apiFootballInputType.statistics,
        "Saves",
        this.findAwayScore
      ),
      this.findNumberInStatistic(
        apiFootballInputType.statistics,
        "Passes Total",
        this.findAwayScore
      ),
      this.findNumberInStatistic(
        apiFootballInputType.statistics,
        "Passes Accurate",
        this.findAwayScore
      )
    );
  }

  private static findHomeScore(x: ApiFootballStatisticType) :string {
    return x.home;
  }

  private static findAwayScore(x: ApiFootballStatisticType) :string {
    return x.away;
  }

  private static findNumberInStatistic(
    statistics: ApiFootballStatisticType[],
    statisticName: string,
    findScore: (x: ApiFootballStatisticType) => string,
    transformator: (x: string) => string = (x) => x
  ): number {
    let statistic = statistics.find(
      (statistic) => statistic.type === statisticName
    );
    if (statistic) {
      return Number(transformator(findScore(statistic)));
    }
    return 0;
  }

  private static removePercentage(ballPossession: string): string {
    return ballPossession.replace("%", "");
  }
}
