import { expect } from "chai";
import { ApiFootballInput } from "./ApiFootballInput";
import { DateGateway } from "../DateGateway";
import { instance, mock, when } from "ts-mockito";
import { isFileExist, removeFile, writeFile } from "../file/FileGateway";
import { IncomingMessage } from "http";
import { Socket } from "net";
import { ApiFootballError } from "../../exception/ApiFootballError";

describe("apiFootballInput", function () {
  const TEST_CACHED_FILE_NAME = "cached-data-2022-10-05.json";

  let dataGateway: DateGateway = mock<DateGateway>();
  let url: any;

  beforeEach(() => {
    removeFile(TEST_CACHED_FILE_NAME);
    when(dataGateway.now()).thenCall(() => new Date("2022-10-05"));
    url = undefined;
  });

  it("read from cached file", function () {
    writeFile(TEST_CACHED_FILE_NAME, '["file"]');
    let apiFootballInput = new ApiFootballInput(
      instance(dataGateway),
      mockGetData
    );
    expect(url).undefined;
    expect(apiFootballInput.input).deep.equal(["file"]);
  });

  it("call api and save data to cache file", function () {
    let apiFootballInput = new ApiFootballInput(
      instance(dataGateway),
      mockGetData
    );

    expect(url).equal(
      "https://apiv3.apifootball.com/?action=get_events&from=2023-08-11&to=2024-05-20&league_id=152&APIkey=undefined"
    );
    expect(apiFootballInput.input).deep.equal(["api"]);
    expect(isFileExist(TEST_CACHED_FILE_NAME)).true;
  });

  it("call api and log error", function () {
    expect(
     ()=> new ApiFootballInput(instance(dataGateway), mockGetError)
    ).to.throw("Test error");
  });

  function callCallback(callbackSpy: any) {
    let message = new IncomingMessage(new Socket());
    callbackSpy(message);
    return message;
  }

  function mockGetData(urlSpy: any, callbackSpy: any): any {
    url = urlSpy;
    let message = new IncomingMessage(new Socket());

    callbackSpy(message);
    message.emit("data", '["api"]');
    message.emit("end");
  }

  function mockGetError(urlSpy: any, callbackSpy: any): any {
    url = urlSpy;
    let message = callCallback(callbackSpy);

    message.emit("error", new Error("Test error"));
    message.emit("end");
  }
});
