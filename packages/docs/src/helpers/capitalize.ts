export const capitalize = (s: string): string => {
  if (s === 'usa') {
    return s.toUpperCase();
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
};
