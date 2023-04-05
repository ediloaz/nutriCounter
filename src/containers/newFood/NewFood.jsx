import { useEffect, useState } from 'react'

import { Button, ButtonGroup } from '@mui/material';
import { RemoveCircleOutline as Remove, AddCircleOutline as Add } from '@mui/icons-material';

import { CATEGORIES } from '../../constants/categories';

import './newFood.css'

const Categorie = ({ id, name, allowed, currentFood, remove, add }) => {
  return (
    <div className="categorieContainer">
      <span>{name}: <i>{currentFood?.[id] ?? '0'}</i></span>
      <span className="avalaible">Disponibles: {isNaN(allowed) ? '' : allowed ?? ''} </span>
      <div className="buttons">
        <Remove onClick={ () => remove(id) } />
        <Add onClick={ () => add(id) } />
      </div>
    </div>
  )
}

const NewFood = ({
  plann,
  daily,
  getDaily,
  getPlanns,
  addNewFood,
  changeScreen,
}) => {
  const [plannData, setPlannData] = useState({})
  const [dailyData, setDailyData] = useState({})
  const [currentFood, setCurrentFood] = useState({})

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

    
    // eslint-disable-next-line no-console
    console.log('	🎮 newFood', newFood)
    

    addNewFood(newFood)
    changeScreen('main')
  }
  
  return (
    <div className="NewFood">
      <div className="categories">
        {CATEGORIES.map((categorie) => 
          <Categorie 
          add={add} 
          allowed={plannData?.[categorie?.id] - dailyData?.[categorie?.id]}
          remove={remove} 
          id={categorie?.id} 
          key={categorie?.id} 
          name={categorie?.name}
          currentFood={currentFood}
          />
          )}
      </div>
      <div className="actions">
      <ButtonGroup className="actionButtons" size="large" aria-label="large button group">
        <Button className="cancelButton" onClick={() => changeScreen('main')}>Cancelar</Button>
        <Button className="addButton" onClick={() => _addNewFood(currentFood)}>Agregar</Button>
      </ButtonGroup>
      </div>
    </div>
  );
}

export default NewFood