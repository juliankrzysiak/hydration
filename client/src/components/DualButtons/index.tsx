import plusSVG from "@/assets/plus.svg";
import cancelSVG from "@/assets/cancel.svg";

interface Props {
  confirm: () => void;
  cancel: () => void;
}

export const DualButtons = ({ confirm, cancel }: Props) => {
  return (
    <div className="flex gap-4 self-center">
      <button
        className="rounded-md bg-gray-200/40 p-1"
        aria-label="Show Add Date Form"
        onClick={confirm}
      >
        <img className="w-5" src={plusSVG} alt="Plus" />
      </button>
      <button
        className="rounded-md bg-gray-200/40 p-1"
        aria-label="Show Delete Date Form"
        onClick={cancel}
      >
        <img className="w-5" src={cancelSVG} alt="Cancel" />
      </button>
    </div>
  );
};
