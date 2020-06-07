import React from 'react';
import { useHistory } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';

import './styles.css';

const SuccessModal = () => {
  const history = useHistory();

  return (
    <div id="modal-success">
      <FiCheckCircle />
      <strong>Cadastro Concluído</strong>
      <button onClick={() => history.push('/')} type="button">Voltar para Home</button>
    </div>
  )
}

export default SuccessModal;