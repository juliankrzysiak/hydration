import DeleteModal from "@/components/Dialog/DeleteModal.js";
import { notify } from "@/utils";
import { AuthError } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAccount, deleteData } from "../../api/index.js";

export const Delete = () => {
  const navigate = useNavigate();

  const dataModalRef = useRef<HTMLDialogElement>(null);
  const accountModalRef = useRef<HTMLDialogElement>(null);

  const queryClient = useQueryClient();
  const dataMutation = useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      dataModalRef.current?.close();
      queryClient.invalidateQueries({ queryKey: ["plants"] });
      notify("success", "All data deleted");
    },
    onError: (error: AuthError) => notify("error", error.message),
  });
  const accountMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: async () => {
      accountModalRef.current?.close();
      notify("success", "Account deleted");
      navigate("/account/login");
    },
    onError: (error: AuthError) => notify("error", error.message),
  });

  function openDataModal() {
    dataModalRef.current?.showModal();
  }

  function openAccountModal() {
    accountModalRef.current?.showModal();
  }

  return (
    <fieldset className="flex flex-col items-center gap-4">
      <p>Delete your data or account.</p>
      <div className="flex w-fit flex-col items-center gap-4">
        <DeleteModal
          ref={dataModalRef}
          item="Data"
          handleSubmit={() => dataMutation.mutate()}
        >
          <button className="btn-error btn" onClick={openDataModal}>
            Delete Data
          </button>
        </DeleteModal>
        <DeleteModal
          ref={accountModalRef}
          item="Account"
          handleSubmit={() => accountMutation.mutate()}
        >
          <button className="btn-error btn" onClick={openAccountModal}>
            Delete Account
          </button>
        </DeleteModal>
      </div>
    </fieldset>
  );
};
