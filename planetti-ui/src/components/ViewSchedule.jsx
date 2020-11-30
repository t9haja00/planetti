import React, { useState, useEffect, useRef } from 'react';
import { Card, Overlay, Tooltip } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { createElement, L10n, Internationalization } from '@syncfusion/ej2-base';
import { FormValidator } from '@syncfusion/ej2-inputs';
import { DialogUtility } from '@syncfusion/ej2-react-popups';
import {
  ScheduleComponent,
  Inject,
  Week,
  Month,
  ViewsDirective,
  ViewDirective
} from '@syncfusion/ej2-react-schedule';
import { DataManager, UrlAdaptor, Query } from '@syncfusion/ej2-data';
import { getScheduleByUUID } from '../services/scheduleService';
import EventEditorTemplate from './templates/EventEditorTemplate';
import Header from './templates/quickPopupTemplates/Header';
import Content from './templates/quickPopupTemplates/Content';
import EventTemplate from './templates/EventTemplate';
import TooltipTemplate from './templates/TooltipTemplate';
import DelayedRender from './common/DelayedRender';
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

/* change the default editor text
-----------------------------------*/
L10n.load({
  'en-US': {
    'schedule': {
      'saveButton': 'Add',
      'cancelButton': 'Close',
      'deleteButton': 'Delete Event',
      'newEvent': 'Add Event'
    }
  }
});

let dataManager = null;
let dataQuery = null;
let scheduleObj = null;
const iconsUrl = process.env.REACT_APP_API;
const eventsAPI = process.env.REACT_APP_EVENTS;

