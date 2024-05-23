import { Group, Plant } from "@/types";
import { Dialog, DialogHandle } from "@/components/Dialog";
import { useQueryClient } from "@tanstack/react-query";
import { deletePlant } from "../../../calendar/api";
import { notify } from "@/utils";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useShowFormStore } from "@/stores/showFormStore";
import { EditPlant } from "../Forms/Plants/EditPlant";
import cancelSVG from "@/assets/cancel.svg";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import { useIdStore } from "../../stores/idStore";
import { ErrorPage } from "@/routes/ErrorPage";
dayjs.extend(relativeTime);

interface Props {
  plant: Plant | undefined;
  groups: Group[];
}

export const Info = ({ plant, groups }: Props) => {
  const queryClient = useQueryClient();
  const deletePlantMutation = useMutation({
    mutationFn: deletePlant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plants"] });
      notify("success", "Plant deleted");
      useIdStore.setState({ id: null });
    },
  });
  const dialogRef = useRef<DialogHandle>(null);
  const showEditForm = useShowFormStore((state) => state.editPlant);

  if (!plant) return <ErrorPage />;
  const { id, name, schedule, next_water, watered, group_id } = plant;

  return (
    <>
      <h1 className=" mb-4 text-3xl text-gray-950">{name}</h1>
      <button
        className="absolute right-3 top-3  w-fit"
        onClick={() => {
          useShowFormStore.setState({ editPlant: false });
          useIdStore.setState({ id: null });
        }}
      >
        <img className="w-7" src={cancelSVG} alt="Cancel" />
      </button>
      {!showEditForm ? (
        <div className="grid grid-cols-2 gap-y-8">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold">Schedule</h2>
            <p>Every {schedule} days</p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold">Next Water</h2>
            <p>
              {next_water &&
                `${dayjs(next_water).format("MMM D")}, ${dayjs().to(
                  dayjs(next_water)
                )}`}
            </p>
          </div>
          <div className=" flex flex-col items-center">
            <h2 className="text-2xl font-semibold">History</h2>
            <ul className="grid gap-2">
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
        <EditPlant
          id={id}
          name={name}
          schedule={schedule}
          group_id={group_id}
          groups={groups}
        />
      )}
      <Dialog
        ref={dialogRef}
        handleClick={() => deletePlantMutation.mutate({ plant_id: id })}
      />
    </>
  );
};
