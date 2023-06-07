import cancel from "@/assets/cancel.svg";
import checkmark from "@/assets/checkmark.svg";

interface Props {
  handleInput: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConfirmButtons = ({ handleInput }: Props) => {
  return (
    <div className="flex gap-6">
      <button className="rounded-md bg-gray-700/30 p-1" type="submit">
        <img className="w-7 " src={checkmark} alt="Confirm" />
      </button>
      <button
        className="rounded-md bg-gray-700/30 p-1"
        type="button"
        onClick={() => handleInput(false)}
      >
        <img className="w-7" src={cancel} alt="Cancel" />
      </button>
    </div>
  );
};
