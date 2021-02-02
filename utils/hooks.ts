import { useEffect, useState } from "react";
import { onWindowResize } from "./events";
import { tickUpdate } from "./utils";

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

export const useWindowDimensions = () => {
  const [width, setWidth] = useState<number>(-1);
  const [height, setHeight] = useState<number>(-1);
  const [bodyWidth, setBodyWidth] = useState<number>(-1);
  const [bodyHeight, setBodyHeight] = useState<number>(-1);

  useEffect(() => {
    const getDimensions = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      setBodyWidth(document.body.clientWidth);
      setBodyHeight(document.body.clientHeight);
    };

    getDimensions();

    return onWindowResize(getDimensions);
  });

  return { width, height, bodyWidth, bodyHeight };
};
