import { Button, ButtonGroup } from '@mui/material';
import { RemoveCircleOutline as Remove, AddCircleOutline as Add } from '@mui/icons-material';

import './newFood.css'

const Categorie = ({ id, name, remove, add }) => {
  return (
    <div className="categorieContainer">
      <span>{name}</span>
      <div className="buttons">
        <Remove onClick={ () => remove(id) } />
        <Add onClick={ () => add(id) } />
      </div>
    </div>
  )
}

const CATEGORIES = [
  { 
    id: 'protein',
    name: 'Proteínas',
  },
  { 
    id: 'carbs',
    name: 'Harinas',
  },
  { 
    id: 'dairy',
    name: 'Lácteos',
  },
  { 
    id: 'fats',
    name: 'Grasas',
  },
  { 
    id: 'fruits',
    name: 'Frutas',
  },
  { 
    id: 'vegetables',
    name: 'Vegetales',
  },
  

]

const NewFood = ({
  add,
  screen,
  remove,
  addNewFood,
  changeScreen,
}) => {
  console.log(`${screen} screen`)

  return (
    <div className="NewFood">
      <div className="categories">
        {CATEGORIES.map((categorie) => <Categorie id={categorie?.id} name={categorie?.name} remove={remove} add={add} />)}
      </div>
      <div className="actions">
      <ButtonGroup className="actionButtons" size="large" aria-label="large button group">
        <Button className="cancelButton" onClick={() => changeScreen('main')}>Cancelar</Button>
        <Button className="addButton" onClick={() => addNewFood({})}>Agregar</Button>
      </ButtonGroup>
      </div>
    </div>
  );
}

export default NewFood