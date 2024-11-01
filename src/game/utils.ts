/**
 * Returns stringified time in format "mm:ss"
 * @param time Time in milliseconds
 * @returns Stringified time
 */
export const stringifyTime = (time: number) => {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
};
