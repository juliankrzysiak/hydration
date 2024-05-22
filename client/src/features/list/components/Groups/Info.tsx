import { Group } from "@/types";
import { useIdStore } from "../../stores/idStore";
import { ErrorPage } from "@/routes/ErrorPage";
import BackButton from "@/components/Buttons/BackButton";
import EditButton from "@/components/Buttons/EditButton";
import DeleteButton from "@/components/Buttons/DeleteButton";

type Props = {
  group: Group;
};

export default function Info({ group }: Props) {
  function exitInfo() {
    useIdStore.setState({ groupId: null });
  }

  if (!group) return <ErrorPage />;

  return (
    <div className="w-full">
      <div className="flex w-full justify-between">
        <BackButton handleClick={exitInfo} />
        <div className="flex gap-4">
          <EditButton />
          <DeleteButton />
        </div>
      </div>
      <h2>{group.name}</h2>
    </div>
  );
}
