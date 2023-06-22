import { useRef } from "react";
import { Dialog, DialogHandle } from "@/components/Dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notify } from "@/utils/notify.ts";
import { deleteAccount, deleteData } from "../../api/index.ts";
import { AuthError } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

export const Delete = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dataModalRef = useRef<DialogHandle>(null);
  const accountModalRef = useRef<DialogHandle>(null);
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

  return (
    <fieldset className="flex flex-col items-center gap-4">
      <p className="mb-4">Delete your data or account.</p>
      <div className="flex w-fit flex-col items-center gap-4">
        <button
          className="btn-warning"
          onClick={() => dataModalRef.current?.open()}
        >
          Delete Data
        </button>
        <button
          className="btn-warning"
          onClick={() => accountModalRef.current?.open()}
        >
          Delete Account
        </button>
      </div>
      <Dialog ref={dataModalRef} handleClick={() => dataMutation.mutate()} />
      <Dialog
        ref={accountModalRef}
        handleClick={() => accountMutation.mutate()}
      />
    </fieldset>
  );
};
