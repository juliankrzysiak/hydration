import { getUid } from "@/features/calendar/utils/getUid";
import { catchApiError } from "@/features/calendar/utils/catchApiError";

const url = "http://localhost:3001/api/plants";

export const deleteData = async () => {
  try {
    const uid = await getUid();
    const res = await fetch(`${url}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        uid,
      },
    });

    return res.json();
  } catch (error) {
    catchApiError(error, "Could not delete plants!");
  }
};
