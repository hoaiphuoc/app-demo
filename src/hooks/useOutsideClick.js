import { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export default function useOutsideClick({ ref, handleClickOutside }) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClickOutside && handleClickOutside();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClick);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref]);
}
