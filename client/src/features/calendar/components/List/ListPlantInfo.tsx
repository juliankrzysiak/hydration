import { useOutletContext } from "react-router-dom";
import { Plant } from "../../types";

export const ListPlantInfo = () => {
  const plant = useOutletContext<Plant>();
  console.log(plant);
  return (
    <h1 className="mb-4 text-3xl text-gray-900 underline">{plant.name}</h1>
  );
};
