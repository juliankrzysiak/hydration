import { useState } from "react";
import { default as DateCalendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const datesToAddClassTo = ["2023-05-28"];

interface Props {
  date: Date;
  view: string;
}

function tileClassName({ date, view }: Props) {
  // Add class to tiles in month view only
  if (view === "month") {
    // Check if a date React-Calendar wants to check is on the list of dates to add class to
    if (datesToAddClassTo.find((dDate) => dayjs(dDate).isSame(dayjs(date)))) {
      return "underline underline-offset-4";
    }
  }
}

export default function Calendar() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div>
      <DateCalendar
        onChange={onChange}
        value={value}
        calendarType="US"
        view="month"
        tileClassName={tileClassName}
      />
    </div>
  );
}
