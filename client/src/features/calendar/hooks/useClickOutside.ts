import { useEffect } from "react";

export const useClickOutside = (
  action: () => void,
  ref: React.RefObject<HTMLElement>
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && event.target instanceof Element) {
        if (!ref.current.contains(event.target)) action();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [action, ref]);
};
