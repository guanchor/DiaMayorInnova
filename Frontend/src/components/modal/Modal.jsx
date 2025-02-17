import { useRef } from "react";
import "./Modal.css";

const Modal = ({ children, btnText = "Abrir Modal", modalTitle = "Modal", needOpen = true }) => {
  const modalRef = useRef(null);

  const openModal = (e) => {
    e.preventDefault();
    modalRef.current.showModal();
  };

  const closeModal = (e) => {
    e.preventDefault();
    modalRef.current.close();
  };

  return (
    <>
      <button className="btn light" onClick={needOpen ? openModal : (e) => e.preventDefault()}>
        {btnText}
      </button>

      <dialog ref={modalRef} className="defaultModal">
        <header className="modal__header">
          <h2>{modalTitle}</h2>
          <button className="btn light" onClick={closeModal}>X</button>
        </header>
        <div className="modal__content">
          {children}
        </div>
      </dialog>
    </>
  )
}

export default Modal
