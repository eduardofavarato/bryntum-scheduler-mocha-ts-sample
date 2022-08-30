import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AppState } from "@/combinedReducers";

export type TypesafeThunkAction<R = void> = ThunkAction<
  R,
  AppState,
  any,
  AnyAction
>;
export type TypesafeThunkDispatch = ThunkDispatch<AppState, any, AnyAction>;

export interface TypesafeAction<T = unknown> {
  readonly type: string;
  readonly payload: T;
}

interface TypesafeActionCreator<T> {
  readonly actionType: string;

  (payload: T): TypesafeAction<T>;
}

interface VoidTypesafeActionCreator extends TypesafeActionCreator<void> {
  (): TypesafeAction<void>;
}

export const typesafeActionCreator = <T>(
  type: string
): TypesafeActionCreator<T> =>
  Object.assign((payload: T): any => ({ type, payload }), { actionType: type });

export const voidTypesafeActionCreator = (
  type: string
): VoidTypesafeActionCreator =>
  Object.assign((): any => ({ type }), { actionType: type });

export const isAction = <T>(
  action: AnyAction,
  actionCreator: TypesafeActionCreator<T>
): action is TypesafeAction<T> => action.type === actionCreator.actionType;

export const PEOPLE_GANTT_CHART_SHOW = "PEOPLE_GANTT_CHART_SHOW";
export const PEOPLE_GANTT_CHART_HIDE = "PEOPLE_GANTT_CHART_HIDE";

export const FETCH_EVENTS_GANTT_CHART_SUCCESS =
  "FETCH_EVENTS_GANTT_CHART_SUCCESS";
export const FETCH_EVENTS_GANTT_CHART_FAILURE =
  "FETCH_EVENTS_GANTT_CHART_FAILURE";
export const FETCH_EVENTS_GANTT_CHART_REQUEST =
  "FETCH_EVENTS_GANTT_CHART_REQUEST";
