export interface DayInfo {
  month: string;
  date: number;
  day: string;
  isToday: boolean;
}

/**
 * Returns the start date (Monday) of the week containing the given date
 * @param date Optional date to calculate from. Defaults to current date if not provided
 * @returns Date object representing Monday of the current week
 */
export function getStartOfWeek(date: Date = new Date()): Date {
  const day = date.getDay();
  // Convert Sunday (0) to 7 to make Monday (1) the start of the week
  const diff = date.getDate() - (day === 0 ? 7 : day) + 1;
  const startOfWeek = new Date(date);
  startOfWeek.setDate(diff);
  // Reset time to start of day
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek;
}

/**
 * Returns an array of formatted day information for the week
 * @param date Optional date to calculate from. Defaults to current date if not provided
 * @returns Array of DayInfo objects containing formatted date information
 */
export function getWeekDates(date: Date = new Date()): DayInfo[] {
  const startOfWeek = getStartOfWeek(date);
  const weekDates: DayInfo[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);

    weekDates.push({
      month: months[currentDate.getMonth()],
      date: currentDate.getDate(),
      day: days[currentDate.getDay()],
      isToday: currentDate.getTime() === today.getTime(),
    });
  }

  return weekDates;
}

/**
 * Returns the current day's information
 * @returns DayInfo object for the current day
 */
export function getCurrentDayInfo(): DayInfo {
  const today = new Date();
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  return {
    month: months[today.getMonth()],
    date: today.getDate(),
    day: days[today.getDay()],
    isToday: true,
  };
}
