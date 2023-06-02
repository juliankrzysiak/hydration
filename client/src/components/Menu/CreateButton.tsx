import { MenuButton } from "./MenuButton";
import { useShowStore } from "../../store";

interface Props {
  pressed: boolean;
  direction: string;
  setPressed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateButton = ({ pressed, direction, setPressed }: Props) => {
  const handleClick = (value: boolean) => {
    useShowStore.setState({ createForm: value });
    setPressed(false);
  };

  return (
    <MenuButton
      pressed={pressed}
      direction={direction}
      handleClick={handleClick}
    />
  );
};
