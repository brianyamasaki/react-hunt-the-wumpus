// return a random number between min and max (inclusive)
export const randomInt = (min, max) => {
  return Math.trunc(Math.random() * (max - min + 1)) + min;
}