import { notify } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { addDate, deleteDate } from "../../api";
import { usePlantsForToday } from "../../hooks/useCalendarDates";
import { useDateStore } from "../../stores/dateStore";
import { Plant } from "../../../../types";
import { AllPlantButton } from "./AllPlantsButton";
import { PlantsInfo } from "./List";
import { ShowForm } from "./ShowForm";
import List from "@/features/list/components/Groups/List";

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
  const [scheduledPlants, wateredPlants, todayOrDate] =
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
      <div className=" flex w-full items-center justify-between">
        {/* <h3 className=" text-3xl">Status: {title}</h3> */}
        <h2 className="text-2xl text-gray-900">{todayOrDate}</h2>
        <AllPlantButton
          title={title}
          waterAll={waterAll}
          unwaterAll={unwaterAll}
        />
      </div>
      <div className="flex w-full flex-col gap-1 py-2"></div>
      {/* <List /> */}
      <ShowForm plants={plants} />
    </div>
  );
};
