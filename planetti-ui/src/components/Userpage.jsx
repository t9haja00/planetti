/* Packages
------------*/
import React, { useEffect, useState } from 'react';
/* Components
--------------*/
//wont need thease most likely? will have conditional rendering?

import { getSchedules } from '../services/scheduleService';

/* Styles
----------*/

user_id = localStorage.getItem('userId');


useEffect(() => {
    const { data: schedules } = await signin(user_id);
},
[]);

export default  Userpage;
