import { combineReducers, Reducer } from "redux";
import {
  peopleGanttChartReducer,
  PeopleGanttChartState,
} from "@/people/ganttChart/peopleGanttChartReducer";

export interface AppState {
  readonly peopleGanttChart: PeopleGanttChartState;
}

const reducers: { [P in keyof AppState]: Reducer<AppState[P]> } = {
  peopleGanttChart: peopleGanttChartReducer,
};

const combinedReducers = combineReducers<AppState>(reducers);

export default combinedReducers;
