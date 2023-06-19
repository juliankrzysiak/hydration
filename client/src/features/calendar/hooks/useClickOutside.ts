import { useEffect } from "react";

export const useClickOutside = (
  remove: () => void,
  ref: React.RefObject<HTMLElement>
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && event.target instanceof Element) {
        if (!ref.current.contains(event.target)) remove();
      }
    };

    const handleEscapeOutside = (event: KeyboardEvent) => {
      if (ref.current && event.key === "Escape") remove();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeOutside);
    };
  }, [remove, ref]);
};
