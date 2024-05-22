import { Group } from "@/types";
import { useIdStore } from "../../stores/idStore";
import { ErrorPage } from "@/routes/ErrorPage";
import BackButton from "@/components/Buttons/BackButton";
import EditButton from "@/components/Buttons/EditButton";
import DeleteButton from "@/components/Buttons/DeleteButton";

type Props = {
  group: Group | undefined;
};

export default function Info({ group }: Props) {
  function exitInfo() {
    useIdStore.setState({ groupId: null });
  }

  if (!group) return <ErrorPage />;

  return (
    <div className="w-full">
      <div className="mb-4 flex w-full justify-between">
        <BackButton handleClick={exitInfo} />
        <div className="flex gap-4">
          <EditButton />
          <DeleteButton />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="self-center text-2xl font-semibold underline">
          {group.name}
        </h1>
        <div className="flex flex-col justify-around gap-4">
          <div className="flex flex-col  gap-0">
            <h2 className="text-xl">Schedule</h2>
            <p>Every {group.schedule} days</p>
          </div>
          <div className="flex flex-col gap-0">
            <h2 className="text-xl">Plants</h2>
            <ul className="w-full">
              {group.plants.map((plant) => {
                return (
                  <li key={plant.id} className="flex justify-between">
                    <p>{plant.name}</p> <p>{plant.schedule}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
