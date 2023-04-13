import { useEffect, useState } from 'react'

import { Typography, Button, ButtonGroup } from '@mui/material'
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineOppositeContent, TimelineDot } from '@mui/lab'
import { FreeBreakfast, RiceBowl, DinnerDining, BakeryDining, Fastfood, LaptopMac, Hotel, Repeat } from '@mui/icons-material';

import { getCategoryNameById } from '../../helpers/categories'
import { FOOD_TIMES } from "../../constants/foodTimes";

import './history.css'

const FLAT_COLORS = ['#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50', '#f39c12', '#d35400', '#7f8c8d']


const HistoryTimelineItem = ({ flatColor, nextFlatColor, odd, hour, foodTime, categories, isFinal }) => {
  const foodTimeId = FOOD_TIMES?.[foodTime]?.id
  const topLineColor = flatColor
  const bottomLineColor = nextFlatColor

  return (
    <TimelineItem className="itemContainer">
        <TimelineOppositeContent sx={{ py: '12px', px: 2, alignSelf: 'center' }}>
          <Typography variant="h6" component="span">
            {foodTime ? `${FOOD_TIMES?.[foodTime]?.name ?? 'Desconocido'}` : ''}
          </Typography>
          <Typography className="hour">{hour}</Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: topLineColor }} />
          <TimelineDot sx={{ bgcolor: topLineColor }}>
            { foodTimeId === FOOD_TIMES?.breakfast?.id && <FreeBreakfast /> }
            { foodTimeId === FOOD_TIMES?.lunch?.id && <RiceBowl /> }
            { foodTimeId === FOOD_TIMES?.dinner?.id && <DinnerDining /> }
            { foodTimeId === FOOD_TIMES?.snack?.id && <BakeryDining /> }
            { foodTimeId === FOOD_TIMES?.other?.id && <Fastfood /> }
          </TimelineDot >
          <TimelineConnector sx={{ bgcolor: isFinal ? 'transparent' : bottomLineColor }} />
        </TimelineSeparator>
        <TimelineContent
        sx={{ m: 'auto 0' }}
        variant="body2"
        color="text.secondary"
        >
          <div className={`categories ${odd ? 'odd' : ''}`}>
            {Object.keys(categories).map((category) =>
              Boolean(categories?.[category]) && <span className="category">{getCategoryNameById(category)}: {categories?.[category]}</span>
            )}
          </div>
        </TimelineContent>
      </TimelineItem>
  )
}

const History = ({
  plann,
  daily,
  getDaily,
  getPlanns,
  changeScreen,
}) => {
  const [dailyData, setDailyData] = useState()

  var nextFlatColor

  useEffect(() => {
    if (!dailyData) {
      const dailyQuery = getDaily(daily)
      dailyQuery.then((data) => {
        console.log(`Daily actual de ${daily}:`, data)
        JSON.stringify(data) !== JSON.stringify(dailyData) && setDailyData(data)
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dailyData, plann, daily, getPlanns, getDaily])

  return (
    <div className="History">
      <span className='title'>Historial</span>
      <Typography component='span' variant='body1'>
        Recuerda que sin importar que <b>siempre sos suficiente</b> ❤️
      </Typography>
      <Timeline position="alternate" className="list">
        {dailyData?.history?.map((item, i) => {
          const flatColor = nextFlatColor || FLAT_COLORS[Math.floor(Math.random()*FLAT_COLORS.length)]
          nextFlatColor = FLAT_COLORS[Math.floor(Math.random()*FLAT_COLORS.length)]
          
          return (
            <HistoryTimelineItem
              key={item?.hour}
              hour={item?.hour}
              foodTime={item?.foodTime}
              odd={i%2}
              categories={{
                protein: item?.protein,
                carb: item?.carb,
                dairy: item?.dairy,
                fat: item?.fat,
                fruit: item?.fruit,
                vegetable: item?.vegetable,
              }}
              flatColor={flatColor}
              nextFlatColor={nextFlatColor}
              isFinal={i === dailyData?.history?.length - 1}
            />
          )
        }
          )}
        </Timeline>
      <div className="actions">
      <ButtonGroup className="actionButtons" size="large" aria-label="large button group">
        <Button className="backButton" onClick={() => changeScreen('summary')}>Atrás</Button>
      </ButtonGroup>
      </div>
    </div>
  );
}

export default History