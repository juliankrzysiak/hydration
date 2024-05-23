type Props = {
  handleClick: () => void;
};

export default function BackButton({ handleClick }: Props) {
  return (
    <button onClick={handleClick}>
      <span className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
        <p>back</p>
      </span>
    </button>
  );
}
