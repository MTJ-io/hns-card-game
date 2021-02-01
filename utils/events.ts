import { tickUpdate } from "./utils";

export const onWindowResize = (cb) => {
  window.addEventListener("resize", cb, {
    passive: true,
  });

  window.addEventListener("orientationchange", cb, {
    passive: true,
  });

  return () => {
    window.removeEventListener("resize", cb);
    window.removeEventListener("orientationchange", cb);
  };
};

export const registerBootlegVH = () => {
  const setVh = () =>
    document.documentElement.style.setProperty(
      "--vh",
      `${window.innerHeight / 100}px`
    );

  const cb = tickUpdate(() => {
    setVh();
  });

  setVh();

  return onWindowResize(cb);
};
