import { MOTIVATIONAL_PHRASES } from '../constants/phrases'

import { getRandomItemFromArray } from './utils'

export const getRandomMotivationalPhrase = () => {
    return getRandomItemFromArray(MOTIVATIONAL_PHRASES)
}