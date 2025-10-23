export interface TimeLeft {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function getTimeUntilChristmas(): TimeLeft {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDay = now.getDate();
  
  // Christmas is December 25th (month 11 in JavaScript)
  let christmasYear = currentYear;
  
  // If it's December 26th or later, count down to next year's Christmas
  if (currentMonth === 11 && currentDay > 25) {
    christmasYear = currentYear + 1;
  }
  
  const christmas = new Date(christmasYear, 11, 25, 0, 0, 0, 0);
  const difference = christmas.getTime() - now.getTime();
  
  if (difference < 0) {
    // It's Christmas Day!
    return {
      total: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }
  
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
  return {
    total: difference,
    days,
    hours,
    minutes,
    seconds,
  };
}

export function formatTimeUnit(value: number): string {
  return value.toString().padStart(2, '0');
}