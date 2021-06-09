
import moment from "moment";

// Given a date, returns the duration in years since the end date or the current date if not specified.
export const CalcDurationYears = (orgDateInput: moment.MomentInput,
    endDateInput?: moment.MomentInput): number  => {

    const endDate: moment.Moment = ((endDateInput === undefined)?moment():moment(endDateInput));
    
    const orgDate=moment(orgDateInput);
    const duration=moment.duration(endDate.diff(orgDate));
    return duration.years();
}