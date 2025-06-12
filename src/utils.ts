export type Pretty<T> = {
  [K in keyof T]: T[K];
} & {};

export type PrettyDeep<T> = {
  [K in keyof T]: T[K] extends object ? Pretty<T[K]> : T[K];
} & {};

export const parseLocalDate = (str: string) => {
  const split = str.split("-").map(Number);
  if (split.length != 3) {
    throw new Error(`Date ${str} is not our date format`);
  }
  const [year, month, day] = split;
  return new Date(year, month - 1, day); // local time!
};
