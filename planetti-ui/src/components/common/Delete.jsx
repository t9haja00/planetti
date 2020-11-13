import {deleteSchedule} from '../../services/scheduleService';
import { useEffect } from 'react';

export function Delete(params) {
    useEffect(async () => {
        const res = await deleteSchedule(params)
    }, [] );
}