import { Reducer } from "redux";
import {
  FETCH_EVENTS_GANTT_CHART_FAILURE,
  FETCH_EVENTS_GANTT_CHART_REQUEST,
  FETCH_EVENTS_GANTT_CHART_SUCCESS,
  isAction,

} from "@/constants/actionTypes";
import { peopleGanttChartActions } from "@/people/ganttChart/peopleGanttChartAction";
import { PeopleCommitmentsAndAssignments } from "@/people/peopleTypes";
import { combine } from "@util/combine";

export type People = {
  readonly id: string;
  readonly displayName: string;
};

export type PeopleGanttChartState = {
  readonly isGanttChartEnabled: boolean;
  readonly isLoadingEvents: boolean;
  readonly peopleEvents: PeopleCommitmentsAndAssignments[];
  readonly isLoadingPeople: boolean;
  readonly people: People[];
};

export const initialPeopleGanttChartState = (): PeopleGanttChartState => ({
  isGanttChartEnabled: false,
  isLoadingEvents: false,
  peopleEvents: [],
  isLoadingPeople: false,
  people: [],
});

export const peopleGanttChartReducer: Reducer<PeopleGanttChartState> = (
  state = initialPeopleGanttChartState(),
  action
) => {
  if (isAction(action, peopleGanttChartActions.show)) {
    return combine(state, { isGanttChartEnabled: true });
  }

  if (isAction(action, peopleGanttChartActions.hide)) {
    return combine(state, { isGanttChartEnabled: false });
  }

  switch (action.type) {
    case FETCH_EVENTS_GANTT_CHART_REQUEST:
      return combine(state, {
        isLoadingEvents: true,
      });
    case FETCH_EVENTS_GANTT_CHART_SUCCESS: {
      const response = action.payload as PeopleCommitmentsAndAssignments[];
      if (!state.isLoadingEvents) {
        return state;
      }
      const events = response;
      return combine(state, {
        peopleEvents: [...state.peopleEvents, ...events],
        isLoadingEvents: false,
      });
    }
    case FETCH_EVENTS_GANTT_CHART_FAILURE:
      return combine(state, {
        peopleEvents: [],
        isLoadingEvents: false,
      });
    default:
      return state;
  }
};
