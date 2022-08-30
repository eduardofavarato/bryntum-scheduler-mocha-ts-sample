import moment from "moment-timezone";

export const calculateThreeMonthsAhead = (): string => {
  const today = moment();
  const dayAfterThreeMonths = today.add(3, "months");
  return dayAfterThreeMonths.format("YYYY-MM-DD");
};

export const addDaysToDate = (date: string, days: number): string => {
  const momentDate = moment(date);

  return momentDate.add(days, "days").format("YYYY-MM-DD");
};
