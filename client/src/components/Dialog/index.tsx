import { forwardRef, useImperativeHandle, useRef } from "react";

export type DialogHandle = {
  open: () => void;
  close: () => void;
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
          close() {
            dialogRef.current?.close();
          },
        };
      },
      []
    );

    return (
      <dialog
        ref={dialogRef}
        className="rounded-md bg-gray-700 backdrop:bg-gray-900/30 "
      >
        <div className="flex flex-col items-center gap-6">
          <p className="text-center text-lg font-semibold text-neutral-100">
            This cannot be undone, tread carefully.
          </p>
          <div className="flex w-full justify-around">
            <button className="btn-warning" onClick={handleClick}>
              Yes, Delete
            </button>
            <button
              className="rounded-md border-2 border-gray-100 px-2 py-1 font-bold text-gray-100"
              onClick={() => dialogRef.current?.close()}
            >
              No, Cancel
            </button>
          </div>
        </div>
      </dialog>
    );
  }
);
