import { useState } from 'react'
import { filter, findIndex, cloneDeep } from 'lodash'

import Paper from '@mui/material/Paper';

import { CUSTOM_FOODS_ID } from '../../constants/categories'
import CaloriesItem from "../CaloriesItem/CaloriesItem"
import CaloriesTable from "../CaloriesTable/CaloriesTable"

import "./caloriesItemList.css"

const _addOrUpdateItem = (list, newItem) => {
  const index = findIndex(list, { name: newItem.name });

  if (index !== -1) {
    const newList = cloneDeep(list);
    newList[index] = { name: newItem.name, cal: newItem.cal };
    return newList;
  } else {
    return [...list, newItem];
  }
};

const CaloriesItemList = ({ add }) => {
  const [list, setList] = useState([])

  const onDelete = (ids) => {
    const newList = filter(list, (item) =>!ids.includes(item.name))

    setList(newList)
    add(CUSTOM_FOODS_ID, newList)
  }

  const onAdd = ({ name, cal }) => {
    const newList = _addOrUpdateItem(list, { name, cal })
    
    setList(newList)
    add(CUSTOM_FOODS_ID, newList)
  }

  return (
    <>
      <Paper className="CaloriesItemAdder" sx={{ width: '100%', mb: 2 }}>
        <CaloriesItem onAdd={onAdd} />
      </Paper>
      <CaloriesTable list={list} onDelete={onDelete} />
    </>
  )
}

export default CaloriesItemList
