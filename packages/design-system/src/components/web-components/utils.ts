export const isPossibleValue = <T extends string>(
  value: string | undefined,
  possibleValues: readonly T[]
): value is T => {
  return possibleValues.includes(value as T);
};
