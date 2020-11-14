import {deleteSchedule} from '../../services/scheduleService';


export function Delete(test) {
    // console.log(test);
    // console.log(test.params)
    deleteSchedule(test.params);
    //Maybe should check if ok and then use toast to tell?
     // window.location.reload();
     return test.updateRenderCount(test.val +1);
  } 