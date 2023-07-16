import SunSVG from "../../assets/sun.svg";
import RainSVG from "../../assets/rain.svg";
import { Title } from ".";

interface Props {
  title: Title;
  waterAll: () => void;
  unwaterAll: () => void;
}
export const AllPlantButton = ({ title, waterAll, unwaterAll }: Props) => {
  switch (title) {
    case Title.water:
      return (
        <button aria-label="Water all plants" onClick={waterAll}>
          <img className="w-6" src={RainSVG} alt="Rain" />
        </button>
      );
    case Title.watered:
      return (
        <button aria-label="Unwater all plants" onClick={unwaterAll}>
          <img className="w-6" src={SunSVG} alt="Sun" />
        </button>
      );
    default:
      return null;
  }
};
