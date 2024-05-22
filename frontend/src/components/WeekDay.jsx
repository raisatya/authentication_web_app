import { memo } from 'react';
import dayjs from 'dayjs'

const WeekDay = () => {

    const weekdays = [
        "SUNDAY",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY"
    ];

    const months = [
        "JANUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER"
    ]

    const dayname = weekdays[dayjs().day()];
    const currentyear = dayjs().get('year');
    const currentmonth = months[dayjs().get('month')];
    const currentdate = dayjs().get('date');

    const dateDisplayString = `${dayname}, ${currentdate} ${currentmonth}, ${currentyear}`
  return (
      <p className='text-xl sm:text-3xl font-semibold tracking-widest'>{dateDisplayString}</p>
  )
}

export default memo(WeekDay);