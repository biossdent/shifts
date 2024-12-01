import moment from "moment";

export const formatDate = (date: string, format: string) => {
  return moment(date).format(format);
};