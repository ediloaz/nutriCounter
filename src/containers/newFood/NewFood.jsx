import { useEffect, useState } from "react";
import { sumBy } from 'lodash';

import {
  Divider,
  Chip,
  Alert,
  AlertTitle,
  Button,
  Typography,
} from "@mui/material";
import { SentimentSatisfiedAlt, AccessAlarm, Scale, WbSunny } from "@mui/icons-material";

import BackButton from "../../components/BackButton/BackButton";

import USERS from "../../constants/users";
import { EMPTY_DAILY } from "../../constants/daily";
import { FOOD_TIMES } from "../../constants/foodTimes";
import { CATEGORIES } from "../../constants/categories";

import { hasNonZeroValue, findPositionOfTrue } from "../../helpers/utils";

import SelectTime from "./selectTime/SelectTime";
import SelectQuantity from "./selectQuantity/SelectQuantity";
import SelectHour from "./selectHour/SelectHour";
import HeaderStepper from "./headerStepper/HeaderStepper";

import "./newFood.css";

const END_STEP = 3;
const USE_ONE_SCREEN = true;

const STEPS = {
  1: {
    step: 1,
    Icon: (props = {}) => <WbSunny {...props} />,
    label: "Tiempo",
    description:<>Selecciona el <strong>tiempo de comida</strong> que hiciste.</>
  },
  2: {
    step: 2,
    Icon: (props = {}) => <Scale {...props} />,
    label: "Distribución",
    description:<>Usa ADA para registrar cada categoría de comida,<strong> o bien, usa el método de calorías</strong> que es más exacto y registralo completo o por cada ingrediente/alimento utilizado.</>
  },
  3: {
    step: 3,
    Icon: (props = {}) => <AccessAlarm {...props} />,
    label: "Hora",
    description:<>Hora de esta comida, déjalo en blanco para usar la actual.</>
  },
};

const WelcomeTitle = ({ step, userName }) => {
  if (USE_ONE_SCREEN)
    return (
      <Typography variant="h5" className="explication" textAlign="center">
        {userName}, llena <b>todas</b> las opciones.
      </Typography>
    );
  else if (step === 1)
    return (
      <>
        <Typography className="title" textAlign="center">
          {STEPS?.[step]?.label}
        </Typography>
        <Typography className="explication" textAlign="center">
          Hola {userName}, completa las 3 pantallas siguientes
        </Typography>
      </>
    );
  else return <></>;
};

const CustomDivider = ({ step }) => (
  <>
    <Divider className={`dividerLine step${step}`} id={`dividerStep${step}`}>
      <Chip label={STEPS[step]?.Icon()} />
    </Divider>
    <Alert icon={STEPS[step]?.Icon()} severity="info" className="dividerAlert">
      <AlertTitle>
        Paso {step}: {STEPS[step]?.label}
      </AlertTitle>
      {STEPS[step]?.description}
    </Alert>
  </>
);

const OneScreen = ({
  step,
  userData,
  foodTime,
  onChangeFoodTime,
  onChangeFoodHour,
  add,
  remove,
  plannData,
  dailyData,
  currentFood,
}) => {
  return (
    <div>
      <CustomDivider step={1} />
      <SelectTime
        userData={userData}
        foodTime={foodTime}
        onChangeFoodTime={onChangeFoodTime}
      />
      <CustomDivider step={2} />
      <SelectQuantity
        add={add}
        remove={remove}
        plannData={plannData}
        dailyData={dailyData}
        currentFood={currentFood}
      />
      <CustomDivider step={3} />
      <SelectHour onChangeFoodHour={onChangeFoodHour} />
    </div>
  );
};

const SwitcherStepsScreen = ({
  step,
  userData,
  foodTime,
  onChangeFoodTime,
  onChangeFoodHour,
  add,
  remove,
  plannData,
  dailyData,
  currentFood,
}) => {
  switch (step) {
    case 1:
      return (
        <SelectTime
          userData={userData}
          foodTime={foodTime}
          onChangeFoodTime={onChangeFoodTime}
        />
      );
    case 2:
      return (
        <SelectQuantity
          add={add}
          remove={remove}
          plannData={plannData}
          dailyData={dailyData}
          currentFood={currentFood}
        />
      );
    case 3:
      return <SelectHour onChangeFoodHour={onChangeFoodHour} />;
    default:
      return <></>;
  }
};

