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
import { useShowFormStore } from "../../stores/showFormStore";
import { EditPlant } from "../Forms/Plant/EditPlant";
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
      <h1 className=" mb-6 text-3xl text-gray-900 underline">
        {showEditForm ? `Edit: ${name} ` : name}
      </h1>
      {!showEditForm ? (
        <div className="grid grid-cols-2 gap-y-4">
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
          <div className=" flex flex-col items-center">
            <h2 className="text-xl">History</h2>
            <p>
              {watered.at(0) &&
                watered.map((date) => dayjs(date).format("MMM D"))}
            </p>
          </div>
          <div className="flex items-center justify-center gap-6">
            <button
              className="rounded-md border border-gray-900 bg-gray-500/30 px-2 py-1"
              aria-label="Edit current plant"
              onClick={() => useShowFormStore.setState({ editPlant: true })}
            >
              Edit
            </button>
            <button
              className="rounded-md border border-gray-900 bg-gray-500/30 px-2 py-1"
              aria-label="Delete current plant"
              onClick={() => dialogRef.current?.open()}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <EditPlant {...{id,name, schedule  }}/>
      )}
      <Dialog
        ref={dialogRef}
        handleClick={() => deletePlantMutation.mutate({ plant_id: id })}
      />
    </>
  );
};
