import moment from "moment"

import { BOTTOM_BACKGROUND } from '../constants/images'

export const getBottomBackground = () => {
    const hourNow = moment(new Date()).hour()
  
    if (hourNow >= 6 && hourNow < 14) return BOTTOM_BACKGROUND?.morning
    else if (hourNow >= 14 && hourNow < 18) return BOTTOM_BACKGROUND?.afternoon
  
    return BOTTOM_BACKGROUND?.night
}
