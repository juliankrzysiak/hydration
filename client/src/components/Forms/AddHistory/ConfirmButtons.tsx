interface Props {
  handleInput: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConfirmButtons = ({ handleInput }: Props) => {
  return (
    <div className="flex gap-6">
      <button className="rounded-md bg-gray-700/30 p-1" type="submit">
        <img className="w-7 " src="/checkmark.svg" alt="Checkmark" />
      </button>
      <button
        className="rounded-md bg-gray-700/30 p-1"
        type="button"
        onClick={() => handleInput(false)}
      >
        <img className="w-7" src="/cancel.svg" alt="Exit" />
      </button>
    </div>
  );
};
