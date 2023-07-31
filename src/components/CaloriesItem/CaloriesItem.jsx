import { useState } from 'react'

import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import data from "../../constants/caloriesItems";

import "./caloriesItem.css";

const CaloriesItem = ({ key, onAdd }) => {
  const [name, setName] = useState(null)
  const [kCal, setKCal] = useState(null)
  const [added, setAdded] = useState(null)

  const _onAdd = () => {
    onAdd({ name, cal: kCal })
    setName(null)
    setKCal(null)
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
    }, 1000)
  }

  if (added) return null

  return (
    <Grid container spacing={2} className="CaloriesItem">
      <Grid xs={12}>
        <Autocomplete
          id={`calories-item-label-${key}`}
          freeSolo
          options={data.map((option) => option.label)}
          renderInput={(params) => <TextField {...params} label="Nombre" />}
          onInputChange={(event) => setName(event.target?.value)}
        />
      </Grid>
      <Grid xs={8}>
        <TextField
          value={kCal}
          label="Cantidad"
          id={`calories-item-quantity-${key}`}
          fullWidth
          InputProps={{
            endAdornment: <InputAdornment position="end">kCal</InputAdornment>,
          }}
          onChange={(event) => setKCal(event.target?.value?.replace(/[^0-9]/g, ""))}
          type="text"
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
        />
      </Grid>
      <Grid xs={4}>
        <IconButton disabled={!(name && kCal)} className="AddButton" aria-label="add" onClick={_onAdd}>
          <AddIcon /> Agregar
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default CaloriesItem;
