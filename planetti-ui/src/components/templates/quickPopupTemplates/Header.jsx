import React from 'react';

const Header = ({
  props,
  closePopup,
  editEvent,
  deleteEvent
}) => {


  return (
    <div>
      {props.elementType === 'cell' ?
        <div className="e-cell-header">
          <div className='e-header-icon-wrapper'>
            <button
              className="e-close e-btn e-flat e-round e-small e-icon-btn"
              title="Close"
              onClick={closePopup}>
              <span className="e-btn-icon e-icons e-close-icon"></span>
            </button>
          </div>
        </div> :
        <div className="e-event-header">
          <div className="e-header-icon-wrapper">
            <button
              className="e-edit e-icons e-btn e-flat e-round e-small e-icon-btn"
              title="Edit"
              onClick={() => setTimeout(() => editEvent(props), 0)}>
              <span className="e-btn-icon e-icons e-edit-icon"></span>
            </button>
            <button
              className="e-delete e-icons e-btn e-flat e-round e-small e-icon-btn"
              title="Delete"
              onClick={() => deleteEvent(props)}>
              <span className="e-btn-icon e-icons e-delete-icon"></span>
            </button>
            <button
              className="e-close e-btn e-flat e-round e-small e-icon-btn"
              title="Close"
              onClick={closePopup}>
              <span className="e-btn-icon e-icons e-close-icon"></span>
            </button>
          </div>
        </div>
      }
    </div>
  );
}

export default Header;