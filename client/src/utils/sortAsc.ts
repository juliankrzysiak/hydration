import { Plant } from "@/types";

export const sortAsc = (plants: Plant[]) =>
  plants.sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base" })
  );
