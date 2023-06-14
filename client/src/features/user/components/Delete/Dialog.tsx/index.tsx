import { forwardRef, useImperativeHandle, useRef } from "react";

export type DialogHandle = {
  open: () => void;
};

interface Props {
  handleClick: () => void;
}

export const Dialog = forwardRef<DialogHandle, Props>(
  ({ handleClick }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(
      ref,
      () => {
        return {
          open() {
            dialogRef.current?.showModal();
          },
        };
      },
      []
    );

    return (
      <dialog
        ref={dialogRef}
        className="rounded-lg bg-gray-600 backdrop:bg-gray-900/30 "
      >
        <div className="flex flex-col items-center gap-6">
          <p className="text-lg font-bold text-neutral-100">
            This cannot be undone, tread carefully.
          </p>
          <div className="flex w-full justify-around">
            <button className="btn-warning" onClick={handleClick}>
              Yes, Delete
            </button>
            <button className="btn" onClick={() => dialogRef.current?.close()}>
              No, Cancel
            </button>
          </div>
        </div>
      </dialog>
    );
  }
);
