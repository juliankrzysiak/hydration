export interface Plant {
  id: number;
  name: string;
  schedule: number;
  watered: Date[];
  next_water: Date;
  group_id: number;
}

export type PlantCreate = Pick<Plant, "name" | "schedule" | "group_id">;

export interface PlantDate {
  plant_id: number[];
  date: string;
}

export type PlantEdit = Pick<Plant, "id" | "name" | "schedule">;

export type Group = {
  id: number;
  name: string;
  schedule: number;
  plants: Plant[];
};
