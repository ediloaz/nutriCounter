import moment from "moment";

export const getNameCurrentDaily = (userId, date = null) => {
  const today = moment(date || new Date())

  return `${userId}${today.format("YYMMDD")}`
}