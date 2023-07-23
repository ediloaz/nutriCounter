import { GREETINGS } from '../constants/greetings'

import { getRandomItemFromArray } from './utils'

export const getRandomGreeting = () => {
    return getRandomItemFromArray(GREETINGS)
}