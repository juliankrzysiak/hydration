import { useState } from "react";
import { MenuButton } from "./MenuButton";
import { useShowStore } from "../../stores/showStore";
import menu from "../../assets/menu.svg";
import plus from "../../assets/plus.svg";
import cancel from "@/assets/cancel.svg";
import person from "@/assets/person.svg";

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

  const deletePlant = () => {
    useShowStore.setState({ deletePlant: true });
    setPressed(false);
  };

  return (
    <nav className="fixed bottom-6 right-6 grid place-content-center">
      <button
        className="col-span-1 row-span-1 aspect-square w-16 rounded-2xl border-2 border-gray-900 bg-gray-300/20 p-1"
        aria-pressed={pressed}
        onClick={() => setPressed(!pressed)}
      >
        <img src={menu} alt="Menu" />
      </button>
      {pressed && (
        <>
          <MenuButton
            handleClick={addPlant}
            direction={translate.N}
            label="Open form to add new plant"
          >
            <img src={plus} alt="Plus" />
          </MenuButton>
          <MenuButton
            handleClick={deletePlant}
            direction={translate.W}
            label="Open form to delete existing plant"
          >
            <img src={cancel} alt="Cancel" />
          </MenuButton>
          <MenuButton
            handleClick={deletePlant}
            direction={translate.NW}
            label="Navigate to User Account Page"
          >
            <img src={person} alt="Person" />
          </MenuButton>
        </>
      )}
    </nav>
  );
};
