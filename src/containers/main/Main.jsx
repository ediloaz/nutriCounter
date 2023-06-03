import { useEffect, useState } from 'react'

import Grid from '@mui/material/Unstable_Grid2'; 
import { Button, Typography, Paper, Link } from '@mui/material'
import { SupervisedUserCircle, Info } from '@mui/icons-material'

// import CircularProgress from '../../components/CircularProgress/CircularProgress';
import { getBottomBackground } from '../../helpers/images'
import { getRandomMotivationalPhrase } from '../../helpers/phrases'
import { CATEGORIES_OBJECT } from '../../constants/categories';

import './main.css'

const CardAction = ({ emoji, title, onClick }) => {
  return (
    <Grid xs={6}>
      <Paper className='CardAction' elevation={0} onClick={onClick} >
        <span className='emoji'>{emoji}</span>
        <span className='title'>{title}</span>
      </Paper>
    </Grid>
  )
}

const SumCal = (currentCal) =>  {
  return parseInt(
      currentCal?.protein * CATEGORIES_OBJECT?.protein?.kcal +
      currentCal?.carb * CATEGORIES_OBJECT?.carb?.kcal +
      currentCal?.dairy * CATEGORIES_OBJECT?.dairy?.kcal +
      currentCal?.fat * CATEGORIES_OBJECT?.fat?.kcal +
      currentCal?.fruit * CATEGORIES_OBJECT?.fruit?.kcal +
      currentCal?.vegetable * CATEGORIES_OBJECT?.vegetable?.kcal
    )
}

const CaloriesSummary = ({ plannData, dailyData }) => {
  return (
    dailyData && plannData?.kcal
      ? <Typography variant='caption'>Ha consumido {SumCal(dailyData) || 0 } de {plannData?.kcal}kcal</Typography>
      : <Typography>...</Typography>
  )
}

const Main = ({
  user,
  changeScreen,
  daily,
  plann,
  getPlanns,
  getDaily,
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
  
  const bottomBG = getBottomBackground()
  const randomPhrase = getRandomMotivationalPhrase()

  const cardsContent = [
    {
      id: 'addFood',
      emoji: '🥣',
      title: 'Agregar comida',
      onClick: () => changeScreen('newFood'),
    },
    {
      id: 'todayFood',
      emoji: '📅',
      title: '¿Qué he comido?',
      onClick: () => changeScreen('summary'),
    },
    {
      id: 'addWater',
      emoji: '💦',
      title: 'Agregar agua',
      onClick: () => alert("Pronto, mi amoris. No comas ansias!"),
    },
  ]

  return (
    <div className="Main" style={{ backgroundColor: bottomBG?.color }}>
      {/* <CircularProgress
        topText="100"
        bottomText="calories"
        className="CaloriesCircularProgress"
      /> */}
      <CaloriesSummary plannData={plannData} dailyData={dailyData} />
      <Grid container spacing={2} className='cardActionContainer' >
        {cardsContent.map((card) => 
          <CardAction key={card?.id} {...card}/>
        )}
      </Grid>
      <Button
        variant='contained' 
        className={`bottomButton ${bottomBG?.id}`}
        onClick={() => changeScreen('changeUser')}
      >
        {/* PUEDO EXPANDIR EL CONTENDIDO CON UN ACCORDION, ya que su heigt es peque */}
        <SupervisedUserCircle />
        <span>Cambiar de Usuario ({user})</span>
      </Button>
      <Link variant="caption" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', zIndex:1 }} href="https://www.studocu.com/pe/document/universidad-femenina-del-sagrado-corazon/nutricion/guia-de-intercambio-ada-con-peso-en-gr-de-alimentos/15508179">
        <Info fontSize='small' /> Acerca de las porciones
      </Link>
      <Typography className="phrase">{randomPhrase}</Typography>
      <img
        className="BottomBackground"
        src={`${process.env.PUBLIC_URL}${bottomBG?.path}`}
        alt={bottomBG?.id}
      />
    </div>
  );
}

export default Main