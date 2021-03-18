import { useState, useEffect } from "react";

type TimeoutType = ReturnType<typeof setTimeout> | null;

const RESIZE_DEBOUNCE_MS = 100;

function getWidth() {
  return typeof window !== "undefined"
    ? window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    : 0;
}

export function useWindowWidth() {
  const [width, setWidth] = useState(getWidth());

  let isMounted = false;

  useEffect(() => {
    let timeoutId: TimeoutType = null;
    const reesizeListener = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      timeoutId = setTimeout(() => {
        if (isMounted) {
          setWidth(getWidth());
        }
      }, RESIZE_DEBOUNCE_MS);
    };

    window.addEventListener("resize", reesizeListener);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isMounted = false;
      window.removeEventListener("resize", reesizeListener);
    };
  });

  return width;
}
