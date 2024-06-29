import { createContext } from "react";
import { Plant } from "@/types";

export const SinglePlantsContext = createContext<Plant[]>({} as Plant[]);
