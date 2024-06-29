import BackButton from "@/components/Buttons/BackButton";
import DeleteButton from "@/components/Buttons/DeleteButton";
import { ErrorPage } from "@/routes/ErrorPage";
import { Group } from "@/types";
import { useIdStore } from "../../stores/idStore";
import EditGroup from "../Forms/Groups/EditGroup";
import DeleteModal from "@/components/Dialog/DeleteModal";
import { useRef } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { notify } from "@/utils";
import { deleteGroup } from "../../api";

type Props = {
  group: Group | undefined;
};

export default function Info({ group }: Props) {
  const deleteModalRef = useRef<HTMLDialogElement>(null);

  const queryClient = useQueryClient();
  const deleteGroupMutation = useMutation({
    mutationFn: deleteGroup,
    onSuccess: () => {
      //BUG: For some reason I have to separate the keys instead of one array
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      queryClient.invalidateQueries({ queryKey: ["plants"] });
      notify("success", "Group deleted");
    },
    onError: () => {
      notify("error", "Could not delete group.");
    },
  });

  function submitForm() {
    if (!group) return;
    deleteGroupMutation.mutate(group.id);
    useIdStore.setState({ groupId: null });
  }

  function openModal() {
    deleteModalRef.current?.showModal();
  }

  function exitInfo() {
    useIdStore.setState({ groupId: null });
  }

  if (!group) return <ErrorPage />;

  return (
    <div className="w-full">
      <div className="mb-4 flex w-full justify-between">
        <BackButton handleClick={exitInfo} />
        <div className="flex gap-4">
          <EditGroup group={group} />
          <DeleteModal
            ref={deleteModalRef}
            item="Group"
            handleSubmit={submitForm}
          >
            <DeleteButton handleClick={openModal} />
          </DeleteModal>
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
