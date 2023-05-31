import { Plant } from "../../types";
import dayjs from "dayjs";

interface Props {
  plants: Plant[];
}

export const Info = ({ plants }: Props) => {
  return (
    <section className="m-4 rounded-md bg-gray-900/20 p-4 shadow-lg">
      <h2 className="mb-2 text-2xl underline ">{dayjs().format("MMMM D")}</h2>
      {plants.map((plant) => {
        return (
          <div className="mb-2 flex text-lg" key={plant.id}>
            <h3 className="text-lg">{plant.name}</h3>
          </div>
        );
      })}
    </section>
  );
};
