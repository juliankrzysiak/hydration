import { useRef } from "react";
import { Dialog, DialogHandle } from "./Dialog.tsx";

export const Delete = () => {
  const dataModalRef = useRef<DialogHandle>(null);
  const accountModalRef = useRef<DialogHandle>(null);

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
      <Dialog ref={dataModalRef} />
      <Dialog ref={accountModalRef} />
    </fieldset>
  );
};
