import {expect} from "chai";
import ApiFootballResult from "./ApiFootballResult";
import {ApiFootballInputType} from "../type/ApiFootballInputType";

describe("api football result", function () {
    it("genearate home training set", function () {
        let index = -1;
        let apiFootballResult = ApiFootballResult.generateHomeResult(
            generateTestData(
                () => (++index).toString(),
                () => index.toString()
            )
        );
        expect([...generateArrayWithIncreasedNumber(30), 0]).deep.equal(
            apiFootballResult.generateTrainingSet()
        );
    });

    it("genearate away training set", function () {
        let index = 31;
        let apiFootballResult = ApiFootballResult.generateAwayResult(
            generateTestData(
                () => (--index).toString(),
                () => index.toString()
            )
        );
        expect(generateArrayWithIncreasedNumber(31).reverse()).deep.equal(
            apiFootballResult.generateTrainingSet()
        );
    });

    it("unknown key in home statistic", function () {
        let testData = generateTestDataWithUnknownKey();

        expect(() => ApiFootballResult.generateHomeResult(testData)).to.throw(
            "invalid,invalid2"
        );
    });

    it("unknown key in away statistic", function () {
        let testData = generateTestDataWithUnknownKey();

        expect(() => ApiFootballResult.generateAwayResult(testData)).to.throw(
            "invalid,invalid2"
        );
    });

    function generateTestData(
        calcculateNextIndex: () => string,
        calcculateSameIndex: () => string
    ): ApiFootballInputType {
        return {
            match_id: calcculateNextIndex(),
            match_date: "2023-08-11",
            match_status: "Finished",
            match_hometeam_name: "Burnley",
            match_hometeam_score: calcculateNextIndex(),
            match_awayteam_name: "Manchester City",
            match_awayteam_score: calcculateSameIndex(),
            match_hometeam_halftime_score: calcculateNextIndex(),
            match_awayteam_halftime_score: calcculateSameIndex(),
            match_round: "1",
            statistics: [
                {
                    type: "Shots Total",
                    home: calcculateNextIndex(),
                    away: calcculateSameIndex(),
                },
                {
                    type: "Shots On Goal",
                    home: calcculateNextIndex(),
                    away: calcculateSameIndex(),
                },
                {
                    type: "Shots Off Goal",
                    home: calcculateNextIndex(),
                    away: calcculateSameIndex(),
                },
                {
                    type: "Shots Blocked",
                    home: calcculateNextIndex(),
                    away: calcculateSameIndex(),
                },
                {
                    type: "Shots Inside Box",
                    home: calcculateNextIndex(),
                    away: calcculateSameIndex(),
                },
                {
                    type: "Shots Outside Box",
                    home: calcculateNextIndex(),
                    away: calcculateSameIndex(),
                },
                {
                    type: "Fouls",
                    home: calcculateNextIndex(),
                    away: calcculateSameIndex(),
                },
                {
                    type: "Corners",
                    home: calcculateNextIndex(),
                    away: calcculateSameIndex(),
                },
                {
                    type: "Offsides",
                    home: calcculateNextIndex(),
                    away: calcculateSameIndex(),
                },
                {
                    type: "Ball Possession",
                    home: calcculateNextIndex() + "%",
                    away: calcculateSameIndex() + "%",
                },
                {
                    type: "Yellow Cards",
                    home: calcculateNextIndex(),
                    away: calcculateSameIndex(),
                },
                {
                    type: "Red Cards",
                    home: calcculateNextIndex(),
                    away: calcculateSameIndex(),
                },
                {
                    type: "Saves",
                    home: calcculateNextIndex(),
                    away: calcculateSameIndex(),
                },
                {
                    type: "Passes Total",
                    home: calcculateNextIndex(),
                    away: calcculateSameIndex(),
                },
                {
                    type: "Passes Accurate",
                    home: calcculateNextIndex(),
                    away: calcculateSameIndex(),
                },
            ],
            statistics_1half: [
                {
                    type: "Shots Total",
                    home: calcculateNextIndex(),
                    away: calcculateSameIndex(),
                },
                {
                    type: "Shots On Goal",
                    home: calcculateNextIndex(),
                    away: calcculateSameIndex(),
                },
                {
                    type: "Shots Off Goal",
                    home: calcculateNextIndex(),
                    away: calcculateSameIndex(),
                },
                {
                    type: "Shots Blocked",
                    home: calcculateNextIndex(),
                    away: calcculateSameIndex(),
                },
                {
                    type: "Shots Inside Box",
                    home: calcculateNextIndex(),
                    away: calcculateSameIndex(),
                },
                {
                    type: "Shots Outside Box",
                    home: calcculateNextIndex(),
                    away: calcculateSameIndex(),
                },
                {
                    type: "Fouls",
                    home: calcculateNextIndex(),
                    away: calcculateSameIndex(),
                },
                {
                    type: "Corners",
                    home: calcculateNextIndex(),
                    away: calcculateSameIndex(),
                },
                {
                    type: "Offsides",
                    home: calcculateNextIndex(),
                    away: calcculateSameIndex(),
                },
                {
                    type: "Ball Possession",
                    home: calcculateNextIndex() + "%",
                    away: calcculateSameIndex() + "%",
                },
                {
                    type: "Yellow Cards",
                    home: calcculateNextIndex(),
                    away: calcculateSameIndex(),
                },
                {
                    type: "Red Cards",
                    home: calcculateNextIndex(),
                    away: calcculateSameIndex(),
                },
                {
                    type: "Passes Total",
                    home: calcculateNextIndex(),
                    away: calcculateSameIndex(),
                },
            ],
        };
    }

    function generateArrayWithIncreasedNumber(arrayLength: number) {
        return Array.from(Array(arrayLength).keys());
    }

    function generateTestDataWithUnknownKey() {
        let testData = generateTestData(
            () => "1",
            () => "1"
        );
        testData.statistics.push({type: "invalid", home: "1", away: "2"});
        testData.statistics.push({type: "invalid2", home: "1", away: "2"});
        return testData;
    }
});

