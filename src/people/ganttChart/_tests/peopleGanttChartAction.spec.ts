import { sinon } from "@/_tests/helpers/common";
import {
  FETCH_EVENTS_GANTT_CHART_FAILURE,
  FETCH_EVENTS_GANTT_CHART_REQUEST,
  FETCH_EVENTS_GANTT_CHART_SUCCESS,
} from "@/constants/actionTypes";
import { peopleGanttChartActions } from "@/people/ganttChart/peopleGanttChartAction";
import * as dateService from "@util/dateService";

describe("peopleGanttCharAction", () => {
  let performStandardRequestStub;
  let dispatchSpy;

  beforeEach(() => {
    dispatchSpy = sinon.stub();
  });

  it("performs a POST request to the fetchPeopleAndAppend", () => {
    const timeZoneOffset = dateService.timezoneOffset();
    const ids = ["1234", "4321"];
    const requestBody = {
      ids: ids,
      tzOffset: timeZoneOffset,
    };

    // performStandardRequestStub = sinon.stub(jsonRequest, 'performStandardRequest');

    const myActionThunk = peopleGanttChartActions.fetchPeopleAndAppend();
    myActionThunk(dispatchSpy, sinon.stub().returns({}), undefined);

    sinon.assert.calledOnce(performStandardRequestStub);
    sinon.assert.calledWithExactly(performStandardRequestStub, {
      url: "/peopleGantt",
      success: FETCH_EVENTS_GANTT_CHART_SUCCESS,
      failure: FETCH_EVENTS_GANTT_CHART_FAILURE,
      request: FETCH_EVENTS_GANTT_CHART_REQUEST,
      body: requestBody,
      method: "POST",
      dispatch: dispatchSpy,
    });
  });
});
