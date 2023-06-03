import { FreeBreakfast, RiceBowl, DinnerDining, BakeryDining, NoFood, LocalCafe, TakeoutDining, Icecream, LocalDrink } from '@mui/icons-material';

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
  coffee: {
    id: 'coffee',
    name: 'Café',
    icon: (props) => <LocalCafe {...props} />,
  },
  dinner: {
    id: 'dinner',
    name: 'Cena',
    icon: (props) => <DinnerDining {...props} />,
  },
  beverage: {
    id: 'beverage',
    name: 'Bebidas',
    icon: (props) => <LocalDrink {...props} />,
  },
  snack: {
    id: 'snack',
    name: 'Snack',
    icon: (props) => <BakeryDining {...props} />,
  },
  dessert: {
    id: 'dessert',
    name: 'Postre',
    icon: (props) => <Icecream {...props} />,
  },
  junk: {
    id: 'junk',
    name: 'Chatarra',
    icon: (props) => <NoFood {...props} />,
  },
  other: {
    id: 'other',
    name: 'Otro',
    icon: (props) => <TakeoutDining {...props} />,
  },
}
