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

  return (
    <div className="flex h-full w-full flex-col items-start rounded-md bg-gray-900/20 p-4 text-gray-950 shadow-md ">
      <h2 className="absolute right-4 text-3xl  text-gray-800">
        {todayOrDate}
      </h2>
      <PlantsInfo
        plants={scheduledPlants}
        title="To Water"
        handleDate={handleAddDate}
      />
      <PlantsInfo plants={wateredPlants} title="Watered" handleDate={handleDeleteDate} />
      <ShowForm plants={plants} />
    </div>
  );
};
