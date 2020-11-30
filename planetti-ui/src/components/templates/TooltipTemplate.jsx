import React from 'react';

const TooltipTemplate = ({
  props, 
  fields, 
  startDate, 
  startTime, 
  endTime}) => {

  return (
    <div className="tooltip-wrap">
      <div className="content-area">
        <div className="name">{props[fields[0].name]}</div>
      </div>
      <div className="date">{startDate}</div>
      <div className="time">{`${startTime} - ${endTime}`}</div>
    </div>
  );

};

export default TooltipTemplate;