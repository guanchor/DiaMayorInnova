import { useState } from 'react';
import "./SettingsModal.css"

const SettingsModal = ({ onClose }) => {
  const [pswdIsOpen, setPswdIsOpen] = useState(false);

  const closeModal = () => {
    onClose();
  };

  const openPassword = () => {
    setPswdIsOpen(!pswdIsOpen);
  }

  return (
    <>
      <div className="modal__background">
        <section className="modal">
          <button onClick={closeModal} className='btn light'>X</button>
          <section className="moda-settings__wrapper">
            <h2>Configuración</h2>

            <h3>Perfil de Usuario</h3>

            <div className="user-img__container">
              <div className='user-img__img' />
              <label className='img-label__user'>Foto de Usuario
                <select name="user-img__images" id="user-img__images">
                  <option value="img1">Imagen 1</option>
                </select>
              </label>
            </div>
            <div className="user-passwd__container">
              <h3>Contraseña Usuario</h3>
              {
                pswdIsOpen && (
                  <div className="passwrd__inputs">
                    <label className='passwd__labels'>Contraseña Antigua
                      <input type="password" placeholder='123Contraseña.1' />
                    </label>
                    <label className='passwd__labels'>Contraseña Nueva
                      <input type="password" placeholder='123.contraseña.1' />
                    </label>
                    <label className='passwd__labels'>Repetir Contraseña
                      <input type="password" placeholder='123.contraseña.1' />
                    </label>
                  </div>
                )
              }
            </div>
            <button onClick={openPassword} className='btn'><i className='fi fi-rr-exclamation'></i>{pswdIsOpen ? "Guardar Contraseña" : "Modificar Contraseña"}</button>
          </section>
        </section>
      </div>
    </>
  );
};

export default SettingsModal;
