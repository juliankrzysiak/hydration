import { useNavigate, useOutletContext } from "react-router-dom";
import { Plant } from "../../types";
import { Dialog, DialogHandle } from "@/components/Dialog";
import { useQueryClient } from "@tanstack/react-query";
import { deletePlant } from "../../api";
import { notify } from "@/utils/notify";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
dayjs.extend(relativeTime);
import editSVG from "../../assets/create.svg";
import cancelSVG from "@/assets/cancel.svg";

export const ListPlantInfo = () => {
  const { name, schedule, next_water, watered, id } = useOutletContext<Plant>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const deletePlantMutation = useMutation({
    mutationFn: deletePlant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plants"] });
      notify("success", "Plant deleted");
      navigate("/plants");
    },
  });
  const dialogRef = useRef<DialogHandle>(null);

  return (
    <>
      <div className="mb-4 flex justify-between">
        <h1 className=" text-3xl text-gray-900 underline">{name}</h1>
        <div className="right-2 flex gap-2">
          <button aria-label="Edit current plant">
            <img src={editSVG} alt="Edit" className=" w-8" />
          </button>
          <button
            aria-label="Delete current plant"
            onClick={() => dialogRef.current?.open()}
          >
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
          <p>
            {next_water &&
              `${dayjs(next_water).format("MMM D")}, ${dayjs().to(
                dayjs(next_water)
              )}`}
          </p>
        </div>
        <div className="mt-4 flex flex-col items-center">
          <h2 className="text-xl">History</h2>
          <p>
            {watered.at(0) &&
              watered.map((date) => dayjs(date).format("MMM D"))}
          </p>
        </div>
      </div>
      <Dialog
        ref={dialogRef}
        handleClick={() => deletePlantMutation.mutate({ plant_id: id })}
      />
    </>
  );
};
