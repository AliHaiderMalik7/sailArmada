// src/utils/dateUtils.ts
export const getNextSaturday = (): Date => {
    const today = new Date();
    const nextSaturday = new Date(
      today.setDate(today.getDate() + ((6 - today.getDay() + 7) % 7))
    );
    nextSaturday.setHours(0, 0, 0, 0); // Reset time to midnight
    return nextSaturday;
  };
  
  export const getDefaultDateRange = (): [Date, Date] => {
    const saturday = getNextSaturday();
    const checkOutDate = new Date(saturday);
    checkOutDate.setDate(checkOutDate.getDate() + 7); // Default check-out 7 days after Saturday
    return [saturday, checkOutDate];
  };
  

  export const normalizeDateToUTC = (date: Date) => {
    const offset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
    return (
      new Date(date.getTime() - offset).toISOString().split("Z")[0] + "Z"
    );
  };