import { useIdStore } from "@/features/calendar/stores/idStore";
import { Group } from "@/types";
import List from "../components/Groups/List";

type Props = {
  groups: Group[];
};

export default function GroupsLayout({ groups }: Props) {
  //   const id = useIdStore((state) => state.id);

  return (
    <div className="relative">
      <List groups={groups} />
    </div>
  );
}
