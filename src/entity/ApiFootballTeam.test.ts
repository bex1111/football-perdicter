import { assert, expect } from "chai";
import ApiFootballTeam from "./ApiFootballTeam";
import ApiFootballResult from "./ApiFootballResult";
import { instance, mock } from "ts-mockito";

describe("football team", function () {
  const name = "testTeam";

  let footballTeam: ApiFootballTeam;
  beforeEach(function () {
    footballTeam = new ApiFootballTeam(name);
  });

  it("name getter", function () {
    expect(name).equals(footballTeam.name);
  });

  it("last round init state", function () {
    expect(0).equals(footballTeam.lastPlayedRound);
  });

  it("homeScores getter setter", function () {
    let results = [];
    for (let i = 0; i <= 2; i++) {
      let resultMock = mock(ApiFootballResult);
      let result = instance(resultMock);
      results.push(result);
      footballTeam.addHomeResult(result, i);
    }
    assert.deepEqual(results, footballTeam.homeResults);
    expect(2).equals(footballTeam.lastPlayedRound);
  });

  it("awayScores getter setter", function () {
    let results = [];
    for (let i = 5; i >= 2; i--) {
      let resultMock = mock(ApiFootballResult);
      let result = instance(resultMock);
      results.push(result);
      footballTeam.addAwayResult(result, i);
    }
    assert.deepEqual(results, footballTeam.awayResults);
    expect(5).equals(footballTeam.lastPlayedRound);
  });
});
