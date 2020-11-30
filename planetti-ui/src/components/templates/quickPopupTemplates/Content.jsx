import React from 'react';


const Content = ({
  props,
  dateTimeDetails,
  fields
}) => {

  const { elementType } = props;

  return (
    elementType === 'cell' ?
      <div className="e-cell-content e-template">
        <form id="quickPopupForm" className="e-schedule-form" noValidate>
          {fields.map(field =>
            <div>
              <input
                className="e-subject e-field e-input"
                type={field.type}
                name={field.name}
                placeholder={field.label}
                style={{ width: '100%' }} />
            </div>
          )}
        </form>
        <div className="e-date-time">
          <div className="e-date-time-icon e-icons"></div>
          <div className="e-date-time-details e-text-ellipsis">
            {dateTimeDetails}
          </div>
        </div>
      </div>
      :
      <>
        {fields.map(field => {
          const data = props[field.name];

          return (
            <div key={field.id}>
              <h5 title={data}>{data}</h5>
            </div>
          );
        })}
        <div className='e-date-time'>
          <div className="e-date-time-icon e-icons"></div>
          <div className="e-date-time-details e-text-ellipsis">
            {dateTimeDetails}
          </div>
        </div>
      </>
  );
};


export default Content;