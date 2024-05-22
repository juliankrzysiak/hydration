import plusSVG from "@/assets/plus.svg";
import { useShowFormStore } from "@/stores/showFormStore";
import { Group as GroupType } from "@/types";
import Group from "./Group";

interface Props {
  groups: GroupType[];
}

export default function List({ groups }: Props) {
  const showCreateForm = useShowFormStore((state) => state.addGroup);

  return (
    <div>
      <ul>
        {groups.map((group) => {
          return <Group key={group.id} id={group.id} name={group.name} />;
        })}
      </ul>
      <button
        className="rounded-md border-2 border-gray-800 hover:bg-gray-300/50"
        aria-label="Show Add Date Form"
        onClick={() => useShowFormStore.setState({ addGroup: true })}
      >
        <img className="w-7" src={plusSVG} alt="Plus" />
      </button>
    </div>
  );
}
