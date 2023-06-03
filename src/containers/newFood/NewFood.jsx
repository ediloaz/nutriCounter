import { useEffect, useState } from 'react'

import { Button, ButtonGroup, IconButton, Typography } from '@mui/material';
import { 
  ArrowForwardIos as ArrowNext,
  ArrowBackIosNew as ArrowBack,
  AddCircleOutlineRounded as AddCircle,
  CheckCircleOutlineRounded as CheckCircle,


} from '@mui/icons-material';

import BackButton from "../../components/BackButton/BackButton"

import USERS from "../../constants/users"
import { EMPTY_DAILY } from "../../constants/daily";
import { FOOD_TIMES } from "../../constants/foodTimes";

import SelectTime from './selectTime/SelectTime'
import SelectQuantity from './selectQuantity/SelectQuantity'
import SelectHour from './selectHour/SelectHour'

import './newFood.css'

const END_STEP = 3

const TITLE_BY_STEP = {
  1: 'Tiempo',
  2: 'Distribución',
  3: 'Hora',
}

const WelcomeTitle = ({ step, completeName }) =>
  step === 1 &&
    <Typography className='explication' textAlign='center' >
      Hola {completeName}, completa las 3 pantallas siguientes
    </Typography>

const SwitcherStepsScreen = ({ 
  step,
  userData,
  foodTime,
  onChangeFoodTime,
  add,
  remove,
  plannData,
  dailyData,
  currentFood,
 }) => {
  switch(step) {
    case 1:
      return <SelectTime
        userData={userData}
        foodTime={foodTime}
        onChangeFoodTime={onChangeFoodTime}
      />
    case 2:
      return <SelectQuantity
        add={add}
        remove={remove} 
        plannData={plannData}
        dailyData={dailyData}
        currentFood={currentFood}
      />
    case 3:
      return <SelectHour />
    default:
      return <></>
  }
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
  const [plannData, setPlannData] = useState({})
  const [dailyData, setDailyData] = useState({})
  const [currentFood, setCurrentFood] = useState(EMPTY_DAILY)
  const [foodTime, setFoodTime] = useState(FOOD_TIMES?.snack?.id)
  const [step, setStep] = useState(1)

  const userData = USERS?.[user]

  const add = (id) => setCurrentFood({...currentFood, [id]: (currentFood?.[id] || 0) + 0.5})
  const remove = (id) => setCurrentFood({...currentFood, [id]: (currentFood?.[id] || 0) - 0.5})

  useEffect(() => {
    const plannQuery = getPlanns(plann)
    plannQuery.then((data) => {
      console.log(`Plan actual de ${plann}:`, data)
      setPlannData(data)
    })

    const dailyQuery = getDaily(daily)
    dailyQuery.then((data) => {
      console.log(`Daily actual de ${daily}:`, data)
      setDailyData(data)
    })
  }, [daily, plann, getDaily, getPlanns])

  const _addNewFood = () => {
    const newFood = {}

    Object.keys(currentFood).forEach((key) => {
      newFood[key] = dailyData[key] + currentFood[key]
    })

    const newCurrent = {
      ...currentFood,
      foodTime,
    }

    addNewFood({ daily: newFood, current: newCurrent, history: dailyData?.history || [] })
    changeScreen('main')
  }

  const onChangeFoodTime = (id) => setFoodTime(id)

  const NextStep = () => setStep(step + 1)
  const PreviousStep = () => setStep(step - 1)

  return (
    <div className="NewFood">
      <div className="NewFoodHeader">
        <BackButton changeScreen={changeScreen} screen="main" />
        <Typography className='title' textAlign='center' >
          {TITLE_BY_STEP?.[step]}
        </Typography>
        <WelcomeTitle step={step} completeName={userData?.completeName} />
      </div>
      <div className="NewFoodContainerSteps">
        <SwitcherStepsScreen step={step}
          userData={userData}
          foodTime={foodTime}
          onChangeFoodTime={onChangeFoodTime}
          add={add}
          remove={remove}
          plannData={plannData}
          dailyData={dailyData}
          currentFood={currentFood}
        />
      </div>
      <div className="NewFoodFooter">
        <ButtonGroup className="actionButtons" size="large" aria-label="large button group">
          {step > 1
            ?
            <IconButton onClick={PreviousStep}>
              <ArrowBack />
            </IconButton>
            :
            <div style={{width: '40px'}} />
            }
          <Typography className="AboutStep">
            Paso { step === END_STEP ? 'final' :  `${step} de ${END_STEP}` }
          </Typography>
          {step < END_STEP && 
            <IconButton onClick={NextStep}>
              <ArrowNext />
            </IconButton>}
          {step === END_STEP  && 
            <IconButton onClick={() => _addNewFood(currentFood)}>
              <AddCircle />
            </IconButton>}
        </ButtonGroup>
      </div>
    </div>
  );
}

export default NewFood