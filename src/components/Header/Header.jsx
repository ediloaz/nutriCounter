import Typography from "@mui/material/Typography"

import BackButton from "../BackButton/BackButton";

import "./header.css"

const Header = ({ title, changeScreen }) => {
  return (
    <div className="HeaderRounded">
      <BackButton
        changeScreen={changeScreen}
        screen="main"
      />
      <Typography className="title" textAlign="center">
        Finanzas en casa
      </Typography>
    </div>
  )
}

export default Header
