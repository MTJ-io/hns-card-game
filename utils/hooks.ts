import { useEffect, useState } from "react";

export const useTransitionMount = () => {
  const [transitionMount, setTransitionMount] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransitionMount(true);
      });
    });
  }, []);

  return transitionMount;
};
