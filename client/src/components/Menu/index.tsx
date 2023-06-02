import { useState } from "react";
import { MenuButton } from "./MenuButton";
import { CreateButton } from "./CreateButton";

export const Menu = () => {
  const [pressed, setPressed] = useState(false);
  const translate = {
    N: "-translate-y-16",
    NW: "-translate-y-16 -translate-x-16",
    W: "-translate-x-16",
  };

  return (
    <nav className="fixed bottom-6 right-6 grid place-content-center">
      <button
        className="aspect-square w-14 rounded-full border-2 border-gray-900 bg-gray-300 p-1"
        aria-pressed={pressed}
        onClick={() => setPressed(!pressed)}
      >
        <img src={`/${pressed ? "cancel" : "menu"}.svg`} alt="Hamburger menu" />
      </button>
      <CreateButton pressed={pressed} direction={translate.N} />
      {/* <MenuButton pressed={pressed} direction={translate.NW} /> */}
      {/* <MenuButton pressed={pressed} direction={translate.W} /> */}
    </nav>
  );
};
