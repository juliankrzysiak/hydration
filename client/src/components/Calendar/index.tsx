import { useState } from "react";
import { Plant } from "../../types";
import { default as DateCalendar } from "react-calendar";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { useDateStore } from "../../store";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Args {
  date: Date;
  view: string;
}

export default function Calendar({ plants }: { plants: Plant[] }) {
  const [value, setValue] = useState<Value>(new Date());
  const setDate = useDateStore((state) => state.setDate);

  function tileContent({ date, view }: Args) {
    if (view === "month") {
      const allNextDate = plants.map((plant) => plant.next_water);
      if (allNextDate.find((dDate) => dayjs(dDate).isSame(date, "day"))) {
        return (
          <img
            src="/droplet.svg"
            alt="water droplet"
            className="absolute right-0 top-0 w-4"
          />
        );
        // return <Droplet className="absolute right-0 top-0  w-4" />;
      }
    }
  }

  return (
    <DateCalendar
      onChange={setValue}
      onClickDay={setDate}
      value={value}
      calendarType="US"
      view="month"
      tileContent={tileContent}
    />
  );
}
