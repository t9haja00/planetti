import React from 'react';

const EventTemplate = ({ props, fields, startTime, endTime }) => {

  return (
    <div className="template-wrap">
      <div>
        <div title={props[fields[0].name]}>{props[fields[0].name]}</div>
      </div>
      <div className="time">
        {`${startTime} - ${endTime}`}</div>
    </div>
  );
};

export default EventTemplate;