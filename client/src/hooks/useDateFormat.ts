export function useDateFormat(date: Date | { from: Date; to: Date }): string {
  return date instanceof Date ?
    convertToStringAndSliceDate(date) :
    `${convertToStringAndSliceDate(date.from)} - ${convertToStringAndSliceDate(date.to)}`;
}

function convertToStringAndSliceDate(date: Date) {
  return date.toLocaleString().split(',')[0];
}
