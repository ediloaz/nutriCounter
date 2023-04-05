import { Tapas, AutoGraph, SupervisedUserCircle } from '@mui/icons-material';

import './main.css'

function Main({
  changeScreen,
}) {
  return (
    <div className="Main">
      <div className="bigButton new" onClick={() => changeScreen('newFood')}>
        <span className="label"><Tapas />Nueva comida</span>
      </div>
      <div className="bigButton summary">
        <span className="label"><AutoGraph />Resumen</span>
      </div>
      <div className="bottomButton changeUser">
        <span className="label"><SupervisedUserCircle />Cambiar de Usuario</span>
      </div>
    </div>
  );
}

export default Main