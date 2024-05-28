import { Group as GroupType } from "@/types";
import Group from "./Group";
import AddGroup from "../Forms/Groups/AddGroup";

interface Props {
  groups: GroupType[];
}

export default function List({ groups }: Props) {
  return (
    <div className="flex h-full flex-col gap-8">
      <ul>
        {groups.map((group) => {
          return <Group key={group.id} id={group.id} name={group.name} />;
        })}
      </ul>
      <AddGroup />
    </div>
  );
}