const ViewSchedule = ({ match, history }) => {

  /* State
  ---------*/
  const [schedule, setSchedule] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  /* Refs
  --------*/
  const textAreaRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    const getSchedule = async () => {
      const { data: scheduleData } =
        await getScheduleByUUID(match.params.uuid);

      if (scheduleData.length === 0) return history.replace('/');

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

  /* Schedule eventHandlers
  --------------------------*/
  const onActionBegin = args => {

    // set events to readOnly
    if (args.requestType === 'eventCreate') {
      //args.data[0].IsReadonly = true;
      //console.log(args.data[0]);
    }

    // if (args.requestType === 'eventChange') {
    //   scheduleObj.openEditor(args.data[0], 'EditOccurrence', true);
    // }

    //  restrict the users to create and update more than one appointment on specific time slots
    // if (args.requestType === 'eventCreate' && args.data.length > 0) {
    //   let eventData = args.data[0];
    //   let eventField = scheduleObj.eventFields;
    //   let startDate = eventData[eventField.startTime];
    //   let endDate = eventData[eventField.endTime];
    //   args.cancel = !scheduleObj.isSlotAvailable(startDate, endDate);
    // }
  };

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

      // fields validation
      mandatoryOrFirstOrDefault().map(field => {
        const formElement = args.element.querySelector('.e-schedule-form');
        let validator = formElement.ej2_instances[0];
        validator.addRules(`${field.name}`, { required: true });
      });

      // improve read only events by disabling editing button
      // if (args.type === 'EditEventInfo') {
      //   let editButton = args.element.querySelector('.e-edit');
      //   editButton.disabled = true;
      // }
    }
  };

  const onPopupClose = args => {

    if (args.type == "Editor" && scheduleObj.eventWindow.isCrudAction) {
      var bool = !(args.data.StartTime < args.data.EndTime);
      if (bool) {
        args.cancel = true;
        DialogUtility.alert({
          animationSettings: { effect: 'Zoom' },
          closeOnEscape: true,
          content: "End time must be greater than Start time ",
          showCloseIcon: true,
          title: 'Error',
          position: 'center'
        });
      }
    }

    if (args.type === 'QuickInfo' && scheduleObj.quickPopup.isCrudAction) {

      // fields validation
      let validator = new FormValidator('#quickPopupForm');

      mandatoryOrFirstOrDefault().map(field => {
        validator.addRules(`${field.name}`, { required: true });
      });

      if (!validator.validate()) {
        args.cancel = true;
      }
    }
  };

  /* Utils
  ---------*/
  const setMinDate = minDate => {
    return minDate || new Date(1900, 0, 1);
  };

  const setMaxDate = maxDate => {
    return maxDate || new Date(2099, 11, 31);
  };

  const isCustomFields = _ => {
    return schedule.schedule_config.fields.length;
  }

  const isMandatoryFields = _ => {
    return mandatoryFields().length;
  }

  const allCustomFields = _ => {
    return schedule.schedule_config.fields;
  }

  const mandatoryFields = _ => {
    const { fields } = schedule.schedule_config;
    return fields.filter(field => field.mandatory === 'true');
  };

  const mandatoryOrFirstOrDefault = _ => {
    if (isCustomFields())
      return isMandatoryFields() ? mandatoryFields() : [allCustomFields()[0]];

    return [{ id: 1, type: "text", name: "title", label: "Title" }];
  }

  const formatDate = (date, options) => {
    const int = new Internationalization();

    return int.formatDate(date, options);
  }

  const displayDateTime = (startTime, endTime) => {
    const startTimeDetail = scheduleObj.getTimeString(startTime);
    const endTimeDetail = scheduleObj.getTimeString(endTime);
    const startDateDetails = formatDate(startTime, { skeleton: 'long' });

    return { startTimeDetail, endTimeDetail, startDateDetails };
  }

  /* Templates 
  -------------*/
  const editorWindowTemplate = props => {
    return (
      <EventEditorTemplate
        fields={isCustomFields() ? allCustomFields() : mandatoryOrFirstOrDefault()}
        props={props}
        maxDate={setMaxDate(schedule.schedule_config.maxDate)}
        minDate={setMinDate(schedule.schedule_config.minDate)} />
    );
  };

  const header = props => {
    return (
      <Header
        props={props}
        closePopup={closeQuickInfoPopup}
        editEvent={openEditorWindow}
        deleteEvent={deleteEvent}
      />
    );
  };

  const content = props => {
    const {
      startDateDetails,
      startTimeDetail,
      endTimeDetail } = displayDateTime(props.StartTime, props.EndTime);
    const dateTimeDetails = `${startDateDetails} ( ${startTimeDetail} - ${endTimeDetail} )`;


    return (
      <Content
        fields={mandatoryOrFirstOrDefault()}
        props={props}
        dateTimeDetails={dateTimeDetails} />
    );
  };

  const eventTemplate = props => {
    return (
      <EventTemplate
        props={props}
        fields={mandatoryOrFirstOrDefault()}
        startTime={formatDate(props.StartTime, { skeleton: 'hm' })}
        endTime={formatDate(props.EndTime, { skeleton: 'hm' })} />
    );
  }

  const tooltipTemplate = props => {
    const {
      startDateDetails,
      startTimeDetail,
      endTimeDetail } = displayDateTime(props.StartTime, props.EndTime);

    return (
      <TooltipTemplate
        props={props}
        fields={mandatoryOrFirstOrDefault()}
        startDate={startDateDetails}
        startTime={startTimeDetail}
        endTime={endTimeDetail} />
    );
  };

  /* Templates eventHandlers
  ----------------------------*/
  const openEditorWindow = async _ => {
    const data = scheduleObj.activeEventData.event;

    scheduleObj.currentAction = null;
    closeQuickInfoPopup();
    await scheduleObj.openEditor(data, 'Save');
  }

  const deleteEvent = props => {
    scheduleObj.currentAction = null;
    scheduleObj.activeEventData.event = props;
    scheduleObj.quickPopup.quickPopupHide();
    scheduleObj.quickPopup.openDeleteAlert();
    // scheduleObj.quickPopup.deleteClick();
  }

  const closeQuickInfoPopup = _ => {
    scheduleObj.quickPopup.isCrudAction = false;
    scheduleObj.quickPopup.quickPopupHide();
  };


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
                  template: eventTemplate,
                  tooltipTemplate: tooltipTemplate,
                }}
                minDate={setMinDate(schedule.schedule_config.minDate)}
                maxDate={setMaxDate(schedule.schedule_config.maxDate)}
                popupOpen={onPopupOpen}
                popupClose={onPopupClose}
                actionBegin={onActionBegin}
                editorTemplate={editorWindowTemplate}
                quickInfoTemplates={{ header, content, footer: null }}
              >
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
