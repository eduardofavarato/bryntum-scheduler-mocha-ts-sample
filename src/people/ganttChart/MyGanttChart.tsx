import * as React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AppState } from "@/combinedReducers";
import { TypesafeAction } from "@/constants/actionTypes";
import { peopleGanttChartActions } from "@/people/ganttChart/peopleGanttChartAction";
import { peopleGanttChartConfig } from "@/people/ganttChart/PeopleGanttChartConfig";
import { PeopleGanttChartState } from "@/people/ganttChart/peopleGanttChartReducer";
import { BryntumScheduler } from "@bryntum/scheduler-react";
import {
  addDaysToDate,
  calculateThreeMonthsAhead,
} from "@util/dateServiceWithMoment";
import { getStylesheet } from "@util/getStylesheet";

const styles = getStylesheet(() => require("./MyGanttChart.scss"));

export type ReduxStateProps = {
  readonly peopleGanttChart: PeopleGanttChartState;
};

export type ComponentDispatchProps = {
  readonly fetchPeopleEvents: () => TypesafeAction;
};

function mapStateToProps(state: AppState): ReduxStateProps {
  return {
    peopleGanttChart: state.peopleGanttChart,
  };
}

function mapDispatchToProps(dispatch): ComponentDispatchProps {
  return {
    fetchPeopleEvents: () =>
      dispatch(peopleGanttChartActions.fetchPeopleAndAppend()),
  };
}

type Resource = {
  id: string;
  name: string;
};

type Events = {
  id: number;
  resourceId: string;
  name: string;
  eventColor: string;
  startDate: string;
  endDate: string;
  type: string;
};

function MyGanttChart(
  props: ReduxStateProps & ComponentDispatchProps
): JSX.Element {
  const [resources, setResources] = useState<Resource[]>([]);
  const [events, setEvents] = useState<Events[]>([]);
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  const [endDate, setEndDate] = useState<string>("");

  const getIdsAndDisplayNames = (): Resource[] => {
    return props.peopleGanttChart.people.map((people) => {
      return {
        id: people.id,
        name: people.displayName,
      };
    });
  };

  const getEventColor = (commitmentType): string => {
    if (commitmentType === "ASSIGNMENT") {
      return "rgba(34, 81, 255, 0.2)";
    } else if (commitmentType === "AVAILABLE_TIME") {
      return "rgba(0, 127, 38, 0.2)";
    }
    return "rgba(236, 236, 236, 1)";
  };

  const getEventName = (commitmentTitle, commitmentType): string => {
    if (commitmentType !== "ASSIGNMENT") {
      return commitmentType === "AVAILABLE_TIME" ? "Available" : "Other";
    }

    return commitmentTitle;
  };

  const getCommitmentsAndAssignments = (): void => {
    const response = props.peopleGanttChart.peopleEvents.flatMap(
      (peopleEvent) => {
        let id = 0;
        return peopleEvent.currentAndUpcomingCommitments.map((commitment) => {
          return {
            id: ++id + parseInt(peopleEvent.id),
            utilization:
              "utilization" in commitment ? commitment.utilization : "100%",
            resourceId: peopleEvent.id,
            name: getEventName(commitment.clientName, commitment.type),
            eventColor: getEventColor(commitment.type),
            startDate: commitment.startDate,
            endDate:
              commitment.endDate === null
                ? endDate
                : addDaysToDate(commitment.endDate, 1),
            type: commitment.type,
          };
        });
      }
    );
    setEvents(response);
  };

  useEffect(() => {
    setEndDate(calculateThreeMonthsAhead());
  }, []);

  useEffect(() => {
    setResources(getIdsAndDisplayNames());
    if (isFirstRender && !props.peopleGanttChart.isLoadingPeople)
      setIsFirstRender(false);
  }, [props.peopleGanttChart.isLoadingPeople]);

  useEffect(() => {
    if (!props.peopleGanttChart.isLoadingEvents && endDate)
      getCommitmentsAndAssignments();
  }, [props.peopleGanttChart.isLoadingEvents, endDate]);

  return (
    <div {...styles("gridWrapper")}>
      {!isFirstRender && (
        <BryntumScheduler
          data-test-id="scheduler"
          resources={resources}
          endDate={endDate}
          events={events}
          {...peopleGanttChartConfig}
        />
      )}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MyGanttChart);
