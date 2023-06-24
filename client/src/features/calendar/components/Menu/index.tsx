import { useState } from "react";
import { MenuButton } from "./MenuButton";
import menu from "../../assets/menu.svg";
import person from "@/assets/person.svg";
import leafSVG from "../../assets/leaf.svg";

import { useNavigate } from "react-router-dom";

export const Menu = () => {
  const [pressed, setPressed] = useState(false);
  const navigate = useNavigate();

  const translate = {
    N: "-translate-y-[4.5rem]",
    NN: "-translate-y-[8.5rem]",
    NW: "-translate-y-[4.5rem] -translate-x-[4.5rem]",
    W: `-translate-x-[4.5rem]`,
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
            handleClick={() => navigate("/plants")}
            direction={translate.N}
            label="Open list of all plants"
          >
            <img src={leafSVG} alt="Leaf" />
          </MenuButton>

          <MenuButton
            handleClick={() => navigate("/user")}
            direction={translate.W}
            label="Navigate to user account page"
          >
            <img src={person} alt="Person" />
          </MenuButton>
        </>
      )}
    </nav>
  );
};
