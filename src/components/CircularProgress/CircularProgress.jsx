import { useEffect, useState } from 'react';
import { CircularProgress as CP } from '@mui/material';

import './circularProgress.css'

const CircularProgress = (props) => {
    const { 
        min = 0,
        max = 2000,
        value = 80,
        topText = 'parametro',
        bottomText = 'parametro',
        className,
     } = props

     const [variant, setVariant] = useState('determinate')
     

     useEffect(() => {
        setTimeout(() => {
            setVariant('determinate')
        }, 300)
     },)

    return (
        <div className={`CircularProgress ${className}`} style={{ minWidth: 200 + 50, minHeight: 200 + 50 }} >
            <CP className='svg' size={200} variant={variant} value={value} />
            <div className='content'>
                <span className='topText'>{topText}</span>
                <span className='bottomText'>{bottomText}</span>
            </div>
        </div>
    )
}

export default CircularProgress