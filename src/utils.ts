export type Pretty<T> = {
  [K in keyof T]: T[K];
} & {};

export type PrettyDeep<T> = {
  [K in keyof T]: T[K] extends object ? Pretty<T[K]> : T[K];
} & {};
