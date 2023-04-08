import { Button } from '@mui/material';
import { SupervisedUserCircle } from '@mui/icons-material';

import './main.css'

function Main({
  user,
  changeScreen,
}) {
  return (
    <div className="Main">
      <Button className="bigButton new" onClick={() => changeScreen('newFood')}>
        <span className="label">🥣 + Comida</span>
      </Button>
      <Button className="bigButton new" onClick={() => alert("Pronto, mi amoris. No comas ansias!")}>
        <span className="label">💦 + Agüita</span>
      </Button>
      <Button className="bigButton summary" onClick={() => changeScreen('summary')}>
        <span className="label">📅 Hoy</span>
      </Button>
      <div className="bottomButton changeUser" onClick={() => changeScreen('changeUser')}>
        <Button className="label"><SupervisedUserCircle />Cambiar de Usuario ({user})</Button>
      </div>
    </div>
  );
}

export default Main