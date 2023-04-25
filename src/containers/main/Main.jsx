import Grid from '@mui/material/Unstable_Grid2'; 
import { Button, Typography, Paper } from '@mui/material'
import { SupervisedUserCircle } from '@mui/icons-material'

// import CircularProgress from '../../components/CircularProgress/CircularProgress';
import { getBottomBackground } from '../../helpers/images'
import { getRandomMotivationalPhrase } from '../../helpers/phrases'

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

function Main({
  user,
  changeScreen,
}) {
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