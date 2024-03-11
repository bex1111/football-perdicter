import { assert, expect } from "chai";
import { ApiFootballInput } from "./ApiFootballInput";
import { DateGateway } from "../DateGateway";
import { anything, instance, mock, spy, when } from "ts-mockito";
import { get } from "https";
import * as https from "https";
import { ClientRequest } from "http";

describe("apiFootballInput", function () {
  let dataGateway: DateGateway = mock<DateGateway>();
  let httpsIInstance = mock<typeof https>();

  beforeEach(() => {
    when(dataGateway.now()).thenCall(() => new Date("2022-10-05"));
    // let mockhttps=instance(httpsIInstance)
    // when(mockhttps.get(anything())).thenReturn(new ClientRequest("http://localhost:8080/"))
  });

  it("test", function () {
    let apiFootballInput = new ApiFootballInput(instance(dataGateway));
    expect(apiFootballInput.input).deep.equal({});
  });
});
