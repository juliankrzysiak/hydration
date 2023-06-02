import { MenuButton } from "./MenuButton";
import { useShowStore } from "../../store";

interface Props {
  pressed: boolean;
  direction: string;
}

export const CreateButton = ({pressed, direction}: Props) => {
  const handleClick = (value: boolean) => {
    useShowStore.setState({ createForm: value });
  };

  return <MenuButton pressed={pressed} direction={direction} handleClick={handleClick} />;
};
