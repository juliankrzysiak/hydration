import { useState } from "react";
import { Plant } from "@/types";
import { default as DateCalendar } from "react-calendar";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { useDateStore } from "../../stores/dateStore";
import { useShowFormStore } from "@/stores/showFormStore";

import droplet from "@/assets/droplet-dark.svg";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Args {
  date: Date;
  view: string;
}

export default function Calendar({ plants }: { plants: Plant[] }) {
  const [value, setValue] = useState<Value>(new Date());

  function tileContent({ date, view }: Args) {
    if (view === "month") {
      const allNextDate = plants.map((plant) => plant.next_water);
      if (allNextDate.find((dDate) => dayjs(dDate).isSame(date, "day"))) {
        return (
          <img
            className="absolute right-0 top-0 w-4"
            src={droplet}
            alt="Droplet"
          />
        );
      }
    }
  }

  function tileClassName({ date, view }: Args) {
    if (view === "month") {
      const allPastDate = plants.flatMap((plant) => plant.watered);
      if (allPastDate.find((dDate) => dayjs(dDate).isSame(date, "day"))) {
        return "bg-gray-900/30 border border-gray-900 ";
      }
    }
  }

  const onClickDay = (date: Date) => {
    useDateStore.setState({ date });
    useShowFormStore.setState({ addPlant: false });
  };

  return (
    <DateCalendar
      onChange={setValue}
      onClickDay={onClickDay}
      value={value}
      calendarType="gregory"
      tileContent={tileContent}
      tileClassName={tileClassName}
      prev2Label={null}
      next2Label={null}
    />
  );
}
