import dayjs from "dayjs";

export function dateFormat(date: string) {
  if (!date) return "";
  return dayjs(date).format("DD/MM/YYYY");
}
