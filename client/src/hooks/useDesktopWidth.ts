import { useEffect, useState } from "react";

export const useDesktopWidth = (width = 700) => {
  const [limitMet, setLimitMet] = useState(false);

  const checkWidth = () =>
    window.innerWidth > width ? setLimitMet(true) : setLimitMet(false);

  useEffect(() => {
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);
  return [limitMet];
};
