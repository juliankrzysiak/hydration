import { useOutletContext } from "react-router-dom";
import { Plant } from "../../types";
import dayjs from "dayjs";
import editSVG from "../../assets/create.svg";
import cancelSVG from "@/assets/cancel.svg";

import relativeTime from "dayjs/plugin/relativeTime.js";
dayjs.extend(relativeTime);

export const ListPlantInfo = () => {
  const { name, schedule, next_water, watered } = useOutletContext<Plant>();
  return (
    <>
      <div className="mb-4 flex justify-between">
        <h1 className=" text-3xl text-gray-900 underline">{name}</h1>
        <div className="right-2 flex gap-2">
          <button aria-label="Edit current plant">
            <img src={editSVG} alt="Edit" className=" w-8" />
          </button>
          <button aria-label="Delete current plant">
            <img src={cancelSVG} alt="Cancel" className="w-9  " />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="flex flex-col items-center">
          <h2 className="text-xl">Schedule</h2>
          <p>Every {schedule} days</p>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-xl">Next Water</h2>
          <p>{`${dayjs(next_water).format("MMM D")}, ${dayjs().to(
            dayjs(next_water)
          )}`}</p>
        </div>
        <div className="mt-4 flex flex-col items-center">
          <h2 className="text-xl">History</h2>
          <p>{watered.map((date) => dayjs(date).format("MMM D"))}</p>
        </div>
      </div>
    </>
  );
};
