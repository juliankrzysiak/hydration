import { useNavigate, useOutletContext } from "react-router-dom";
import { Plant } from "../../types";
import { Dialog, DialogHandle } from "@/components/Dialog";
import { useQueryClient } from "@tanstack/react-query";
import { deletePlant } from "../../api";
import { notify } from "@/utils/notify";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useShowFormStore } from "../../stores/showFormStore";
import { EditPlant } from "../Forms/Plant/EditPlant";
import cancelSVG from "@/assets/cancel.svg";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
dayjs.extend(relativeTime);

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
  const showEditForm = useShowFormStore((state) => state.editPlant);

  return (
    <>
      <h1 className=" mb-3 text-3xl text-gray-950 ">{name}</h1>
      <button
        className="absolute right-3 top-3  w-fit"
        onClick={() => navigate(-1)}
      >
        <img className="w-7" src={cancelSVG} alt="Cancel" />
      </button>
      {!showEditForm ? (
        <div className="grid grid-cols-2 gap-y-4">
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold">Schedule</h2>
            <p>Every {schedule} days</p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold">Next Water</h2>
            <p>
              {next_water &&
                `${dayjs(next_water).format("MMM D")}, ${dayjs().to(
                  dayjs(next_water)
                )}`}
            </p>
          </div>
          <div className=" flex flex-col items-center">
            <h2 className="text-xl font-semibold">History</h2>
            <ul className="grid grid-cols-2 gap-2">
              {watered.at(0) &&
                watered
                  .sort((a, b) => (dayjs(a).isAfter(dayjs(b)) ? -1 : 1))
                  .map((date) => (
                    <li key={date.toString()}>
                      {dayjs(date).format("MMM DD")}
                    </li>
                  ))}
            </ul>
          </div>
          <div className="flex items-center justify-center gap-6">
            <button
              className="rounded-md border-2 border-gray-800 px-2 py-1 font-semibold"
              aria-label="Edit current plant"
              onClick={() => useShowFormStore.setState({ editPlant: true })}
            >
              Edit
            </button>
            <button
              className="rounded-md border-2 border-gray-800 px-2 py-1 font-semibold"
              aria-label="Delete current plant"
              onClick={() => dialogRef.current?.open()}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <EditPlant {...{ id, name, schedule }} />
      )}
      <Dialog
        ref={dialogRef}
        handleClick={() => deletePlantMutation.mutate({ plant_id: id })}
      />
    </>
  );
};
