import { Group } from "@/types";
import { useIdStore } from "../../stores/idStore";
import { ErrorPage } from "@/routes/ErrorPage";

type Props = {
  group: Group;
};

export default function Info({ group }: Props) {
  function exitInfo() {
    useIdStore.setState({ groupId: null });
  }

  if (!group) return <ErrorPage />;

  return (
    <div>
      <h2>{group.name}</h2>
      <button onClick={exitInfo}>x</button>
    </div>
  );
}
