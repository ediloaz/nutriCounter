import { useEffect, useState } from 'react'

import { Button, ButtonGroup } from '@mui/material'

import { getCategoryNameById } from '../../helpers/categories'
import { FOOD_TIMES } from "../../constants/foodTimes";

import './history.css'

const Item = ({ hour, foodTime, categories }) => {
  return (
    <div className="itemContainer">
      <span className="hour">{hour}{foodTime ? `: ${FOOD_TIMES?.[foodTime]?.name ?? 'Desconocido'}` : ''}</span>
      <div className="categories">
        {Object.keys(categories).map((category) =>
          Boolean(categories?.[category]) && <span className="category">{getCategoryNameById(category)}: {categories?.[category]}</span>
        )}
      </div>
    </div>
  )
}

const History = ({
  plann,
  daily,
  getDaily,
  getPlanns,
  changeScreen,
}) => {
  const [dailyData, setDailyData] = useState({})

  useEffect(() => {
    const dailyQuery = getDaily(daily)
    dailyQuery.then((data) => {
      console.log(`Daily actual de ${daily}:`, data)
      setDailyData(data)
    })
  }, [plann, daily, getPlanns, getDaily])

  console.log('dailyData', dailyData)

  return (
    <div className="History">
      <span className='title'>Historial</span>
      <div className="list">
        {dailyData?.history?.map((item) => 
          <Item
            key={item?.hour}
            hour={item?.hour}
            foodTime={item?.foodTime}
            categories={{
              protein: item?.protein,
              carb: item?.carb,
              dairy: item?.dairy,
              fat: item?.fat,
              fruit: item?.fruit,
              vegetable: item?.vegetable,
            }}
          />
          )}
      </div>
      <div className="actions">
      <ButtonGroup className="actionButtons" size="large" aria-label="large button group">
        <Button className="backButton" onClick={() => changeScreen('summary')}>Atrás</Button>
      </ButtonGroup>
      </div>
    </div>
  );
}

export default History