import { styled } from "@mui/material/styles"
import { Stepper, Step, StepLabel } from "@mui/material"
import { Settings, GroupAdd, VideoLabel } from "@mui/icons-material"
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector"

import { hasNonZeroValue } from "../../../helpers/utils"

import "./headerStepper.css"

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 15,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(95deg, rgb(0, 128, 0) 0%, rgb(34, 139, 34) 50%, rgb(0, 255, 0) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(95deg, rgb(0, 128, 0) 0%, rgb(34, 139, 34) 50%, rgb(0, 255, 0) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor: theme.palette.grey[800],
    borderRadius: 1,
  },
}))

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.grey[700],
  zIndex: 1,
  color: "#fff",
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient(136deg, rgb(34, 139, 34) 0%, rgb(0, 128, 0) 50%, rgb(0, 255, 0) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient(136deg, rgb(34, 139, 34) 0%, rgb(0, 128, 0) 50%, rgb(0, 255, 0) 100%)",
  }),
}))

const HeaderStepper = ({ handleScroll, steps, currentFood, foodHour, foodTime }) => {
  
  let stepCompleted = null
  if (foodTime) {
    stepCompleted = 0
    if (hasNonZeroValue(currentFood)) {
      stepCompleted = 1
      if (foodHour) {
        stepCompleted = 2
      }
    }
  }

  const ColorlibStepIcon = (props) => {
    const { active, completed, className } = props

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={`Icon ${className}`}
      >
        {steps[String(props.icon)]?.Icon()}
      </ColorlibStepIconRoot>
    )
  }

  return (
    <Stepper
      alternativeLabel
      activeStep={stepCompleted}
      connector={<ColorlibConnector />}
      className="HeaderStepper"
    >
      {Object.values(steps).map(({ step, label, Icon }) => (
        <Step key={label} className="step" onClick={()=>handleScroll(`dividerStep${step}`)}>
          <StepLabel Icon={Icon} StepIconComponent={ColorlibStepIcon}>
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

export default HeaderStepper
