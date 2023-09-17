import { useEffect, useState } from "react";
import moment from "moment";
import { sumBy, orderBy, isEmpty } from "lodash";

import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import { Typography } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputAdornment from "@mui/material/InputAdornment";

import { CATEGORIES } from "../../constants/categories";
import Header from "../../components/Header/Header";

import { getCategoryNameById, calcCategoryCalc } from "../../helpers/categories";
import { FOOD_TIMES } from "../../constants/foodTimes";

import "./houseFinances.css";

const FormToAdd = ({ onAdd = () => {alert()}}) => {
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const [added, setAdded] = useState(null)

  const _onAdd = () => {
    onAdd({ category, price, description })

    setPrice(null)
    setCategory(null)
    setDescription(null)
    setAdded(true)

    setTimeout(() => {
      setAdded(false)
    }, 1000)
  }

  if (added) return null

  return (
    <Paper className="FormToAddContainer"  sx={{ minWidth: '100%', mb: 2 }}>
      <Typography className="subTitle" textAlign="center">
        Agregar
      </Typography>
      <FormControl fullWidth>
      <Grid container spacing={2} className="CaloriesItem">
        <Grid xs={12}>
        <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Categoría"
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value={10}>11</MenuItem>
          <MenuItem value={20}>22</MenuItem>
          <MenuItem value={30}>33</MenuItem>
        </Select>
        </Grid>
      <Grid xs={12}>
        <TextField
          value={price}
          label="Costo/Precio"
          id={'house-finances-form-add-cost'}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="end">₡</InputAdornment>,
          }}
          onChange={(event) => setPrice(event.target?.value?.replace(/[^0-9]/g, ""))}
          type="text"
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
          }}
        />
        </Grid>
      <Grid xs={12}>
        <TextField
          value={description}
          label="Alguna descripción"
          id={'house-finances-form-add-description'}
          fullWidth
          onChange={(event) => setDescription(event.target?.value)}
          type="text"
        />
        </Grid>
        <Grid xs={12}>
          <IconButton disabled={!(description && price)} className="AddButton" aria-label="add" onClick={_onAdd}>
            <AddIcon /> Agregar
          </IconButton>
        </Grid>
        </Grid>
      </FormControl>
    </Paper>
  )
}

const History = () => {
  /* es
  se deben agrupar por días

  Lunes 11 de sept:
  
  Categoría: X
  Precio: 200crc
  Descripción: asdasd

  Categoría: X
  Precio: 200crc
  Descripción: asdasd

  Martes 12 de sept:

  Categoría: X
  Precio: 200crc
  Descripción: asdasd

  */
  return (
    <Paper className=""  sx={{ minWidth: '100%', mb: 2 }}>
      <Typography className="subTitle" textAlign="center">
        Historial
      </Typography>
    </Paper>
  )
}

const HouseFinances = ({ plann, daily, getDaily, getPlanns, changeScreen }) => {
  const [dailyHistory, setDailyHistory] = useState();


  useEffect(() => {
    if (!dailyHistory) {
      const dailyQuery = getDaily(daily);
      dailyQuery.then((data) => {
        console.log(`Daily actual de ${daily}:`, data);
        const history = data?.history || [];
        if (JSON.stringify(history) !== JSON.stringify(dailyHistory)) {
          // Re order by time
          const sortedHistory = orderBy(history, (obj) =>
            obj.hour
          );

          setDailyHistory(sortedHistory);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dailyHistory, plann, daily, getPlanns, getDaily]);

  const isEmptyHistory = isEmpty(dailyHistory);

  return (
    <div className="HouseFinances">
      <Header title="Finanzas de casa" changeScreen={changeScreen} />
      <div className="Body">
        <FormToAdd />
        <History />
      </div>
    </div>
  );
};

export default HouseFinances;
