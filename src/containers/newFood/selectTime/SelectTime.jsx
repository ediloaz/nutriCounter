import Grid from '@mui/material/Unstable_Grid2'; 
import { Paper, Button, ButtonGroup } from '@mui/material';

import { FOOD_TIMES } from "../../../constants/foodTimes";

import './selectTime.css'

const SelectTime = ({
  foodTime,
  onChangeFoodTime,
}) => {
  return (
    <div className="SelectTimeContainer">
      <Grid container spacing={2} className='cardActionContainer' >
        {Object.values(FOOD_TIMES).map(({ id, name, icon }) => (
          <Grid xs={6}>
          <Paper
            key={id}
            className={`foodTimeButton CardAction ${id === foodTime ? 'selected' : ''}`}
            elevation={0}
            onClick={() => onChangeFoodTime(id)}
          >
            {icon()}
            {name}
          </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default SelectTime