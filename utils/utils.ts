export const tickUpdate = (cb) => {
  let ticking = false;

  const update = (e) => {
    cb(e);
    ticking = false;
  };

  const requestTick = (e) => {
    if (!ticking) {
      requestAnimationFrame(() => update(e));
      ticking = true;
    }
  };

  return requestTick;
};

export const clamp = (num, min, max) => {
  return Math.min(Math.max(num, min), max);
};

export const mapRange = (value, x1, y1, x2, y2) =>
  ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

export const formToObject = (form) => {
  const fd = new FormData(form);
  return [...fd.entries()].reduce(
    (prev, curr) => ({
      ...prev,
      [curr[0]]: curr[1],
    }),
    {}
  );
};

export const random = (arr: any[]) => {
  return arr[randomIndex(arr)];
};
export const randomIndex = (arr: any[]) => {
  return Math.floor(Math.random() * arr.length);
};

const KEYS = {
  ESCAPE: 27,
};

export const registerExits = (onEscape) => {
  const cb = (e) => {
    if ([KEYS.ESCAPE].includes(e.keyCode)) {
      onEscape();
    }
  };

  document.addEventListener("keyup", cb);
  return () => document.removeEventListener("keyup", cb);
};
