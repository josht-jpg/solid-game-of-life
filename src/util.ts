// TODO: classes type
export const classNames = (...classes) => {
  const c2 = classes.reduce((acc, curr) => {
    if (typeof curr === "string") {
      return `${acc} ${curr}`;
    }

    if (typeof curr === "object") {
      const c = Object.entries(curr)
        .filter(([_key, value]) => {
          return !!value;
        })
        .map(([key]) => key)
        .join(" ");

      return `${acc} ${c}`;
    }

    return acc;
  }, "");

  return c2;
};
