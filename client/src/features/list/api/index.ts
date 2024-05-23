import { PlantCreate } from "@/types";
import { getUid } from "@/features/calendar/utils/getUid";
import { catchApiError } from "@/features/calendar/utils/catchApiError";

const url =
  import.meta.env.VITE_LOCALHOST || "https://water-schedule.fly.dev/api/plants";

export const createPlant = async (plant: PlantCreate) => {
  try {
    const uid = await getUid();
    const body = JSON.stringify(plant);
    const res = await fetch(url, {
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
