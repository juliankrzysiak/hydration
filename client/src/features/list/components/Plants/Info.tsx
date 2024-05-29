import BackButton from "@/components/Buttons/BackButton";
import DeleteButton from "@/components/Buttons/DeleteButton";
import DeleteModal from "@/components/Dialog/DeleteModal";
import { ErrorPage } from "@/routes/ErrorPage";
import { Group, Plant } from "@/types";
import { notify } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import { useRef } from "react";
import { deletePlant } from "../../../calendar/api";
import { useIdStore } from "../../stores/idStore";
dayjs.extend(relativeTime);

interface Props {
  plant: Plant | undefined;
  group?: Group;
}

export const Info = ({ plant, group }: Props) => {
  const deleteModalRef = useRef<HTMLDialogElement>(null);

  const queryClient = useQueryClient();
  const deletePlantMutation = useMutation({
    mutationFn: deletePlant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plants"] });
      notify("success", "Plant deleted");
      useIdStore.setState({ id: null });
    },
  });

  if (!plant) return <ErrorPage />;

  function submitForm() {
    if (!plant) return;
    deletePlantMutation.mutate(plant.id);
    useIdStore.setState({ groupId: null });
  }

  function openModal() {
    deleteModalRef.current?.showModal();
  }

  function exitInfo() {
    useIdStore.setState({ id: null });
  }

  return (
    <div className="w-full">
      <div className="mb-4 flex w-full justify-between">
        <BackButton handleClick={exitInfo} />
        <div className="flex gap-4">
          {/* <EditPlant /> */}
          <DeleteModal
            ref={deleteModalRef}
            item="Group"
            handleSubmit={submitForm}
          >
            <DeleteButton handleClick={openModal} />
          </DeleteModal>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="self-center text-2xl font-semibold underline">
            {plant.name}
          </h2>
          <h3>{group?.name}</h3>
        </div>
        <div className="flex flex-col justify-around gap-4">
          <div className="flex flex-col  gap-0">
            <h2 className="font-bold">Schedule</h2>
            <p>Every {plant.schedule} days</p>
          </div>
          <div className="flex flex-col ">
            <h2 className="font-bold">Next Water</h2>
            <p>
              {plant.next_water &&
                `${dayjs(plant.next_water).format("MMM D")}, ${dayjs().to(
                  dayjs(plant.next_water)
                )}`}
            </p>
          </div>
          <div className=" flex flex-col ">
            <h2 className="font-bold">History</h2>
            <ul className="grid">
              {plant.watered.at(0) &&
                plant.watered
                  .sort((a, b) => (dayjs(a).isAfter(dayjs(b)) ? -1 : 1))
                  .map((date) => (
                    <li key={date.toString()}>
                      {dayjs(date).format("MMM DD")}
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
