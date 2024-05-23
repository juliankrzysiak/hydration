import { useIdStore } from "../stores/idStore";
import { Group } from "@/types";
import List from "../components/Groups/List";
import Info from "../components/Groups/Info";
import { ErrorPage } from "@/routes/ErrorPage";

type Props = {
  groups: Group[];
};

export default function GroupsLayout({ groups }: Props) {
  const groupId = useIdStore((state) => state.groupId);
  const currentGroup = groups.find((group) => group.id === groupId);

  return (
    <div className="relative">
      {groupId ? (
        <Info group={currentGroup} />
      ) : (
        <List groups={groups} />
      )}
    </div>
  );
}
