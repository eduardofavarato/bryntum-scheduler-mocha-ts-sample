import {expect} from "@/_tests/helpers/common";
import {getFakePeopleCommitmentsAndAssignments} from "@/_tests/helpers/fakes";
import {FETCH_EVENTS_GANTT_CHART_FAILURE, FETCH_EVENTS_GANTT_CHART_REQUEST, FETCH_EVENTS_GANTT_CHART_SUCCESS,} from "@/constants/actionTypes";
import {peopleGanttChartActions} from "@/people/ganttChart/peopleGanttChartAction";
import {initialPeopleGanttChartState, peopleGanttChartReducer, PeopleGanttChartState,} from "@/people/ganttChart/peopleGanttChartReducer";
import {combine} from "@util/combine";

describe("peopleGanttChartReducer", () => {
  let state: PeopleGanttChartState, action;

  const reduce = () => {
    state = peopleGanttChartReducer(state, action);
  };

  beforeEach(() => {
    state = initialPeopleGanttChartState();
  });

  it("should have initial state", () => {
    expect(state.isGanttChartEnabled).to.be.false;
  });

  it("show sets isGanttChartEnabled to true", () => {
    action = peopleGanttChartActions.show();
    reduce();
    expect(state.isGanttChartEnabled).to.be.true;
  });

  it("hide sets isGanttChartEnabled to false", () => {
    action = peopleGanttChartActions.hide();
    reduce();
    expect(state.isGanttChartEnabled).to.be.false;
  });

  describe(`${FETCH_EVENTS_GANTT_CHART_SUCCESS}`, () => {
    it("should append peopleEvents to a list of PeopleEvents", () => {
      const initialPeople = [
        getFakePeopleCommitmentsAndAssignments({ id: "12345" }),
        getFakePeopleCommitmentsAndAssignments({ id: "45678" }),
      ];
      state = combine(state, { isLoadingEvents: true });
      state = combine(state, { peopleEvents: initialPeople });
      const fetchedPeople = [{ id: "id1" }, { id: "id2" }];
      action = {
        type: FETCH_EVENTS_GANTT_CHART_SUCCESS,
        payload: fetchedPeople,
      };

      reduce();

      expect(state.peopleEvents).to.eql([...initialPeople, ...fetchedPeople]);
      expect(state.isLoadingEvents).to.eql(false);
    });
  });

  describe(`${FETCH_EVENTS_GANTT_CHART_REQUEST}`, () => {
    it("should set isLoadingEvents to true when dispatchRequest", () => {
      const initialPeople = [
        getFakePeopleCommitmentsAndAssignments({ id: "12345" }),
        getFakePeopleCommitmentsAndAssignments({ id: "45678" }),
      ];
      state = combine(state, { peopleEvents: initialPeople });
      action = { type: FETCH_EVENTS_GANTT_CHART_REQUEST };

      reduce();
      expect(state.isLoadingEvents).to.be.eql(true);
    });
  });

  describe(`${FETCH_EVENTS_GANTT_CHART_FAILURE}`, () => {
    it("should set empty peopleEvents list", () => {
      const initialPeople = [
        getFakePeopleCommitmentsAndAssignments({ id: "12345" }),
        getFakePeopleCommitmentsAndAssignments({ id: "45678" }),
      ];
      state = combine(state, { peopleEvents: initialPeople });
      action = { type: FETCH_EVENTS_GANTT_CHART_FAILURE };

      reduce();

      expect(state.peopleEvents).to.be.eql([]);
    });
  });
});
