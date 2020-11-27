import React, { useState, useEffect, useRef } from 'react';
import { Card, Overlay, Tooltip } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { createElement } from '@syncfusion/ej2-base';
import { ScheduleComponent, Inject, Week, Month, ViewsDirective, ViewDirective }
  from '@syncfusion/ej2-react-schedule';
import { DataManager, UrlAdaptor, Query } from '@syncfusion/ej2-data';
import { getScheduleByUUID } from '../services/scheduleService';
import DelayedRender from './common/DelayedRender';
import EventEditor from './EventEditor';
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
import styles from '../assets/css/view-schedule.module.css';

let dataManager = null;
let dataQuery = null;
const iconsUrl = process.env.REACT_APP_API;
const eventsAPI = process.env.REACT_APP_EVENTS;

const ViewSchedule = ({ match }) => {

  const [schedule, setSchedule] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const textAreaRef = useRef(null);
  const tooltipRef = useRef(null);
  let scheduleObj = null;

  useEffect(() => {
    const getSchedule = async () => {
      const { data: scheduleData } =
        await getScheduleByUUID(match.params.uuid);

      // Syncfusion DataManager
      dataManager = new DataManager({
        url: eventsAPI,
        adaptor: new UrlAdaptor(),
      });

      dataQuery = new Query()
        .from('events')
        .addParams('schedule_id', scheduleData[0].schedule_id);

      setSchedule(scheduleData[0]);
    }

    getSchedule();

  }, [match.params.uuid]);

  const handleCopyToClipboard = e => {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();

    setTimeout(() => {
      setShowTooltip(false);
    }, 1000);

    setShowTooltip(true);
  };

  const setMinDate = minDate => {
    return minDate || new Date(1900, 0, 1);
  }

  const setMaxDate = maxDate => {
    return maxDate || new Date(2099, 11, 31);
  }

  const onActionBegin = (args) => {

    // set events to readOnly
    if (args.requestType === 'eventCreate') {
      //args.data[0].IsReadonly = true;
      //console.log(args.data[0]);
    }

    //  restrict the users to create and update more than one appointment on specific time slots
    // if (args.requestType === 'eventCreate' && args.data.length > 0) {
    //   let eventData = args.data[0];
    //   let eventField = scheduleObj.eventFields;
    //   let startDate = eventData[eventField.startTime];
    //   let endDate = eventData[eventField.endTime];
    //   args.cancel = !scheduleObj.isSlotAvailable(startDate, endDate);
    // }
  }

  const onPopupOpen = args => {
    if (args.type === 'Editor') {
      // control options for repeating an event
      //scheduleObj.eventWindow.recurrenceEditor.frequencies = ['none'];

      // Customizing the default time duration in editor window
      args.duration = 60;

      // another way to set read only events but can be deleted (neither can add *checking fix*)
      //args.cancel = true;
      //toast.dark('Cant edit this event');

      // Add additional fields to the default editor
      // if (!args.element.querySelector('.custom-field-row')) {
      //   let row = createElement('div', { className: 'custom-field-row' });
      //   let formElement = args.element.querySelector('.e-schedule-form');
      //   formElement.firstChild.insertBefore(row, formElement.firstChild.firstChild);
      //   let container = createElement('div', { className: 'custom-field-container' });
      //   let inputEle = createElement('input', {
      //     className: 'e-field', attrs: { name: 'EventType' }
      //   });
      //   container.appendChild(inputEle);
      //   row.appendChild(container);
      //   inputEle.setAttribute('name', 'user defined');
      //   inputEle.setAttribute('type', 'user defined');
      // }
    }

    // improve read only events by disabling editing button
    if (args.type === 'EditEventInfo') {
      let editButton = args.element.querySelector('.e-edit');
      editButton.disabled = true;
    }
  }

  // Differentiate the past time events
  const onEventRendered = args => {
    if (args.data.EndTime < this.scheduleObj.selectedDate) {
      args.element.classList.add('e-past-app');
    }
  }

  const editorWindowTemplate = props => {
    console.log(props);
    return <EventEditor fields={schedule.schedule_config.fields} props={props}/>;
  }

  return (
    <>
      {schedule ?
        <div className='mx-4 my-4'>
          <div className='row my-3'>
            <div className='col border rounded p-1 shadow' >
              <div
                className={styles.title}
                style={{ backgroundColor: `${schedule.schedule_color}` }}
              >
                {schedule.title}
              </div>
              <ScheduleComponent
                ref={schedule => scheduleObj = schedule}
                height='650px'
                rowAutoHeight={true}
                showWeekNumber={true}
                allowMultiCellSelection={false}
                allowMultiRowSelection={false}
                readonly={false}
                showQuickInfo={true}
                firstDayOfWeek={1}
                workDays={[1, 2, 3, 4, 5, 6]}
                showWeekend={false}
                eventSettings={{
                  dataSource: dataManager,
                  query: dataQuery,
                  editFollowingEvents: true,
                  enableTooltip: true,
                  fields: {
                    subject: {title: 'user defined'},
                    description: { title: 'user defined' },
                  }
                }}
                minDate={setMinDate(schedule.schedule_config.minDate)}
                maxDate={setMaxDate(schedule.schedule_config.maxDate)}
                editorTemplate={editorWindowTemplate}
                popupOpen={onPopupOpen}
                actionBegin={onActionBegin} >
                <ViewsDirective>
                  <ViewDirective option='Week'></ViewDirective>
                  <ViewDirective option='Month'></ViewDirective>
                </ViewsDirective>
                <Inject services={[Week, Month]} />
              </ScheduleComponent>
            </div>
            <div className='col-lg-2 mt-2'>
              <Card className='mb-3'>
                <div
                  className={styles.description}
                  style={{ backgroundColor: `${schedule.schedule_color}` }}
                >
                  Description
                  </div>
                <Card.Body>
                  {schedule.description}
                </Card.Body>
              </Card>
              <Card>
                <div
                  className={styles.description}
                  style={{ backgroundColor: `${schedule.schedule_color}` }}
                >
                  Share Link
                  </div>
                <Card.Body
                  className='d-flex flex-wrap'>
                  <label
                    className="sr-only"
                    htmlFor="inlineFormInputGroup">Share Link</label>
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <div
                        ref={tooltipRef}
                        className={`${styles['icon-container']} input-group-text`}
                        style={{ backgroundColor: `${schedule.schedule_color}` }}
                        onClick={handleCopyToClipboard}
                      >
                        <img
                          className={styles.icon}
                          src={`${iconsUrl}/icons/clipboard.svg`}
                          alt='' />
                        <Overlay target={tooltipRef.current} show={showTooltip} placement="top">
                          {(props) => (
                            <Tooltip {...props}>
                              Copied!
                            </Tooltip>
                          )}
                        </Overlay>
                      </div>
                    </div>
                    <input
                      ref={textAreaRef}
                      className={`${styles.link} form-control`}
                      type='text'
                      value={window.location.href}
                      readOnly />
                  </div>
                  <small className={styles['link-comment']}>
                    You can also copy the link from your browser's address bar.
                  </small>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
        : <DelayedRender />}
    </>
  );
}

export default ViewSchedule;
