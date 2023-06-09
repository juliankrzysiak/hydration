import checkmark from "@/features/calendar/assets/checkmark.svg";
import cancel from "@/features/calendar/assets/cancel.svg";

interface Props {
  handleInput: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConfirmButtons = ({ handleInput }: Props) => {
  return (
    <div className="flex gap-6">
      <button
        className="rounded-md bg-gray-700/30 p-1"
        aria-label="Confirm Selection"
        type="submit"
      >
        <img className="w-6" src={checkmark} alt="Checkmark" />
      </button>
      <button
        className="rounded-md bg-gray-700/30 p-1"
        aria-label="Exit out of form"
        type="button"
        onClick={() => handleInput(false)}
      >
        <img className="w-6" src={cancel} alt="Cancel" />
      </button>
    </div>
  );
};
