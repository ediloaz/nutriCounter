import { FreeBreakfast, RiceBowl, DinnerDining, BakeryDining, Fastfood } from '@mui/icons-material';

export const FOOD_TIMES = {
  breakfast: {
    id: 'breakfast',
    name: 'Desayuno',
    icon: (props) => <FreeBreakfast {...props} />,
  },
  lunch: {
    id: 'lunch',
    name: 'Almuerzo',
    icon: (props) => <RiceBowl {...props} />,
  },
  dinner: {
    id: 'dinner',
    name: 'Cena',
    icon: (props) => <DinnerDining {...props} />,
  },
  snack: {
    id: 'snack',
    name: 'Snack',
    icon: (props) => <BakeryDining {...props} />,
  },
  other: {
    id: 'other',
    name: 'Otro',
    icon: (props) => <Fastfood {...props} />,
  },
}
