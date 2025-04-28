// Utility function to get today's date in YYYY-MM-DD format
export const getTodayDate = (): string => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Returns date in YYYY-MM-DD format
  };
  
  // Utility function to get the date one week from today in YYYY-MM-DD format
  export const getOneWeekLaterDate = (): string => {
    const today = new Date();
    today.setDate(today.getDate() + 7); // Add 7 days to today's date
    return today.toISOString().split('T')[0]; // Returns date in YYYY-MM-DD format
  };
  