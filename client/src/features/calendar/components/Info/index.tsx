import { Plant } from "../../types";
import { ShowForm } from "./ShowForm";
import { useCalendarDates } from "../../hooks/useCalendarDates";
import { PlantsInfo } from "./PlantsInfo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDate, deleteDate } from "../../api";
import { notify } from "@/utils/notify";
import { useDateStore } from "../../stores/dateStore";
import dayjs from "dayjs";
import { AllPlantButton } from "./AllPlantsButton";

interface Props {
  plants: Plant[];
}

export enum Title {
  water = "To Water",
  watered = "All Watered",
  empty = "nothing",
}

export const Info = ({ plants }: Props) => {
  const queryClient = useQueryClient();
  const [scheduledPlants, wateredPlants, todayOrDate] = useCalendarDates({
    plants,
  });
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
    <div className="flex h-full w-full flex-col items-start rounded-md bg-slate-300 p-4 text-gray-950 shadow-md">
      <div className="mb-4 flex w-full items-center justify-between">
        {/* <h3 className=" text-3xl">Status: {title}</h3> */}
        <AllPlantButton
          title={title}
          waterAll={waterAll}
          unwaterAll={unwaterAll}
        />
        <h2 className="text-2xl text-gray-900">{todayOrDate}</h2>
      </div>
      <div className="flex flex-col gap-2">
        <PlantsInfo plants={scheduledPlants} handleDate={handleAddDate} />
        <PlantsInfo
          plants={wateredPlants}
          handleDate={handleDeleteDate}
          watered
        />
      </div>
      <ShowForm plants={plants} />
    </div>
  );
};
