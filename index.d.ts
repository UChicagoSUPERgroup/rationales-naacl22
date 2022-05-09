declare module "*.svg";
declare module "*.png";
declare module "*.jpg";

// We need this for the instructions
declare module "*.gif";

interface Array<T> {
  /**
   * Gets the last index number of the array
   */
  indexLength(): number;

  /**
   * Gets the last element
   */
  last(): T;
}
