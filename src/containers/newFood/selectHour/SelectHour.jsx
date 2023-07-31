import moment from 'moment'

import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';

import './selectHour.css'

const SelectHour = ({
  onChangeFoodHour
}) => {
  return (
    <div className="SelectHourContainer">
      <StaticTimePicker
        defaultValue={moment(new Date())}
        onChange={onChangeFoodHour}
      />
    </div>
  );
}

export default SelectHour