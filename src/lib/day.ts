import dayjs from "dayjs";
import "dayjs/locale/pt-br";

import localeData from "dayjs/plugin/localeData";
import duration from "dayjs/plugin/duration";

dayjs.locale("pt-br");
dayjs.extend(localeData);
dayjs.extend(duration);

export function buildCalendar( year:number, month:number){
    const currentDate = new Date(year, month);
    const firstDay = dayjs(currentDate).startOf("month").day();
    const firstDate = dayjs(currentDate).subtract((firstDay), "day");
    const dates:Date[] = [];
    
    for(let i =0; i< 42; i++){
        dates.push(dayjs(firstDate).add(i, "day").toDate());
    }
    
    return dates;
}

export default dayjs;
