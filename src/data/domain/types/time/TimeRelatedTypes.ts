export enum TimeMeasurement {
  MINUTES = "m",
  HOURS = "h",
  DAYS = "d",
  WEEKS = "w",
  MONTHS = "M",
  QUARTERS = "Q",
  YEARS = "y",
}

export interface TimeWindow {
  startTimestamp: number
  endTimestamp: number
  timeStepInSecondsPattern: number[]
}

export interface TimeRange {
  start: number
  end: number
}

export const MONTH_LAYOUT: Record<number, string> = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
}

export const QUARTERS_LAYOUT = ["Q1", "Q2", "Q3", "Q4"]

export interface TimeSection {
  scale: TimeMeasurement
  name: string
  year: number
}
