import React, { useState } from 'react';
import { ScheduleComponent, Inject, Week, ViewsDirective, ViewDirective } 
   from '@syncfusion/ej2-react-schedule';
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-calendars/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-lists/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-splitbuttons/styles/material.css";
import "@syncfusion/ej2-react-schedule/styles/material.css";

const ViewSchedule = ({ match }) => {

  const [events, setEvents] = useState([
  {
    Id: 1,
    Subject: 'Meeting - 1',
    StartTime: new Date(2020, 10, 19, 10, 0),
    EndTime: new Date(2020, 10, 19, 12, 30),
    IsAllDay: false,
  },
]);


const onActionBegin = args => {
   console.log(args);
}

return (
  <div className='container'>
    <ScheduleComponent
      height='750px'
      showWeekNumber={true}
      firstDayOfWeek={1}
      eventSettings={{ dataSource: events}}
      actionBegin={onActionBegin}>
      <ViewsDirective>
         <ViewDirective option='Week'></ViewDirective>
      </ViewsDirective>
      <Inject services={[Week]} />
    </ScheduleComponent>
  </div>
);
}

export default ViewSchedule;
