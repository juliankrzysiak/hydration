import plusSVG from "@/assets/plus.svg";
import cancelSVG from "@/assets/cancel.svg";

interface Props {
  accept?: () => void;
  cancel: () => void;
}

export const Buttons = ({ accept, cancel }: Props) => {
  return (
    <div className="flex gap-6">
      <button
        className="rounded-md border-2 border-gray-800 hover:bg-gray-300/50"
        aria-label="Show Add Date Form"
        type="submit"
        onClick={accept}
      >
        <img className="w-7" src={plusSVG} alt="Plus" />
      </button>
      <button
        className="hover:bg-gray-30 rounded-md border-2 border-gray-800 hover:bg-gray-300/50"
        aria-label="Show Delete Date Form"
        type="button"
        onClick={cancel}
      >
        <img className="w-7" src={cancelSVG} alt="Cancel" />
      </button>
    </div>
  );
};
