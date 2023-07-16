import { Plant } from "../../types";
import { ShowForm } from "./ShowForm";
import { useCalendarDates } from "../../hooks/useCalendarDates";
import { PlantsInfo } from "./PlantsInfo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDate, deleteDate } from "../../api";
import { notify } from "@/utils/notify";
import { useDateStore } from "../../stores/dateStore";
import dayjs from "dayjs";

interface Props {
  plants: Plant[];
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

  const handleAddDate = (plant_id: number) => {
    addDateMutation.mutate({
      plant_id,
      date,
    });
  };

  const handleDeleteDate = (plant_id: number) => {
    deleteDateMutation.mutate({
      plant_id,
      date,
    });
  };

  const pickTitle = () => {
    if (scheduledPlants.length) return "To Water";
    if (wateredPlants.length) return "All Watered";
    else return "Nothing here";
  };

  return (
    <div className="flex h-full w-full flex-col items-start rounded-md bg-gray-900/20 p-4 text-gray-950 shadow-md ">
      <div className="mb-2  flex w-full items-center justify-between">
        <h3 className=" text-3xl ">{pickTitle()}</h3>
        <h2 className=" text-3xl  text-gray-800">{todayOrDate}</h2>
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
