import { useEffect, useState } from 'react'

import Firebase from './firebase'

import Main from './containers/main/Main'
import Water from './containers/water/Water'
import NewFood from './containers/newFood/NewFood'
import Summary from './containers/summary/Summary'
import History from './containers/history/History'
import ChangeUser from './containers/changeUser/ChangeUser'

import { createDailyIfNotExists, addNewFood } from './helpers/firebase'
import { getNameCurrentDaily } from './helpers/daily'

import './App.css';

const DEFAULT_USER = 'eddie'

function App() {
  const { db, getUsers, getDaily, getPlanns } = Firebase()

  const [screen, setScreen] = useState('main')
  const [user, setUser] = useState()
  const [plann, setPlann] = useState()
  const [daily, setDaily] = useState()
  
  const changeScreen = (newScreenName) => setScreen(newScreenName)

  const changeUser = (newUser, lastPlann) => {
    const dailyName = getNameCurrentDaily(newUser)
    setUser(newUser)
    setDaily(dailyName)
    window.localStorage.setItem('user', newUser)

    createDailyIfNotExists(db, getDaily, dailyName)
    
    // eslint-disable-next-line no-console
    console.log('	🎮 lastPlann', lastPlann)
    
    if (lastPlann) setPlann(lastPlann)
    else {
      const user = getUsers(newUser)
      user.then((data) => {
        setPlann(data?.lastPlann)
      })
    }
  }

  const _addNewFood = (food) => addNewFood(db, food, daily)

  useEffect(() => {
    const user = window.localStorage.getItem('user') || DEFAULT_USER

    window.localStorage.setItem('user', user)
    
    changeUser(user || DEFAULT_USER)
  }, [])

  const props = {
    db,
    user,
    daily,
    plann,
    screen,

    // functions
    addNewFood: _addNewFood,
    changeUser,
    changeScreen,

    // firebase fuctions
    getUsers,
    getDaily,
    getPlanns,
  }

  if (screen === 'newFood') return <NewFood {...props} />
  else if (screen === 'summary') return <Summary {...props} />
  else if (screen === 'changeUser') return <ChangeUser {...props} />
  else if (screen === 'history') return <History {...props} />
  else if (screen === 'water') return <Water {...props} />
  return <Main {...props} />
}

export default App;
