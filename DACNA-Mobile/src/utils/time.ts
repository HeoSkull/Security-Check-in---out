export const addPadding = (num: number): string => {
  return num < 10 ? `0${num}` : num.toString();
};

export const convertStringToTimestamp = (date: string): string => {
  const unixTime = Date.parse(date);
  const unixNow = Date.now();

  const delta = unixNow - unixTime;

  const seconds = Math.floor(delta / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  // return string in hh:mm:ss format
  return `${addPadding(hours)}:${addPadding(minutes % 60)}:${addPadding(seconds % 60)}`;
};
