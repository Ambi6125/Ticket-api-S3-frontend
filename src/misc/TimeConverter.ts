const monthConversions: { [key: number]: string } = {
  0: "01",
  1: "02",
  2: "03",
  3: "04",
  4: "05",
  5: "06",
  6: "07",
  7: "08",
  8: "09",
  9: "10",
  10: "11",
  11: "12",
};

export const TimeConverter = {
  convertISOtoDisplay: (ISOstring: string): string => {
    const dateValue: Date = new Date(ISOstring);
    const day = dateValue.getDate();
    const month = monthConversions[dateValue.getMonth()];
    const year = dateValue.getFullYear();

    return `${day}-${month}-${year}`;
  },

  convertISOTimetoDisplay: (ISOstring: string): string => {
    const dateValue: Date = new Date(ISOstring);
    const hour = dateValue.getHours();
    const minutes: string = dateValue
      .getMinutes()
      .toLocaleString("en-US", { minimumIntegerDigits: 2 });

    return `${hour}:${minutes}`;
  },
};
