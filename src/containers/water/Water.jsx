import { useEffect, useState } from 'react'

import { Button, ButtonGroup, IconButton, CircularProgress } from '@mui/material';
import { RemoveCircleOutline as Remove, AddCircleOutline as Add } from '@mui/icons-material';

import { CATEGORIES } from '../../constants/categories';
import { EMPTY_DAILY } from "../../constants/daily";

import './water.css'

const Categorie = ({ id, name, allowed, currentFood, remove, add }) => {
  const disabledRemove = false && currentFood?.[id] <= 0
  const disabledAdd = false && currentFood?.[id] >= allowed

  return (
    <div className="categorieContainer">
      <div className="nameContainer">
        <span className="name">{name}: <i>{currentFood?.[id] ?? '0'}</i></span>
        <span className="avalaible">Disponibles: {isNaN(allowed) ? '' : allowed ?? ''} </span>
      </div>
      <div className="buttons">
      <IconButton disabled={disabledRemove} aria-label="delete" size="large">
        <Remove className="remove" onClick={ () => remove(id) } />
      </IconButton>
      <IconButton disabled={disabledAdd} aria-label="add" size="large">
        <Add onClick={ () => add(id) }  disabled={disabledAdd}/>
      </IconButton>
      </div>
    </div>
  )
}

const Water = ({
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

  const add = (id) => setCurrentFood({...currentFood, [id]: (currentFood?.[id] || 0) + 1})
  const remove = (id) => setCurrentFood({...currentFood, [id]: (currentFood?.[id] || 0) - 1})

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

    addNewFood({ daily: newFood, current: currentFood, history: dailyData?.history || [] })
    changeScreen('main')
  }
  
  return (
    <div className="Water">
      <div className="categories">
        <CircularProgress variant="determinate" value={75} />
      </div>
      <div className="actions">
      <ButtonGroup className="actionButtons" size="large" aria-label="large button group">
        <Button className="cancelButton" onClick={() => changeScreen('main')}>Atrás</Button>
        <Button className="addButton" onClick={() => changeScreen('waterHistory')}>Historial</Button>
      </ButtonGroup>
      </div>
    </div>
  );
}

export default Water