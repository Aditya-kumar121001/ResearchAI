import React from 'react';

function Modal({ text, onClose, onHighlight, onSave, onDefine }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{text}</p>
        <div className="modal-buttons">
          <button onClick={onHighlight}>Highlight</button>
          <button onClick={onSave}>Save</button>
          <button onClick={onDefine}>Define</button>
        </div>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
    </div>
  );
}

export default Modal;