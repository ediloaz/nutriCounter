import { useEffect, useState } from 'react'

import { Button, ButtonGroup } from '@mui/material';
import { Face2, Face4 } from '@mui/icons-material';

import './changeUser.css'

const User = ({ id, icon, name, lastPlann, changeUser }) => {
  
  return (
    <Button className="userContainer" onClick={() => changeUser(id, lastPlann)}>
      {icon === 'Face2' && <Face2 />}
      {icon === 'Face4' && <Face4 />}
      <span>Seleccionar a {name}</span>
    </Button>
  )
}

const ChangeUser = ({
  getUsers,
  changeUser,
  changeScreen,
}) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const users = getUsers()
    
    users.then((data) => {
      console.log(`Usuarios: `, data)
      setUsers(data)
    })
  }, [getUsers])

  const _changeUser = (userId, lastPlann) => {
    changeUser(userId, lastPlann)
    changeScreen('main')
  }

  return (
    <div className="ChangeUser">
      <div className="users">
        {users.map((user) =>
          <User
          changeUser={_changeUser}
          id={user?.id} 
          key={user?.id}
          name={user?.name}
          icon={user?.icon}
          lastPlann={user?.lastPlann}
          />
          )}
      </div>
      <div className="actions">
      <ButtonGroup className="actionButtons" size="large" aria-label="large button group">
        <Button className="backButton" onClick={() => changeScreen('main')}>Atrás</Button>
      </ButtonGroup>
      </div>
    </div>
  );
}

export default ChangeUser