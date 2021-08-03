import { apiHost } from '../config/appConfig';
import { get } from './common/GetRequest';

const stockAPI = {};

stockAPI.getResults = (strCat, strType, strSearch, strPrevDate, strToDate) => get(`${apiHost}?`, { strCat, strType, strSearch, strPrevDate, strToDate });

export default stockAPI;
