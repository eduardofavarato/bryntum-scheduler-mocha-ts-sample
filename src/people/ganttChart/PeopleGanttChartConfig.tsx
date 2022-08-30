/**
 * Application configuration
 */
import React from "react";
import { DateHelper, SchedulerConfig, StringHelper } from "@bryntum/scheduler";
import { calculateThreeMonthsAhead } from "@util/dateServiceWithMoment";
import { getStylesheet } from "@util/getStylesheet";

const styles = getStylesheet(() => require("./MyGanttChart.scss"));

type infoColumn = {
  value: string;
  record: any;
};

const InfoColumn = (props: { name: string; id: string }): JSX.Element => {
  return (
    <div
      style={{ whiteSpace: "pre-line", display: "flex" }}
      {...styles("infoColumn")}
    >
      <div>
        <strong>{props.id}</strong>
        <strong>{props.id}</strong>
      </div>
    </div>
  );
};

const peopleGanttChartConfig: Partial<SchedulerConfig> = {
  readOnly: true,
  rowHeight: 70,
  enableRecurringEvents: false,
  timeAxis: {
    continuous: false,
    generateTicks: (start, end, unit, increment) => {
      const ticks: any = [];
      while (start < end) {
        if (start.getDay() > 0 && start.getDay() < 6) {
          ticks.push({
            id: ticks.length + 1,
            startDate: start,
            endDate: DateHelper.add(start, increment, unit),
          });
        }
        start = DateHelper.add(start, increment, unit);
      }
      return ticks;
    },
  },
  viewPreset: "GanttChartPreset",
  resourceImagePath: "",
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  eventTooltipFeature: ({ eventRecord, startDate, endDate }) => {
    const isFullAvailable =
      eventRecord.name === "Available" &&
      DateHelper.format(endDate, "YYYY-MM-DD") === calculateThreeMonthsAhead();
    const endFormat = DateHelper.add(endDate, -1);
    return `<dl> 
            <dt>${eventRecord.name}</dt>
            <dd class="b-icon b-icon-calendar-week">&ensp;${DateHelper.format(
              startDate,
              "MMM DD, YYYY"
            )}</dd>
            ${
              isFullAvailable
                ? `<dd class="b-icon b-icon-calendar-week">&ensp;----</dd>`
                : `<dd class="b-icon b-icon-calendar-week">&ensp;${DateHelper.format(
                    endFormat,
                    "MMM DD, YYYY"
                  )}</dd>`
            }
        </dl>`;
  },
  eventEditFeature: false,
  scheduleTooltipFeature: false,
  eventMenuFeature: false,
  scheduleMenuFeature: false,
  timeAxisHeaderMenuFeature: false,
  columns: [
    {
      type: "resourceInfo",
      text: "Name",
      showEventCount: false,
      renderer({ value, record }: infoColumn): JSX.Element {
        return InfoColumn({ name: value, id: record.data.id });
      },
    },
  ],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  eventBodyTemplate: (data) => StringHelper.xss`
                <div style="display: flex; flex-direction: column; color:${data.textColor}">
                    <div style="width: 85px; text-overflow: ellipsis; overflow: hidden;">${data.name}</div>
                    <div>${data.utilization}%</div> 
                </div>
    `,

  eventRenderer({ eventRecord }) {
    return {
      name: eventRecord.name,
      utilization: eventRecord.utilization,
      textColor: "rgba(34, 81, 255, 1)",
    };
  },
};

// const peopleGanttChartConfig: Partial<SchedulerConfig> = {

//     startDate        : new Date(2022, 2, 20, 6),
//     endDate          : new Date(2022, 2, 20, 20),
//     viewPreset       : 'hourAndDay',
//     rowHeight        : 50,
//     barMargin        : 5,
//     multiEventSelect : true,

//     columns : [
//         { text : 'Name', field : 'name', width : 130 }
//     ],

//     crudManager : {
//         transport : {
//             load : {
//                 url : 'data/scheduler-data.json'
//             }
//         },
//         autoLoad : true
//     }
// };

export { peopleGanttChartConfig };
