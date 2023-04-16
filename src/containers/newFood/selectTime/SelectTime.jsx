import { useEffect, useState } from 'react'

import { Button, ButtonGroup, IconButton } from '@mui/material';
import { RemoveCircleOutline as Remove, AddCircleOutline as Add } from '@mui/icons-material';

import USERS from "../../constants/users"
import { CATEGORIES } from '../../constants/categories';
import { EMPTY_DAILY } from "../../constants/daily";
import { FOOD_TIMES } from "../../constants/foodTimes";

import './selectTime.css'

const SelectTime = ({
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

  return (
    <div className="NewFood">
      <span className='user'>{USERS?.[user]?.completeName}</span>
      <div className="moreOptions">
        <ButtonGroup variant="text" aria-label="text button group">
          {Object.values(FOOD_TIMES).map(({ id, name }) => (
            <Button
              key={id}
              className={`foodTimeButton ${id === foodTime ? 'selected' : ''}`}
              onClick={() => onChangeFoodTime(id)}
            >
              {name}
            </Button>
          ))}
        </ButtonGroup>  
      </div>
      <div className="categories">
        {CATEGORIES.map((categorie) => 
          // <Categorie 
          // add={add} 
          // allowed={plannData?.[categorie?.id] - dailyData?.[categorie?.id]}
          // remove={remove} 
          // id={categorie?.id} 
          // key={categorie?.id} 
          // name={categorie?.name}
          // currentFood={currentFood}
          // />
          )}
      </div>
      <div className="actions">
      <ButtonGroup className="actionButtons" size="large" aria-label="large button group">
        <Button className="cancelButton" onClick={() => changeScreen('main')}>Atrás</Button>
        <Button className="addButton" onClick={() => _addNewFood(currentFood)}>Agregar</Button>
      </ButtonGroup>
      </div>
    </div>
  );
}

export default SelectTime