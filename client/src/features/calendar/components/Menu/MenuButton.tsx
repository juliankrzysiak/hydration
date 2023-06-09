import { motion } from "framer-motion";

interface Props {
  direction: string;
  handleClick: () => void;
  children: React.ReactNode;
}

export const MenuButton = ({ direction, handleClick, children }: Props) => {
  return (
    <div
      className={`absolute grid aspect-square w-16 place-content-center transition-all duration-200 ${direction}`}
    >
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="aspect-square w-12 rounded-xl border-2 border-gray-900 bg-gray-500/10 p-1"
        onClick={handleClick}
      >
        {children}
      </motion.button>
    </div>
  );
};
