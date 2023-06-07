import { useState } from "react";
import { MenuButton } from "./MenuButton";
import { useShowStore } from "../../store";

export const Menu = () => {
  const [pressed, setPressed] = useState(false);

  const translate = {
    N: "-translate-y-[4.5rem]",
    NW: "-translate-y-[4.5rem] -translate-x-[4.5rem]",
    W: `-translate-x-[4.5rem]`,
  };

  const addPlant = () => {
    useShowStore.setState({ createForm: true });
    setPressed(false);
  };

  return (
    <nav className="fixed bottom-6 right-6 grid place-content-center">
      <button
        className="col-span-1 row-span-1 aspect-square w-16 rounded-2xl border-2 border-gray-900 bg-gray-300/20 p-1"
        aria-pressed={pressed}
        onClick={() => setPressed(!pressed)}
      >
        <img src="/menu.svg" alt="Hamburger menu" />
      </button>
      {pressed && (
        <>
          <MenuButton ADD handleClick={addPlant} direction={translate.N} />
          <MenuButton DELETE handleClick={addPlant} direction={translate.W} />
        </>
      )}
    </nav>
  );
};
