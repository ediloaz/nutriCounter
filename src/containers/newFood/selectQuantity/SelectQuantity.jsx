import { IconButton } from '@mui/material';
import { RemoveCircleOutline as Remove, AddCircleOutline as Add } from '@mui/icons-material';

import { CATEGORIES } from '../../../constants/categories';

import './selectQuantity.css'

const Categorie = ({ id, name, allowed, currentFood, remove, add }) => {
  const disabledRemove = false && currentFood?.[id] <= 0
  const disabledAdd = false && currentFood?.[id] >= allowed
  const currentQuantity = currentFood?.[id] ?? '0'

  return (
    <div className="categorieContainer">
      <div className="nameContainer">
        <span className="name">{name}: <i>{currentQuantity}</i></span>
        <span className="avalaible">Disponibles: {isNaN(allowed) ? '' : allowed ?? ''} </span>
      </div>
      <div className="buttons">
      <IconButton disabled={disabledRemove} aria-label="delete" size="large">
        <Remove className="remove" onClick={ () => remove(id) } fontSize='large' />
      </IconButton>
      <IconButton disabled={disabledAdd} aria-label="add" size="large">
        <Add onClick={ () => add(id) }  disabled={disabledAdd} fontSize='large' />
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
    </div>
  );
}

export default SelectQuantity