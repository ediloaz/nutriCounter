import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";

import data from "../../constants/caloriesItems";

import "./caloriesItem.css";

const CaloriesItem = ({ key }) => {
  return null

  return (
    <Grid container spacing={2} className="CaloriesItem">
      <Grid xs={6}>
        <Autocomplete
          id={`calories-item-label-${key}`}
          freeSolo
          options={data.map((option) => option.label)}
          renderInput={(params) => <TextField {...params} label="Nombre" />}
        />
      </Grid>
      <Grid xs={6}>
        <TextField
          label="Cantidad"
          id={`calories-item-quantity-${key}`}
          fullWidth
          InputProps={{
            endAdornment: <InputAdornment position="end">kCal</InputAdornment>,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default CaloriesItem;
