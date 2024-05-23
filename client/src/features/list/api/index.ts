import { catchApiError } from "@/features/calendar/utils/catchApiError";
import { getUid } from "@/features/calendar/utils/getUid";
import { PlantCreate } from "@/types";

const url =
  import.meta.env.VITE_LOCALHOST || "https://water-schedule.fly.dev/api";

export const createPlant = async (plant: PlantCreate) => {
  try {
    const uid = await getUid();
    const body = JSON.stringify(plant);
    const res = await fetch(`${url}/plants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        uid,
      },
      body,
    });

    return res.json();
  } catch (error) {
    catchApiError(error, "Could not create plant!");
  }
};

type editGroupParams = {
  id: number;
  name: string;
  schedule: number;
};

export const editGroup = async ({ id, name, schedule }: editGroupParams) => {
  try {
    const uid = await getUid();
    const body = JSON.stringify({ name, schedule });
    const res = await fetch(`${url}/groups/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        uid,
      },
      body,
    });
    return res.json();
  } catch (error) {
    catchApiError(error, "Could not edit group.");
  }
};

type EditGroupForPlantsParams = {
  id: number;
  add: number[];
  remove: number[];
};

// Change multiple plants associated with a group
export async function editGroupForPlants({
  id,
  add,
  remove,
}: EditGroupForPlantsParams) {
  try {
    const uid = await getUid();
    const body = JSON.stringify({ add, remove });
    const res = await fetch(`${url}/plants/group/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        uid,
      },
      body,
    });
    return res.json();
  } catch (error) {
    catchApiError(error, "Could not edit group.");
  }
}
