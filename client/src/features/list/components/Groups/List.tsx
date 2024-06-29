import { Group as GroupType } from "@/types";
import Group from "./Group";

interface Props {
  groups: GroupType[];
}

export default function List({ groups }: Props) {
  return (
    <ul className="flex h-full flex-col gap-1">
      {groups.map((group) => {
        return <Group key={group.id} id={group.id} name={group.name} />;
      })}
    </ul>
  );
}
