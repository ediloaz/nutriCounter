import { IconButton, Typography } from '@mui/material';
import { RemoveCircleOutline as Remove, AddCircleOutline as Add } from '@mui/icons-material';

import { CATEGORIES } from '../../../constants/categories';

import CaloriesItemList from "../../../components/CaloriesItemList/CaloriesItemList"

import './selectQuantity.css'

const Categorie = ({ id, name, allowed, currentFood, remove, add }) => {
  const disabledRemove = false && currentFood?.[id] <= 0
  const disabledAdd = false && currentFood?.[id] >= allowed
  const currentQuantity = currentFood?.[id] ?? '0'
  const isEmpty = currentQuantity === 0

  return (
    <div className={`categorieContainer ${isEmpty ? 'empty' : ''}`}>
      <div className="nameContainer">
        <span className="name">{name}: <i>{currentQuantity}</i></span>
        <span className="avalaible">Disponibles: {isNaN(allowed) ? '' : allowed ?? ''} </span>
      </div>
      <div className="buttons">
        {!isEmpty && 
        <IconButton disabled={disabledRemove} aria-label="delete" size="medium">
          <Remove className="remove" onClick={ () => remove(id) } fontSize='medium' />
        </IconButton>
        }
      <IconButton disabled={disabledAdd} aria-label="add" size="medium">
        <Add onClick={ () => add(id) }  disabled={disabledAdd} fontSize='medium' />
      </IconButton>
      </div>
    </div>
  )
}

const SelectQuantity = ({
  add,
  remove,
  plannData,
  dailyData,
  currentFood
}) => {

  return (
    <div className="SelectQuantityContainer">
      <Typography variant="h5" className="title">
        Método ADA:
      </Typography>
      {CATEGORIES.map((categorie) => 
        <Categorie 
          add={add} 
          allowed={plannData?.[categorie?.id] - dailyData?.[categorie?.id]}
          remove={remove} 
          id={categorie?.id} 
          key={categorie?.id} 
          name={categorie?.name}
          currentFood={currentFood}
        />
      )}
      <br />
      <Typography variant="h5" className="title">
        Método kCal
      </Typography>
      <CaloriesItemList add={add} />
      <br />
    </div>
  );
}

export default SelectQuantity