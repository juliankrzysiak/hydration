import { Plant } from "../../types";

type Props = {
  name: string;
  plants: Plant[];
};

export default function Group({ name, plants }: Props) {
  return (
    <div
      className="collapse-arrow collapse border border-base-300 bg-base-200"
      tabIndex={0}
    >
      <div className="collapse-title text-xl font-medium">{name}</div>
      <div className="collapse-content">
        <ul tabIndex={0}>
          {plants.map((plant) => {
            return <li key={plant.id}>{plant.name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
