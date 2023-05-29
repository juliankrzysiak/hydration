import { useState } from "react";
import { default as DateCalendar } from "react-calendar";
import dayjs from "dayjs";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const datesToAddClassTo = ["2023-05-29"];

interface Props {
  date: Date;
  view: string;
}

function tileContent({ date, view }: Props) {
  // Add class to tiles in month view only
  if (view === "month") {
    // Check if a date React-Calendar wants to check is on the list of dates to add class to
    if (datesToAddClassTo.find((dDate) => dayjs(dDate).isSame(dayjs(date)))) {
      return (
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-0 top-0 m-1  w-2 fill-gray-700"
        >
          <circle cx="50" cy="50" r="50" />
        </svg>
      );
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
        tileContent={tileContent}
      />
    </div>
  );
}
