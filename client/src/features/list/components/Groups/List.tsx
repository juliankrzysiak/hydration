import { Group as GroupType } from "@/types";
import Group from "./Group";
import AddGroup from "../Forms/Groups/AddGroup";

interface Props {
  groups: GroupType[];
}

export default function List({ groups }: Props) {
  return (
    <div className="flex h-full flex-col gap-4">
      <AddGroup />
      <ul>
        {groups.map((group) => {
          return <Group key={group.id} id={group.id} name={group.name} />;
        })}
      </ul>
    </div>
  );
}
