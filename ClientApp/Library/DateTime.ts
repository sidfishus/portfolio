
import moment from "moment";

// Given a date, returns the duration in years since the end date or the current date if not specified.
export const CalcDurationYears = (orgDateInput: moment.MomentInput,
    endDateInput?: moment.MomentInput): number  => {

    return CalcDuration(orgDateInput,endDateInput).years();
}

export const CalcDuration = (orgDateInput: moment.MomentInput,
    endDateInput?: moment.MomentInput): moment.Duration  => {

    const endDate: moment.Moment = ((endDateInput === undefined)?moment():moment(endDateInput));
    
    const orgDate=moment(orgDateInput);
    const duration=moment.duration(endDate.diff(orgDate));
    return duration;
}

export const CalcDurationTotalMonths = (orgDateInput: moment.MomentInput,
    endDateInput?: moment.MomentInput): number  => {

    const dur=CalcDuration(orgDateInput,endDateInput);

    return (dur.years() * 12) + dur.months();
};