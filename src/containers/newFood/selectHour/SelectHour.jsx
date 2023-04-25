import moment from 'moment'

import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';

import './selectHour.css'

const SelectHour = ({
}) => {
  return (
    <div className="SelectHourContainer">
      <StaticTimePicker
        label="asd"
        defaultValue={moment(new Date())}
        onChange={(value) => {console.log(value)}}
      />
    </div>
  );
}

export default SelectHour