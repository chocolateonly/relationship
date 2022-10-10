import {service} from '../utils/request';

export const fetchData = () => {
    return service({
        url: './table.json',
        method: 'get'
    });
};
