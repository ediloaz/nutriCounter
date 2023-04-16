import { IconButton } from '@mui/material'
import { ArrowBackIosNew } from '@mui/icons-material'

import './backButton.css'

const BackButton = ({ changeScreen, screen }) => {
    return (
        <div className='BackButton'>
            <IconButton onClick={() => changeScreen(screen)} component="label">
                <ArrowBackIosNew  />
            </IconButton>
        </div>
    )
}

export default BackButton