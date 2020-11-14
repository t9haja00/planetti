import {deleteSchedule} from '../../services/scheduleService';
// import { useEffect } from 'react';

export function Delete(params) {
    console.log(params)
    const res =  deleteSchedule(params);
    //Maybe should check if ok and then use toast to tell?
    window.location.reload();
  }