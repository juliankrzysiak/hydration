export interface Plant {
  id: number;
  name: string;
  schedule: number;
  watered: Date[];
  next_water: Date;
}

export type PlantCreate = Pick<Plant, "name" | "schedule">;

export interface PlantDate {
  id: number;
  date: string;
}
