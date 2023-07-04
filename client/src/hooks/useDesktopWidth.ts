import { useEffect, useState } from "react";

export const useDesktopWidth = () => {
  const [width, setWidth] = useState(false);
  useEffect(() => {
    if (window.innerWidth > 700) setWidth(true);
  }, []);
  console.log(width);
  return [width];
};
