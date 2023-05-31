import { useState } from "react";
import { Plant } from "../../types";
import { default as DateCalendar } from "react-calendar";
import dayjs from "dayjs";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Args {
  date: Date;
  view: string;
}

export default function Calendar({ plants }: { plants: Plant[] }) {
  const [value, onChange] = useState<Value>(new Date());

  console.log(plants);

  function tileContent({ date, view }: Args) {
    if (view === "month") {
      plants.forEach((plant) => {
        if (
          plant.watered.find((dDate: Date) => dayjs(dDate).isSame(dayjs(date)))
        ) {
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
      });
    }
  }

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
