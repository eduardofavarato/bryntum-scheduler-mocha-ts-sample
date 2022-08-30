import {
  FETCH_EVENTS_GANTT_CHART_SUCCESS,
  PEOPLE_GANTT_CHART_HIDE,
  PEOPLE_GANTT_CHART_SHOW,
  TypesafeThunkAction,
  voidTypesafeActionCreator,
} from "@/constants/actionTypes";

const fetchPeopleAndAppend = (): TypesafeThunkAction => (dispatch) => {
  dispatch(voidTypesafeActionCreator(FETCH_EVENTS_GANTT_CHART_SUCCESS));
};

export const peopleGanttChartActions = {
  show: voidTypesafeActionCreator(PEOPLE_GANTT_CHART_SHOW),
  hide: voidTypesafeActionCreator(PEOPLE_GANTT_CHART_HIDE),
  fetchPeopleAndAppend,
};
