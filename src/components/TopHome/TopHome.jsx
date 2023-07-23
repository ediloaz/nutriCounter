import { useEffect, useState } from "react"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"

import USERS from "../../constants/users"
import { getRandomGreeting } from "../../helpers/greetings"
import { getBottomBackground } from "../../helpers/images"

import "./topHome.css"

const CAT_PROFILE_PICTURE = 'cat.png'

function _capitalizeFirstLetter(string) {
  return string?.charAt(0).toUpperCase() + string?.slice(1) || ""
}

const TopHome = ({ user }) => {
  const bottomBG = getBottomBackground()
  const userData = USERS?.[user]

  return (
    <div className={`TopHomeContainer`}>
      <div
        className={`TopContainer`}
        style={{ background: bottomBG?.darkColor }}
      >
        <Avatar
          className="Avatar"
          src={`${process.env.PUBLIC_URL}/assets/profiles/${userData?.profilePicture || CAT_PROFILE_PICTURE}`}
        />
        <Typography variant="h4" component="h4">
          Hola, {_capitalizeFirstLetter(user)}
        </Typography>
        <Typography variant="subtitle1" component="p">
          {getRandomGreeting()}
        </Typography>
      </div>
      <div
        className={`BottomContainer`}
        style={{ background: bottomBG?.color }}
      ></div>
    </div>
  )
}

export default TopHome
