import { useEffect, useState } from "react"
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

import { GREETINGS } from '../../constants/greetings'
import { getBottomBackground } from '../../helpers/images'

import "./topHome.css"

function _capitalizeFirstLetter(string) {
  return string?.charAt(0).toUpperCase() + string?.slice(1) || "";
}

const TopHome = ({ user }) => {
  const bottomBG = getBottomBackground()

  return (
    <div
      className={`TopHomeContainer`}
    >
      <div
        className={`TopContainer`}
        style={{ background: bottomBG?.darkColor }}
      >
        <Avatar className='Avatar' src={`${process.env.PUBLIC_URL}/assets/background/night.jpg`} />
        <Typography variant="h4" component="h4">
          Hola, {_capitalizeFirstLetter(user)}
        </Typography>
        <Typography variant="subtitle1" component="p">
          {GREETINGS[0]}
        </Typography>
      </div>
      <div
        className={`BottomContainer`}
        style={{ background: bottomBG?.color }}
      >
      </div>
    </div>
  )
}

export default TopHome
