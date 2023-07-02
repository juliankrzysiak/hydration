import plusSVG from "@/assets/plus.svg";
import cancelSVG from "@/assets/cancel.svg";

interface Props {
  handleClick: () => void;
}

export const Buttons = ({ handleClick }: Props) => {
  return (
    <div className=" flex gap-6">
      <button
        className="rounded-md border-2 border-gray-800"
        aria-label="Show Add Date Form"
        type="submit"
      >
        <img className="w-7" src={plusSVG} alt="Plus" />
      </button>
      <button
        className="rounded-md border-2 border-gray-800"
        aria-label="Show Delete Date Form"
        type="button"
        onClick={handleClick}
      >
        <img className="w-7" src={cancelSVG} alt="Cancel" />
      </button>
    </div>
  );
};
