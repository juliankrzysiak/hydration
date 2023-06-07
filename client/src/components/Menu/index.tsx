import { useState } from "react";
import { MenuButton } from "./MenuButton";
import { motion } from "framer-motion";
import { useShowStore } from "../../store";

const translate = {
  N: "-translate-y-16",
  NW: "-translate-y-16 -translate-x-16",
  W: "-translate-x-16",
};

export const Menu = () => {
  const [pressed, setPressed] = useState(false);

  const addPlant = () => {
    useShowStore.setState({ createForm: true });
    setPressed(false);
  };

  return (
    <nav className="fixed bottom-6 right-6 grid place-content-center">
      <button
        className="aspect-square w-16 rounded-2xl border-2 border-gray-900 bg-gray-300/20 p-1"
        aria-pressed={pressed}
        onClick={() => setPressed(!pressed)}
      >
        <img src={`/${pressed ? "cancel" : "menu"}.svg`} alt="Hamburger menu" />
      </button>
      {pressed && (
        <motion.div
          className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <MenuButton ADD handleClick={addPlant} direction={translate.N} />
        </motion.div>
      )}

      {/* <MenuButton pressed={pressed} direction={translate.W} /> */}
      {/* <MenuButton pressed={pressed} direction={translate.W} /> */}
    </nav>
  );
};
