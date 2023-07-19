import { IconButton } from '@mui/material'
import { ArrowBackIosNew } from '@mui/icons-material'

import './caloriesItem.css'

const CaloriesItem = ({ changeScreen, screen, disabled }) => {
    return (
        <div className='CaloriesItem'>
            <IconButton onClick={() => changeScreen(screen)} component="label" disabled={disabled}>
                <ArrowBackIosNew  />
            </IconButton>
        </div>
    )
}

export default CaloriesItem