const _totalCaloriesByNewFood = (currentFood) => {
  const totalCaloriesCategories = sumBy(CATEGORIES, category => category.kcal * currentFood[category.id])
  const totalCaloriesCustomFoods = sumBy(currentFood?.customFoods, food => parseInt(food.cal))
  
  return totalCaloriesCategories + totalCaloriesCustomFoods;
}

const NewFood = ({
  user,
  plann,
  daily,
  getDaily,
  getPlanns,
  addNewFood,
  changeScreen,
}) => {
  const [plannData, setPlannData] = useState({});
  const [dailyData, setDailyData] = useState({});
  const [currentFood, setCurrentFood] = useState(EMPTY_DAILY);
  const [foodTime, setFoodTime] = useState(null);
  const [foodHour, setFoodHour] = useState(new Date());
  // eslint-disable-next-line no-unused-vars
  const [step, setStep] = useState(1);
  const [stepsCompleted, setStepsCompleted] = useState([false, false, false]);

  const userData = USERS?.[user];

  const add = (id, value = null) => {
    if (value) {
      setCurrentFood({ ...currentFood, [id]: value });
    } else {
      setCurrentFood({ ...currentFood, [id]: (currentFood?.[id] || 0) + 0.5 });
    }
  };
  const remove = (id) =>
    setCurrentFood({ ...currentFood, [id]: (currentFood?.[id] || 0) - 0.5 });

  const _addNewFood = () => {
    const newFood = {};

    Object.keys(currentFood).forEach((key) => {
      newFood[key] = dailyData[key] + currentFood[key];
    });

    const newCurrent = {
      customFoods: [],
      ...currentFood,
      foodTime,
      hour: foodHour,
      calories: _totalCaloriesByNewFood(currentFood),
    };

    addNewFood({
      daily: newFood,
      current: newCurrent,
      history: dailyData?.history || [],
    });
    changeScreen("main");
  };

  const onChangeFoodTime = (id) => {
    setFoodTime(id)
    setTimeout(() => handleScroll('dividerStep2'), 300)    
  }

  const onChangeFoodHour = (value) => setFoodHour(value);

  const handleScroll = (id) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const plannQuery = getPlanns(plann);
    plannQuery.then((data) => {
      console.log(`Plan actual de ${plann}:`, data);
      setPlannData(data);
    });

    const dailyQuery = getDaily(daily);
    dailyQuery.then((data) => {
      console.log(`Daily actual de ${daily}:`, data);
      setDailyData(data);
    });
  }, [daily, plann, getDaily, getPlanns]);

  useEffect(() => {
    const newStepCompleted = stepsCompleted;
    if (foodTime) newStepCompleted[0] = true;
    if (hasNonZeroValue(currentFood)) newStepCompleted[1] = true;
    if (foodHour) newStepCompleted[2] = true;

    setStepsCompleted(newStepCompleted);
  }, [foodTime, currentFood, foodHour, stepsCompleted]);

  const isCompleted = findPositionOfTrue(stepsCompleted) === END_STEP;

  const FormComponent = USE_ONE_SCREEN ? OneScreen : SwitcherStepsScreen;
  
  return (
    <div className={`NewFood step${step}`}>
      <div className="NewFoodHeader">
        <BackButton
          changeScreen={changeScreen}
          screen="main"
          disabled={step > 1}
        />
        <HeaderStepper
          handleScroll={handleScroll}
          foodTime={foodTime}
          foodHour={foodHour}
          currentFood={currentFood}
          steps={STEPS}
        />
      </div>
      <WelcomeTitle step={step} userName={userData?.name} />
      <div className="NewFoodContainer">
        <FormComponent
          step={step}
          userData={userData}
          foodTime={foodTime}
          onChangeFoodTime={onChangeFoodTime}
          onChangeFoodHour={onChangeFoodHour}
          add={add}
          remove={remove}
          plannData={plannData}
          dailyData={dailyData}
          currentFood={currentFood}
        />
      </div>
      <div className="NewFoodFooter">
      <Alert icon={<SentimentSatisfiedAlt />} severity="success" className="dividerAlert">
        <AlertTitle>
          Resumen
        </AlertTitle>
        Tu {FOOD_TIMES?.[foodTime]?.name}, tiene {_totalCaloriesByNewFood(currentFood)} kcal
      </Alert>
        <Button
          disabled={!isCompleted}
          color="success"
          variant="contained"
          size="large"
          onClick={() => _addNewFood(currentFood)}
        >
          REGISTRAR COMIDA
        </Button>
      </div>
    </div>
  );
};

export default NewFood;
