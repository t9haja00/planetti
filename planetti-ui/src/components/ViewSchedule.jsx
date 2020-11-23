import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { ScheduleComponent, Inject, Week, ViewsDirective, ViewDirective }
  from '@syncfusion/ej2-react-schedule';
import { getScheduleByUUID } from '../services/scheduleService';
import { DelayedRender } from './common/DelayedRender';
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

  const [schedule, setSchedule] = useState(null);
  const [events, setEvents] = useState([
    {
      Id: 1,
      Subject: 'Meeting - 1',
      StartTime: new Date(2020, 10, 19, 10, 0),
      EndTime: new Date(2020, 10, 19, 12, 30),
      IsAllDay: false,
    },
  ]);

  useEffect(() => {
    const getSchedule = async () => {
      const { data } =
        await getScheduleByUUID('9efa2ebd-46a2-4312-9982-13ac12ead6ed');
      setSchedule(data[0]);
    }

    getSchedule();
  }, []);


  const onActionBegin = args => {
    console.log(args);
  }


  return (
    <>
      {schedule ?
        <div className='m-5'>
          <div className='row my-4'>
            <div className='col-2'>
              <Card>
                <Card.Header>
                  {schedule.title}
                </Card.Header>
                <Card.Body>
                  {schedule.description}
                </Card.Body>
              </Card>
            </div>
            <div className='col border rounded p-1 shadow' >
              <ScheduleComponent
                height='650px'
                showWeekNumber={true}
                firstDayOfWeek={1}
                eventSettings={{ dataSource: events }}
                actionBegin={onActionBegin}>
                <ViewsDirective>
                  <ViewDirective option='Week'></ViewDirective>
                </ViewsDirective>
                <Inject services={[Week]} />
              </ScheduleComponent>
            </div>
          </div>
        </div>
        : <DelayedRender />}
    </>
  );
}

export default ViewSchedule;
