import { Plant } from "@/types";
import { notify } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { addDate, deleteDate } from "../../api";
import { usePlantsForToday } from "../../hooks/usePlantsForToday";
import { useDateStore } from "../../stores/dateStore";
import { AddHistory } from "../Forms/History/AddHistory";
import { AllPlantButton } from "./AllPlantsButton";

interface Props {
  plants: Plant[];
}

export enum Title {
  water = "To Water",
  watered = "All Watered",
  empty = "nothing",
}

export const Water = ({ plants }: Props) => {
  const queryClient = useQueryClient();
  const { scheduledPlants, wateredPlants, leftOverPlants, formattedDate } =
    usePlantsForToday(plants);
  const date = useDateStore((state) => dayjs(state.date).format("YYYY-MM-DD"));

  const addDateMutation = useMutation({
    mutationFn: addDate,
    onSuccess: () => {
      notify("success", "Date added!");
      queryClient.invalidateQueries({ queryKey: ["plants"] });
    },
  });

  const deleteDateMutation = useMutation({
    mutationFn: deleteDate,
    onSuccess: () => {
      notify("success", "Date removed!");
      queryClient.invalidateQueries({ queryKey: ["plants"] });
    },
  });

  const handleAddDate = (plants: Plant[]) => {
    const plant_id = plants.map((plant) => plant.id);
    addDateMutation.mutate({
      plant_id,
      date,
    });
  };

  const handleDeleteDate = (plants: Plant[]) => {
    const plant_id = plants.map((plant) => plant.id);
    deleteDateMutation.mutate({
      plant_id,
      date,
    });
  };

  function waterAll() {
    handleAddDate(scheduledPlants);
  }

  function unwaterAll() {
    handleDeleteDate(wateredPlants);
  }

  const title = (() => {
    if (scheduledPlants.length) return Title.water;
    if (wateredPlants.length) return Title.watered;
    else return Title.empty;
  })();

  // TODO: Change backend to accept array of plants on one date
  return (
    <div className="flex h-full w-full flex-col items-center rounded-md bg-slate-300 p-4 text-gray-950 shadow-md">
      <div className="mb-2 flex w-full items-center justify-between">
        {/* <h3 className=" text-3xl">Status: {title}</h3> */}
        <button className="text-2xl text-gray-900">{formattedDate}</button>
        <div className="flex">
          <AddHistory plants={leftOverPlants} />
          <AllPlantButton
            title={title}
            waterAll={waterAll}
            unwaterAll={unwaterAll}
          />
        </div>
      </div>
      <div className="flex w-full flex-col ">
        <ul className="flex flex-col gap-1 pl-2">
          {scheduledPlants.map((plant) => {
            return (
              <li key={plant.id}>
                <button
                  className={"text-xl font-medium"}
                  onClick={() => handleAddDate([plant])}
                >
                  {plant.name}
                </button>
              </li>
            );
          })}
        </ul>
        <ul className="flex flex-col gap-1 pl-2">
          {wateredPlants.map((plant) => {
            return (
              <li key={plant.id}>
                <button
                  className={"text-xl font-medium line-through"}
                  onClick={() => handleDeleteDate([plant])}
                >
                  {plant.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
