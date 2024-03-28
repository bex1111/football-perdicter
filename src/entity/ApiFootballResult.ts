export default class ApiFootballResult {
    private readonly matchId: number;
    private readonly matchTeamScore: number ;
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
    private readonly ballPossession: string;
    private readonly redCards: number;
    private readonly saves: number;
    private readonly passesTotal: number;
    private readonly passesAccurate: number;

    constructor(matchId: number,
        matchTeamScore: number ,
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
        ballPossession: string,
        redCards: number,
        saves: number,
        passesTotal: number,
        passesAccurate: number)
    {
        this.matchId=matchId;
        this.matchTeamScore=matchTeamScore;
        this.matchTeamHalftimeScore=matchTeamHalftimeScore;
        this.shotsTotal=shotsTotal;
        this.shotsOnGoal=shotsOnGoal;
        this.shotsOffGoal=shotsOffGoal;
        this.shotsBlocked=shotsBlocked;
        this.shotsInsideBox=shotsInsideBox;
        this.shotsOutsideBox=shotsOutsideBox;
        this.fouls=fouls;
        this.corners=corners;
        this.offsides=offsides;
        this.ballPossession=ballPossession;
        this.redCards=redCards;
        this.saves=saves;
        this.passesTotal=passesTotal;
        this.passesAccurate=passesAccurate;
    }

    public genearateTrainingSet():number[]{
        return [this.matchId,
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
            this.converBallPossessionToNumber(),
            this.redCards,
            this.saves,
            this.passesTotal,
            this.passesAccurate]
    }


    private converBallPossessionToNumber(): number {
        return Number(this.ballPossession.replace("%", ""));
    }
}
