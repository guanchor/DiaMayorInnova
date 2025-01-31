import React from 'react';
import './ModalConfirmDelete.css';

const ModalConfirmDelete = ({ isOpen, user, onDelete, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modalConfirmDelete-overlay">
      <div className="modalConfirmDelete-content">
        <h2>¿Estás seguro de que deseas eliminar al usuario: {user.name}?</h2>
        <p>Esta acción no se puede deshacer.</p>
        <div className="modalConfirmDelete-buttons">
          <button className="btn-cancel" onClick={onClose}>Cancelar</button>
          <button className="btn-confirm" onClick={() => onDelete(user.id)}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmDelete;