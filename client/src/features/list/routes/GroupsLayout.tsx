import { Group } from "@/types";
import Info from "../components/Groups/Info";
import List from "../components/Groups/List";
import { useIdStore } from "../stores/idStore";

type Props = {
  groups: Group[];
};

export default function GroupsLayout({ groups }: Props) {
  const groupId = useIdStore((state) => state.groupId);
  const currentGroup = groups.find((group) => group.id === groupId);

  return (
    <div className="relative h-full">
      {groupId ? <Info group={currentGroup} /> : <List groups={groups} />}
    </div>
  );
}
