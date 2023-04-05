import { useState } from 'react'

import Main from './containers/main/Main'
import NewFood from './containers/newFood/NewFood'
import Summary from './containers/main/Main'

import './App.css';

function App() {
  const [screen, setScreen] = useState('main')

  const changeScreen = (newScreenName) => setScreen(newScreenName)

  const add = (categorieId) => console.log('add ', categorieId)
  const remove = (categorieId) => console.log('remove ', categorieId)

  const addNewFood = (food) => console.log('add new food ', food)

  const props = {
    add,
    remove,
    screen,
    setScreen,
    addNewFood,
    changeScreen,
  }

  if (screen === 'newFood') return <NewFood {...props} />
  
  else if (screen === 'summary') return <Summary {...props} />

    return (
    <Main {...props} />
  );
}

export default App;
