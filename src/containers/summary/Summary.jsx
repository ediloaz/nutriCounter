import { useEffect, useState } from 'react'

import { Button, ButtonGroup, LinearProgress } from '@mui/material';

import { CATEGORIES } from '../../constants/categories';

import './summary.css'

const Categorie = ({ name, planned, currentDaily }) => {
  const allowed = planned - currentDaily
  return (
    <div className="categorieContainer">
      <span>{name}</span>
      <span className="avalaible">Disponible {allowed} de {planned}</span>
      <LinearProgress className="LinearProgress" variant="determinate" value={(allowed * 100) / planned} />
    </div>
  )
}

const Summary = ({
  plann,
  daily,
  getDaily,
  getPlanns,
  changeScreen,
}) => {
  const [plannData, setPlannData] = useState({})
  const [dailyData, setDailyData] = useState({})

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
  }, [plann, daily, getPlanns, getDaily])

  return (
    <div className="Summary">
      <div className="categories">
        {CATEGORIES.map((categorie) => 
          <Categorie 
          id={categorie?.id} 
          key={categorie?.id} 
          name={categorie?.name}
          planned={plannData?.[categorie?.id]}
          currentDaily={dailyData?.[categorie?.id]}
          />
          )}
      </div>
      <div className="actions">
      <ButtonGroup className="actionButtons" size="large" aria-label="large button group">
        <Button className="backButton" onClick={() => changeScreen('main')}>Atrás</Button>
      </ButtonGroup>
      </div>
    </div>
  );
}

export default Summary